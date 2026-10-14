import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'
import { ClipLoader } from 'react-spinners'
import { useData } from '../../utility/DataContext'
import { Type } from '../../utility/action.type'
import { axiosInstance } from '../../Api/axios'
import { db } from '../../utility/firebase'
import { doc, setDoc } from 'firebase/firestore'
import './Payment.css'

/**
 * Authentic Amazon Checkout & Stripe Payment Page Component
 * Handles delivery address, item review, real-time CardElement validation,
 * backend Stripe PaymentIntent creation, payment confirmation, and order recording.
 */
function Payment() {
  const [{ basket, user }, dispatch] = useData()
  const navigate = useNavigate()

  // Stripe Hooks
  const stripe = useStripe()
  const elements = useElements()

  // Redirect if user is not signed in
  useEffect(() => {
    if (!user) {
      navigate('/auth', {
        state: {
          msg: 'You must sign in to proceed to checkout and payment.',
          redirect: '/payment'
        },
        replace: true
      })
    }
  }, [user, navigate])

  const userIdentifier = user?.displayName || user?.name || user?.email || 'Customer'

  const [deliveryAddress, setDeliveryAddress] = useState({
    name: userIdentifier,
    street: 'Bole Road, House 402',
    city: 'Addis Ababa',
    postalCode: '1000',
    country: 'Ethiopia'
  })
  const [isEditingAddress, setIsEditingAddress] = useState(false)

  // Payment States
  const [isProcessing, setIsProcessing] = useState(false)
  const [cardError, setCardError] = useState('')
  const [disabled, setDisabled] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  const totalItems = basket?.length || 0
  const itemsPrice =
    basket?.reduce((amount, item) => item.price * item.quantity + amount, 0) || 0
  const shippingFee = 0.0
  const orderTotal = itemsPrice + shippingFee

  // Handle CardElement real-time validation
  const handleCardChange = (e) => {
    setDisabled(e.empty || !e.complete)
    setCardError(e.error ? e.error.message : '')
  }

  // Handle Stripe Payment Submission
  const handlePlaceOrder = async (e) => {
    e.preventDefault()

    if (!stripe || !elements) {
      setErrorMessage('Stripe has not initialized yet. Please wait a moment and try again.')
      return
    }

    if (basket.length === 0) {
      setErrorMessage('Your cart is empty. Please add items before placing an order.')
      return
    }

    setIsProcessing(true)
    setErrorMessage('')
    setCardError('')

    try {
      // 1. Request clientSecret from the Express backend
      const totalInCents = Math.round(orderTotal * 100)
      const response = await axiosInstance({
        method: 'POST',
        url: `/payment/create?total=${totalInCents}`
      })

      const clientSecret = response.data?.clientSecret

      if (!clientSecret) {
        throw new Error('Failed to retrieve payment client secret from server.')
      }

      // 2. Confirm Card Payment with Stripe
      const cardElement = elements.getElement(CardElement)
      const confirmation = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: deliveryAddress.name || userIdentifier,
            email: user?.email || undefined,
            address: {
              line1: deliveryAddress.street,
              city: deliveryAddress.city,
              postal_code: deliveryAddress.postalCode,
              country: 'US'
            }
          }
        }
      })

      if (confirmation.error) {
        setCardError(confirmation.error.message || 'Payment confirmation failed.')
        setIsProcessing(false)
        return
      }

      const paymentIntent = confirmation.paymentIntent

      if (paymentIntent.status === 'succeeded') {
        const newOrderId = paymentIntent.id
        const orderDate = new Date(paymentIntent.created * 1000).toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        })

        const placedOrder = {
          id: newOrderId,
          created: orderDate,
          amount: paymentIntent.amount / 100,
          status: 'Paid & Confirmed',
          deliveryDate: `Arriving in 2 days (${new Date(
            Date.now() + 86400000 * 2
          ).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })})`,
          recipient: deliveryAddress.name,
          address: `${deliveryAddress.street}, ${deliveryAddress.city}, ${deliveryAddress.country}`,
          items: [...basket]
        }

        // 3. Optional: Sync order into Firebase Firestore if user UID exists
        if (user?.uid) {
          try {
            await setDoc(doc(db, 'users', user.uid, 'orders', newOrderId), {
              basket: basket,
              amount: paymentIntent.amount / 100,
              created: paymentIntent.created,
              recipient: deliveryAddress.name,
              address: placedOrder.address
            })
          } catch (firestoreError) {
            console.warn('Note: Firestore order backup skipped or rules restricted:', firestoreError)
          }
        }

        // 4. Record order into local state and clear shopping basket
        dispatch({
          type: Type.PLACE_ORDER,
          order: placedOrder
        })

        dispatch({
          type: Type.EMPTY_BASKET
        })

        setIsProcessing(false)
        navigate('/orders', { replace: true })
      } else {
        setErrorMessage(`Payment status: ${paymentIntent.status}. Please check your card.`)
        setIsProcessing(false)
      }
    } catch (err) {
      console.error('Payment Error:', err)
      if (err.code === 'ERR_NETWORK' || !err.response) {
        setErrorMessage(
          'Cannot connect to the payment server. Please ensure the server is running on http://localhost:5000 (run: "cd server && npm start").'
        )
      } else {
        setErrorMessage(
          err.response?.data?.message ||
          err.response?.data?.error ||
          err.message ||
          'An unexpected error occurred during checkout.'
        )
      }
      setIsProcessing(false)
    }
  }

  if (basket?.length === 0) {
    return (
      <div className="payment payment--empty">
        <div className="payment__emptyCard">
          <h2>No items to checkout</h2>
          <p>Your shopping basket is currently empty.</p>
          <Link to="/" className="payment__btnPrimary">
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="payment">
      {/* Checkout Minimal Header */}
      <div className="payment__topHeader">
        <div className="payment__topHeaderInner">
          <Link to="/" className="payment__logoLink">
            <span className="payment__logoText">amazon</span>
            <span className="payment__logoSub">.com</span>
          </Link>
          <h1 className="payment__title">
            Checkout (
            <Link to="/cart" className="payment__titleCount">
              {totalItems} {totalItems === 1 ? 'item' : 'items'}
            </Link>
            )
          </h1>
          <div className="payment__secureIcon">🔒 Secure Stripe Checkout</div>
        </div>
      </div>

      <div className="payment__container">
        {errorMessage && (
          <div className="payment__alert" role="alert">
            <strong>Payment notice: </strong> {errorMessage}
          </div>
        )}

        {/* Left Steps Section */}
        <div className="payment__main">
          {/* Step 1: Delivery Address */}
          <section className="payment__section">
            <div className="payment__sectionHeader">
              <span className="payment__stepNumber">1</span>
              <h2 className="payment__sectionTitle">Delivery address</h2>
            </div>
            <div className="payment__sectionBody">
              {!isEditingAddress ? (
                <div className="payment__addressView">
                  <p><strong>{deliveryAddress.name}</strong></p>
                  <p>{deliveryAddress.street}</p>
                  <p>
                    {deliveryAddress.city}, {deliveryAddress.postalCode}
                  </p>
                  <p>{deliveryAddress.country}</p>
                  <button
                    type="button"
                    className="payment__changeLink"
                    onClick={() => setIsEditingAddress(true)}
                  >
                    Change address
                  </button>
                </div>
              ) : (
                <div className="payment__addressForm">
                  <div className="payment__formRow">
                    <label>Full name</label>
                    <input
                      type="text"
                      value={deliveryAddress.name}
                      onChange={(e) =>
                        setDeliveryAddress({ ...deliveryAddress, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="payment__formRow">
                    <label>Street address</label>
                    <input
                      type="text"
                      value={deliveryAddress.street}
                      onChange={(e) =>
                        setDeliveryAddress({ ...deliveryAddress, street: e.target.value })
                      }
                    />
                  </div>
                  <div className="payment__formGroup">
                    <div className="payment__formRow">
                      <label>City</label>
                      <input
                        type="text"
                        value={deliveryAddress.city}
                        onChange={(e) =>
                          setDeliveryAddress({ ...deliveryAddress, city: e.target.value })
                        }
                      />
                    </div>
                    <div className="payment__formRow">
                      <label>Postal Code</label>
                      <input
                        type="text"
                        value={deliveryAddress.postalCode}
                        onChange={(e) =>
                          setDeliveryAddress({
                            ...deliveryAddress,
                            postalCode: e.target.value
                          })
                        }
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    className="payment__saveAddressBtn"
                    onClick={() => setIsEditingAddress(false)}
                  >
                    Save Address
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* Step 2: Payment Method (Stripe Elements) */}
          <section className="payment__section">
            <div className="payment__sectionHeader">
              <span className="payment__stepNumber">2</span>
              <h2 className="payment__sectionTitle">Payment method</h2>
            </div>
            <div className="payment__sectionBody">
              <form onSubmit={handlePlaceOrder} className="payment__stripeForm">
                <div className="payment__stripeBox">
                  <div className="payment__cardOptionsHeader">
                    <div className="payment__cardRadioTitle">
                      <input type="radio" id="stripeCardRadio" name="paymentOption" defaultChecked readOnly />
                      <label htmlFor="stripeCardRadio">
                        <strong>Credit or Debit Card</strong>
                      </label>
                    </div>
                    <div className="payment__cardLogos">
                      <span>Visa</span> • <span>MC</span> • <span>Amex</span> • <span>Discover</span>
                    </div>
                  </div>

                  <div className="payment__cardElementWrapper">
                    <CardElement
                      id="card-element"
                      onChange={handleCardChange}
                      options={{
                        style: {
                          base: {
                            fontSize: '15px',
                            color: '#0f1111',
                            fontFamily: '"Amazon Ember", Arial, sans-serif',
                            '::placeholder': {
                              color: '#656565'
                            }
                          },
                          invalid: {
                            color: '#ba0933',
                            iconColor: '#ba0933'
                          }
                        }
                      }}
                    />
                  </div>

                  {cardError && (
                    <div className="payment__cardError" role="alert">
                      <span className="payment__errorIcon">⚠️</span>
                      <span>{cardError}</span>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </section>

          {/* Step 3: Review Items and Delivery */}
          <section className="payment__section">
            <div className="payment__sectionHeader">
              <span className="payment__stepNumber">3</span>
              <h2 className="payment__sectionTitle">Review items and delivery</h2>
            </div>
            <div className="payment__sectionBody">
              <div className="payment__deliveryPromise">
                <span className="payment__primeTag">FREE Two-Day Delivery</span>
                <span>Guaranteed delivery: <strong>Within 2 business days</strong></span>
              </div>

              <div className="payment__itemsReviewList">
                {basket.map((item) => (
                  <div key={item.id} className="payment__reviewItem">
                    <img src={item.image} alt={item.title} className="payment__reviewImg" />
                    <div className="payment__reviewItemInfo">
                      <h4>{item.title}</h4>
                      <p className="payment__reviewItemPrice">
                        ${(item.price * item.quantity).toFixed(2)}{' '}
                        <span className="payment__reviewItemQty">
                          (Qty: {item.quantity})
                        </span>
                      </p>
                      <span className="payment__reviewInStock">In Stock</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Right Sidebar: Place Order & Order Summary */}
        <aside className="payment__sidebar">
          <div className="payment__summaryCard">
            <button
              type="button"
              className="payment__placeOrderBtn"
              onClick={handlePlaceOrder}
              disabled={isProcessing || disabled || !stripe || !elements}
            >
              {isProcessing ? (
                <span className="payment__processingBtn">
                  <ClipLoader size={16} color="#0f1111" />
                  <span>Processing Payment...</span>
                </span>
              ) : (
                'Place your order'
              )}
            </button>

            <p className="payment__terms">
              By placing your order, you agree to Amazon's{' '}
              <a href="#privacy">privacy notice</a> and{' '}
              <a href="#conditions">conditions of use</a>.
            </p>

            <div className="payment__summaryDivider"></div>

            <h3 className="payment__summaryTitle">Order Summary</h3>

            <div className="payment__summaryRow">
              <span>Items ({totalItems}):</span>
              <span>${itemsPrice.toFixed(2)}</span>
            </div>
            <div className="payment__summaryRow">
              <span>Shipping &amp; handling:</span>
              <span>$0.00</span>
            </div>
            <div className="payment__summaryRow">
              <span>Total before tax:</span>
              <span>${itemsPrice.toFixed(2)}</span>
            </div>
            <div className="payment__summaryRow">
              <span>Estimated tax to be collected:</span>
              <span>$0.00</span>
            </div>

            <div className="payment__summaryDivider"></div>

            <div className="payment__summaryTotalRow">
              <span>Order total:</span>
              <span className="payment__totalAmount">${orderTotal.toFixed(2)}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default Payment

import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useData } from '../../utility/DataContext'
import { Type } from '../../utility/action.type'
import './Payment.css'

/**
 * Authentic Amazon Checkout & Payment Page Component
 * Handles delivery address, item review, payment simulation, and order placement
 */
function Payment() {
  const [{ basket, user }, dispatch] = useData()
  const navigate = useNavigate()

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

  const [cardData, setCardData] = useState({
    cardNumber: '•••• •••• •••• 4242',
    cardName: userIdentifier,
    expiry: '12/28',
    cvv: '123'
  })

  const [isProcessing, setIsProcessing] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const totalItems = basket?.reduce((amount, item) => item.quantity + amount, 0) || 0
  const itemsPrice =
    basket?.reduce((amount, item) => item.price * item.quantity + amount, 0) || 0
  const shippingFee = 0.0
  const orderTotal = itemsPrice + shippingFee

  const handlePlaceOrder = (e) => {
    e.preventDefault()

    if (basket.length === 0) {
      setErrorMessage('Your cart is empty. Please add items before placing an order.')
      return
    }

    setIsProcessing(true)
    setErrorMessage('')

    // Simulate payment processing delay
    setTimeout(() => {
      const newOrderId = `114-${Math.floor(1000000 + Math.random() * 9000000)}-${Math.floor(
        1000000 + Math.random() * 9000000
      )}`

      const placedOrder = {
        id: newOrderId,
        created: new Date().toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        }),
        amount: orderTotal,
        status: 'Ordered',
        deliveryDate: `Arriving in 2 days (${new Date(
          Date.now() + 86400000 * 2
        ).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })})`,
        recipient: deliveryAddress.name,
        address: `${deliveryAddress.street}, ${deliveryAddress.city}, ${deliveryAddress.country}`,
        items: [...basket]
      }

      dispatch({
        type: Type.PLACE_ORDER,
        order: placedOrder
      })

      setIsProcessing(false)
      navigate('/orders')
    }, 1200)
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
          <div className="payment__secureIcon">🔒 Secure Checkout</div>
        </div>
      </div>

      <div className="payment__container">
        {errorMessage && (
          <div className="payment__alert" role="alert">
            {errorMessage}
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

          {/* Step 2: Payment Method */}
          <section className="payment__section">
            <div className="payment__sectionHeader">
              <span className="payment__stepNumber">2</span>
              <h2 className="payment__sectionTitle">Payment method</h2>
            </div>
            <div className="payment__sectionBody">
              <div className="payment__cardMock">
                <div className="payment__cardRadio">
                  <input type="radio" id="cardRadio" name="paymentOption" defaultChecked />
                  <label htmlFor="cardRadio">
                    <strong>Credit or Debit Card</strong>
                    <span className="payment__cardBrand"> (Visa, Mastercard, Amex)</span>
                  </label>
                </div>

                <div className="payment__cardFields">
                  <div className="payment__formRow">
                    <label>Card Number</label>
                    <input
                      type="text"
                      value={cardData.cardNumber}
                      onChange={(e) =>
                        setCardData({ ...cardData, cardNumber: e.target.value })
                      }
                    />
                  </div>
                  <div className="payment__formGroup">
                    <div className="payment__formRow">
                      <label>Name on card</label>
                      <input
                        type="text"
                        value={cardData.cardName}
                        onChange={(e) =>
                          setCardData({ ...cardData, cardName: e.target.value })
                        }
                      />
                    </div>
                    <div className="payment__formRow">
                      <label>Expiration date</label>
                      <input
                        type="text"
                        value={cardData.expiry}
                        onChange={(e) =>
                          setCardData({ ...cardData, expiry: e.target.value })
                        }
                      />
                    </div>
                    <div className="payment__formRow">
                      <label>CVV</label>
                      <input
                        type="text"
                        value={cardData.cvv}
                        onChange={(e) =>
                          setCardData({ ...cardData, cvv: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
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
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing Order...' : 'Place your order'}
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

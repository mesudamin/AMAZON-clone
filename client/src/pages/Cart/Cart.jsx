import { Link, useNavigate } from 'react-router-dom'
import { useData } from '../../utility/DataContext'
import { Type } from '../../utility/action.type'
import './Cart.css'

/**
 * Authentic Amazon Cart Page Component
 * Handles basket state, quantity adjustment, removal, subtotal calculation,
 * empty state, and checkout navigation
 */
function Cart() {
  const [{ basket, user }, dispatch] = useData()
  const navigate = useNavigate()

  const totalItems = basket?.length || 0
  const totalPrice =
    basket?.reduce((amount, item) => item.price * item.quantity + amount, 0) || 0

  const handleIncrement = (item) => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: { ...item, quantity: 1 }
    })
  }

  const handleDecrement = (id) => {
    dispatch({
      type: Type.DECREMENT_QUANTITY,
      id
    })
  }

  const handleRemove = (id) => {
    dispatch({
      type: Type.REMOVE_FROM_BASKET,
      id
    })
  }

  const handleProceedToCheckout = () => {
    if (basket.length > 0) {
      if (!user) {
        navigate('/auth', {
          state: {
            msg: 'Please sign in or create an account to proceed to checkout and place your order.',
            redirect: '/payment'
          }
        })
      } else {
        navigate('/payment')
      }
    }
  }

  return (
    <div className="cart">
      <div className="cart__container">
        {/* Left Side: Shopping Cart Items List */}
        <section className="cart__left" aria-label="Shopping Cart Items">
          {basket?.length === 0 ? (
            <div className="cart__emptyContainer">
              <div className="cart__emptyImageWrapper">
                <div className="cart__emptyIllustration">🛒</div>
              </div>
              <div className="cart__emptyContent">
                <h1 className="cart__emptyTitle">Your Amazon Cart is empty</h1>
                <p className="cart__emptyText">
                  Your Shopping Cart lives to serve. Give it purpose — fill it with books,
                  electronics, video games, clothing, and more.
                </p>
                <div className="cart__emptyButtons">
                  <Link to="/" className="cart__shopDealsBtn">
                    Continue Shopping
                  </Link>
                  {!user && (
                    <Link to="/auth" className="cart__signInBtn">
                      Sign in to your account
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="cart__itemsWrapper">
              <div className="cart__header">
                <div>
                  <h1 className="cart__title">Shopping Cart</h1>
                  <span className="cart__deselect">Deselect all items</span>
                </div>
                <span className="cart__priceHeading">Price</span>
              </div>

              <div className="cart__list">
                {basket.map((item) => {
                  const itemTotal = (item.price * item.quantity).toFixed(2)
                  return (
                    <article key={item.id} className="cart__item" id={`cart-item-${item.id}`}>
                      {/* Checkbox */}
                      <div className="cart__itemCheckbox">
                        <input
                          type="checkbox"
                          defaultChecked
                          aria-label={`Select ${item.title}`}
                        />
                      </div>

                      {/* Product Image */}
                      <Link to={`/products/${item.id}`} className="cart__itemImageLink">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="cart__itemImage"
                          loading="lazy"
                        />
                      </Link>

                      {/* Product Details */}
                      <div className="cart__itemDetails">
                        <Link to={`/products/${item.id}`} className="cart__itemTitleLink">
                          <h2 className="cart__itemTitle">{item.title}</h2>
                        </Link>
                        <span className="cart__inStock">In Stock</span>
                        <div className="cart__shippingNotice">
                          Eligible for <strong>FREE Shipping</strong>
                        </div>
                        <label className="cart__giftOption">
                          <input type="checkbox" /> This is a gift{' '}
                          <span className="cart__linkLearn">Learn more</span>
                        </label>

                        {/* Controls (Quantity & Actions) */}
                        <div className="cart__itemControls">
                          <div className="cart__quantityControl">
                            <button
                              type="button"
                              className="cart__qtyBtn"
                              onClick={() => handleDecrement(item.id)}
                              aria-label={`Decrease quantity of ${item.title}`}
                            >
                              -
                            </button>
                            <span className="cart__qtyDisplay">{item.quantity}</span>
                            <button
                              type="button"
                              className="cart__qtyBtn"
                              onClick={() => handleIncrement(item)}
                              aria-label={`Increase quantity of ${item.title}`}
                            >
                              +
                            </button>
                          </div>

                          <div className="cart__actionLinks">
                            <button
                              type="button"
                              className="cart__actionBtn"
                              onClick={() => handleRemove(item.id)}
                            >
                              Delete
                            </button>
                            <span className="cart__actionDivider">|</span>
                            <button type="button" className="cart__actionBtn">
                              Save for later
                            </button>
                            <span className="cart__actionDivider">|</span>
                            <button type="button" className="cart__actionBtn">
                              Share
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Item Price */}
                      <div className="cart__itemPrice">
                        <span className="cart__priceAmount">${itemTotal}</span>
                        {item.quantity > 1 && (
                          <span className="cart__unitPrice">
                            (${item.price?.toFixed(2)} each)
                          </span>
                        )}
                      </div>
                    </article>
                  )
                })}
              </div>

              {/* Subtotal Footer */}
              <div className="cart__footerSubtotal">
                Subtotal ({totalItems} {totalItems === 1 ? 'item' : 'items'}):{' '}
                <strong>${totalPrice.toFixed(2)}</strong>
              </div>
            </div>
          )}
        </section>

        {/* Right Side: Checkout Summary Card */}
        {basket?.length > 0 && (
          <aside className="cart__right" aria-label="Order Checkout Summary">
            <div className="cart__subtotalCard">
              <div className="cart__freeShippingBanner">
                <span className="cart__freeShippingCheck">✓</span>
                <p>
                  Your order qualifies for <strong>FREE Shipping</strong>. Choose this
                  option at checkout.
                </p>
              </div>

              <div className="cart__subtotalInfo">
                Subtotal ({totalItems} {totalItems === 1 ? 'item' : 'items'}):{' '}
                <span className="cart__subtotalAmount">${totalPrice.toFixed(2)}</span>
              </div>

              <label className="cart__subtotalGift">
                <input type="checkbox" /> This order contains a gift
              </label>

              <button
                type="button"
                className="cart__checkoutBtn"
                onClick={handleProceedToCheckout}
              >
                {user ? 'Proceed to checkout' : 'Sign in to proceed to checkout'}
              </button>
            </div>
          </aside>
        )}
      </div>
    </div>
  )
}

export default Cart

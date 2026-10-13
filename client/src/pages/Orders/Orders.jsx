import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useData } from '../../utility/DataContext'
import { Type } from '../../utility/action.type'
import './Orders.css'

/**
 * Authentic Amazon Returns & Orders Page Component
 * Displays order history, tracking progress, buy again actions, and search
 */
function Orders() {
  const [{ orders, user }, dispatch] = useData()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/auth', {
        state: {
          msg: 'You must sign in to view your orders.',
          redirect: '/orders'
        },
        replace: true
      })
    }
  }, [user, navigate])
  const [activeTab, setActiveTab] = useState('orders')
  const [searchQuery, setSearchQuery] = useState('')
  const [timeFilter, setTimeFilter] = useState('past3Months')
  const [trackingModalOrder, setTrackingModalOrder] = useState(null)
  const [notification, setNotification] = useState('')

  const handleBuyAgain = (item) => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: { ...item, quantity: 1 }
    })
    setNotification(`"${item.title.substring(0, 32)}..." added to Cart!`)
    setTimeout(() => setNotification(''), 3000)
  }

  // Filter orders by search query
  const filteredOrders = (orders || []).filter((order) => {
    if (!searchQuery.trim()) return true
    const q = searchQuery.toLowerCase()
    const matchesId = order.id.toLowerCase().includes(q)
    const matchesItems = order.items?.some((it) =>
      it.title.toLowerCase().includes(q)
    )
    return matchesId || matchesItems
  })

  return (
    <div className="orders">
      <div className="orders__container">
        {/* Toast notification */}
        {notification && (
          <div className="orders__notification" role="status">
            <span>✓</span> {notification}
            <Link to="/cart" className="orders__notifLink">View Cart</Link>
          </div>
        )}

        {/* Breadcrumb & Title */}
        <div className="orders__header">
          <nav className="orders__breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">Your Account</Link>
            <span className="orders__separator">›</span>
            <span>Your Orders</span>
          </nav>
          <div className="orders__titleRow">
            <h1 className="orders__title">Your Orders</h1>
            {/* Search Orders */}
            <div className="orders__searchBox">
              <input
                type="text"
                placeholder="Search all orders"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="orders__searchInput"
                aria-label="Search all orders"
              />
              <button type="button" className="orders__searchBtn">
                Search Orders
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="orders__tabs" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'orders'}
            className={`orders__tab ${activeTab === 'orders' ? 'orders__tab--active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            Orders
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'buyAgain'}
            className={`orders__tab ${activeTab === 'buyAgain' ? 'orders__tab--active' : ''}`}
            onClick={() => setActiveTab('buyAgain')}
          >
            Buy Again
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'notYetShipped'}
            className={`orders__tab ${activeTab === 'notYetShipped' ? 'orders__tab--active' : ''}`}
            onClick={() => setActiveTab('notYetShipped')}
          >
            Not Yet Shipped
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'cancelled'}
            className={`orders__tab ${activeTab === 'cancelled' ? 'orders__tab--active' : ''}`}
            onClick={() => setActiveTab('cancelled')}
          >
            Cancelled Orders
          </button>
        </div>

        {/* Time Filter Row */}
        <div className="orders__filterRow">
          <label htmlFor="timeFilterSelect" className="orders__filterLabel">
            <strong>{filteredOrders.length} orders</strong> placed in
          </label>
          <select
            id="timeFilterSelect"
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="orders__filterSelect"
          >
            <option value="past3Months">past 3 months</option>
            <option value="2026">2026</option>
            <option value="2025">2025</option>
            <option value="archived">Archived Orders</option>
          </select>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="orders__empty">
            <div className="orders__emptyIcon">📦</div>
            <h2>You haven't placed any orders in this timeframe</h2>
            <p>
              Looking for something you previously purchased? Search your order history
              or discover new items tailored for you.
            </p>
            <Link to="/" className="orders__shopBtn">
              Explore Products
            </Link>
          </div>
        ) : (
          <div className="orders__list">
            {filteredOrders.map((order) => (
              <div key={order.id} className="orders__card" id={`order-${order.id}`}>
                {/* Order Top Bar Header */}
                <div className="orders__cardHeader">
                  <div className="orders__cardMetaGroup">
                    <div className="orders__cardMetaItem">
                      <span className="orders__metaLabel">ORDER PLACED</span>
                      <span className="orders__metaValue">{order.created}</span>
                    </div>
                    <div className="orders__cardMetaItem">
                      <span className="orders__metaLabel">TOTAL</span>
                      <span className="orders__metaValue">
                        ${typeof order.amount === 'number' ? order.amount.toFixed(2) : order.amount}
                      </span>
                    </div>
                    <div className="orders__cardMetaItem">
                      <span className="orders__metaLabel">SHIP TO</span>
                      <span className="orders__metaValueLink">
                        {order.recipient || user?.displayName || user?.name || 'Customer'}
                      </span>
                    </div>
                  </div>

                  <div className="orders__cardIdGroup">
                    <div className="orders__orderNumber">
                      <span className="orders__metaLabel">ORDER # {order.id}</span>
                    </div>
                    <div className="orders__orderLinks">
                      <a href="#order-details" className="orders__link">View order details</a>
                      <span className="orders__linkSeparator">|</span>
                      <a href="#invoice" className="orders__link">Invoice</a>
                    </div>
                  </div>
                </div>

                {/* Order Status & Delivery Info */}
                <div className="orders__cardBody">
                  <div className="orders__statusSection">
                    <span className="orders__statusBadge">
                      <span className="orders__statusDot">●</span>{' '}
                      {order.deliveryDate || order.status || 'Delivered'}
                    </span>
                    <span className="orders__statusSubtext">
                      Package was left near the front door or porch
                    </span>
                  </div>

                  {/* Items in this order */}
                  <div className="orders__itemsList">
                    {order.items?.map((item) => (
                      <div key={item.id} className="orders__itemRow">
                        <div className="orders__itemMain">
                          <Link to={`/products/${item.id}`} className="orders__itemImgLink">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="orders__itemImg"
                              loading="lazy"
                            />
                          </Link>
                          <div className="orders__itemDetails">
                            <Link to={`/products/${item.id}`} className="orders__itemTitle">
                              {item.title}
                            </Link>
                            <div className="orders__itemReturnWindow">
                              Return window closed on{' '}
                              {new Date(Date.now() + 86400000 * 20).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </div>
                            <div className="orders__itemPriceQty">
                              Qty: {item.quantity || 1} &bull; ${item.price?.toFixed(2)} each
                            </div>
                            <div className="orders__itemButtonsMobile">
                              <button
                                type="button"
                                className="orders__btnYellow"
                                onClick={() => handleBuyAgain(item)}
                              >
                                Buy it again
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Order Item Side Action Buttons */}
                        <div className="orders__itemActions">
                          <button
                            type="button"
                            className="orders__btnYellow"
                            onClick={() => handleBuyAgain(item)}
                          >
                            Buy it again
                          </button>
                          <button
                            type="button"
                            className="orders__btnWhite"
                            onClick={() => setTrackingModalOrder(order)}
                          >
                            Track package
                          </button>
                          <Link to={`/products/${item.id}`} className="orders__btnWhite">
                            View your item
                          </Link>
                          <button type="button" className="orders__btnWhite">
                            Write a product review
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tracking Modal */}
        {trackingModalOrder && (
          <div
            className="orders__modalBackdrop"
            onClick={() => setTrackingModalOrder(null)}
          >
            <div
              className="orders__modalContent"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="orders__modalHeader">
                <h2>Tracking Details: Order #{trackingModalOrder.id}</h2>
                <button
                  type="button"
                  className="orders__modalClose"
                  onClick={() => setTrackingModalOrder(null)}
                >
                  &times;
                </button>
              </div>
              <div className="orders__modalBody">
                <div className="orders__timeline">
                  <div className="orders__timelineStep orders__timelineStep--done">
                    <span className="orders__timelineIcon">✓</span>
                    <div>
                      <strong>Ordered</strong>
                      <p>{trackingModalOrder.created}</p>
                    </div>
                  </div>
                  <div className="orders__timelineStep orders__timelineStep--done">
                    <span className="orders__timelineIcon">✓</span>
                    <div>
                      <strong>Shipped</strong>
                      <p>Carrier: Amazon Logistics (TBA940284729)</p>
                    </div>
                  </div>
                  <div className="orders__timelineStep orders__timelineStep--done">
                    <span className="orders__timelineIcon">✓</span>
                    <div>
                      <strong>Out for delivery</strong>
                      <p>Driver arrived at destination neighborhood</p>
                    </div>
                  </div>
                  <div className="orders__timelineStep orders__timelineStep--done">
                    <span className="orders__timelineIcon">✓</span>
                    <div>
                      <strong>Delivered</strong>
                      <p>{trackingModalOrder.deliveryDate || 'Handed directly to resident'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Orders

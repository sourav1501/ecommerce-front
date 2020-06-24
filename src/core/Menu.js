import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { signout, isAuthenticated } from '../auth'
import {itemTotal} from './cartHelpers'
const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: '#ff9900' }
    } else {
        return { color: '#fff' }
    }
}
function Menu({ history }) {
    return (
        <div>
            <ul className="nav nav-tabs bg-primary">
                <li className="nav-item">
                    <Link className="nav-Link" style={isActive(history, '/')} to="/">Home</Link>
                </li>
  
                <li className="nav-item">
    <Link className="nav-Link" style={isActive(history, '/cart')} to="/cart">Cart<sup><small className="cart-badge">{itemTotal()}</small></sup></Link>
                </li>
                <li className="nav-item">
                        <Link className="nav-Link" style={isActive(history, '/shop')} to="/shop">Shop</Link>
                    </li>
                {isAuthenticated() && isAuthenticated().user.role === 0 && (
                    <li className="nav-item">
                        <Link className="nav-Link" style={isActive(history, '/user/dashboard')} to="/user/dashboard">Dashboard</Link>
                    </li>
                )}
                {isAuthenticated() && isAuthenticated().user.role === 1 && (
                    <li className="nav-item">
                        <Link className="nav-Link" style={isActive(history, '/admin/dashboard')} to="/admin/dashboard">Dashboard</Link>
                    </li>

                )}
                {!isAuthenticated() && (
                    <React.Fragment>
                        <li className="nav-item">
                            <Link className="nav-Link" style={isActive(history, '/signin')} to="/signin" >Signin</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-Link" style={isActive(history, '/signup')} to="/signup">Signup</Link>
                        </li>
                    </React.Fragment>
                )}
                {
                    isAuthenticated() && (
                        <li className="nav-item">
                            <span className="nav-Link" onClick={() => signout(() => {
                                history.push('/')
                            })} style={{ cursor: 'pointer', color: '#fff' }} to="/signup">Signout</span>
                        </li>
                    )
                }
            </ul>
        </div>
    )
}
export default withRouter(Menu)
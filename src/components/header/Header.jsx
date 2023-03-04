import { onAuthStateChanged, signOut } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { FaShoppingCart, FaTimes, FaUserCircle } from 'react-icons/fa'
import { HiOutlineMenuAlt3 } from 'react-icons/hi'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { auth } from '../../firebase/congif'

import { useDispatch } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css'
import {
  REMOVE_ACTIVE_USER,
  SET_ACTIVE_USER,
} from '../../redux/slice/authSlice'
import { ShowOnLogin, ShowOnLogout } from '../hiddenLink/HiddenLink'
import styles from './Header.module.scss'

const logo = (
  <div className={styles.logo}>
    <Link to="/">
      <h2>
        h<span>Shop</span>.
      </h2>
    </Link>
  </div>
)

const cart = (
  <span className={styles.cart}>
    <Link to="/cart">
      Cart <FaShoppingCart size={20} />
      <p>0</p>
    </Link>
  </span>
)

const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : '')

const Header = () => {
  const [showMenu, setShowMenu] = useState(false)
  const [useName, setUseName] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.displayName === null) {
          const u1 = user.email.substring(0, user.email.indexOf('@'))
          const uName = u1.charAt(0).toUpperCase() + u1.slice(1)
          setUseName(uName)
        } else {
          setUseName(user.displayName)
        }
        dispatch(
          SET_ACTIVE_USER({
            email: user.email,
            useName: user.displayName ? user.displayName : useName,
            useID: user.uid,
          })
        )
      } else {
        setUseName('')
        dispatch(REMOVE_ACTIVE_USER())
      }
    })
  }, [dispatch, useName])

  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }

  const hideMenu = () => {
    setShowMenu(false)
  }

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        toast.success('Logout Successful...')
        navigate('/login')
      })
      .catch((error) => {
        toast.success(error.message)
      })
  }

  return (
    <>
      <ToastContainer />
      <header>
        <div className={styles.header}>
          {logo}

          {/* menu pc */}
          <nav
            className={
              showMenu ? `${styles['show-nav']}` : `${styles['hide-nav']}`
            }>
            <div
              className={
                showMenu
                  ? `${styles['nav-wrapper']} ${styles['show-nav-wrapper']}`
                  : `${styles['nav-wrapper']}`
              }
              onClick={hideMenu}></div>
            <ul onClick={hideMenu}>
              <li className={styles['logo-mobile']}>
                {logo}
                <FaTimes size={22} color="#fff" onClick={hideMenu} />
              </li>
              <li>
                <NavLink to="/" className={activeLink}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className={activeLink}>
                  Contact Us
                </NavLink>
              </li>
            </ul>
            <div className={styles['header-right']} onClick={hideMenu}>
              <span className={styles.links}>
                <ShowOnLogout>
                  <NavLink to="/login" className={activeLink}>
                    Login
                  </NavLink>
                </ShowOnLogout>

                <ShowOnLogin>
                  <a href="#home" style={{ color: "#ff7722" }}>
                    <FaUserCircle size={16} />
                    Hi, {useName}
                  </a>
                  <NavLink to="/order-history" className={activeLink}>
                    My Order
                  </NavLink>
                  <NavLink to="/" onClick={logoutUser}>
                    Logout
                  </NavLink>
                </ShowOnLogin>
              </span>
              {cart}
            </div>
          </nav>

          {/* menu mb */}
          <div className={styles['menu-icon']}>
            {cart}
            <HiOutlineMenuAlt3 size={28} onClick={toggleMenu} />
          </div>
        </div>
      </header>
    </>
  )
}

export default Header

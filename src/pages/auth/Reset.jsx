import { sendPasswordResetEmail } from 'firebase/auth'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import forgotImg from '../../assets/forgot.png'
import Card from '../../components/card/Card'
import Loader from '../../components/loader/Loader'
import { auth } from '../../firebase/congif'
import styles from './auth.module.scss'

const Reset = () => {
  const [email, setEmail] = useState()
  const [isLoading, setIsLoading] = useState(false)

  const handleResetPassword = (e) => {
    e.preventDefault()
    setIsLoading(true)
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setIsLoading(false)
        toast.success('Check your email for a reset link')
      })
      .catch((error) => {
        setIsLoading(false)
        toast.error(error.message)
      })
  }

  return (
    <>
      {isLoading && <Loader />}
      <div className={`container ${styles.auth}`}>
        <div className={styles.img}>
          <img src={forgotImg} alt="" width="600" />
        </div>
        <Card>
          <div className={styles.form}>
            <h2>Reset Password</h2>
            <form onSubmit={handleResetPassword}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="--btn --btn-primary --btn-block">
                Reset Password
              </button>
              <div className={styles.links}>
                <p>
                  <Link to="/login">- Login</Link>
                </p>
                <p>
                  <Link to="/register">- Register</Link>
                </p>
              </div>
            </form>
          </div>
        </Card>
      </div>
    </>
  )
}

export default Reset

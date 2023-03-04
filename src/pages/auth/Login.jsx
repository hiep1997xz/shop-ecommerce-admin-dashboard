import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth'
import React, { useState } from 'react'
import { FaGoogle } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import loginImg from '../../assets/login.png'
import Card from '../../components/card/Card'
import Loader from '../../components/loader/Loader'
import { auth } from '../../firebase/congif'
import styles from './auth.module.scss'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    setIsLoading(true)
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user
        setIsLoading(false)
        toast.success('Login Successfully...')
        navigate('/')
      })
      .catch((error) => {
        toast.error(error.message)
        setIsLoading(false)
      })
  }

  const singinWidthGg = (e) => {
    e.preventDefault()
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user
        toast.success('Login Successfully...')
        navigate('/')
      })
      .catch((error) => {
        toast.error(error.message)
      })
  }

  return (
    <>
      {isLoading && <Loader />}
      <div className={`container ${styles.auth}`}>
        <div className={styles.img}>
          <img src={loginImg} alt="" width="600" />
        </div>
        <Card>
          <div className={styles.form}>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit" className="--btn --btn-primary --btn-block">
                Login
              </button>
              <div className={styles.links}>
                <Link to="/reset">Reset Password</Link>
              </div>
              <p>--- or ---</p>
            </form>
            <button
              className="--btn --btn-danger --btn-block"
              onClick={singinWidthGg}>
              <FaGoogle color="#fff" />
              Login Width Google
            </button>
            <span className={styles.register}>
              <p>Don't have an account?</p>
              <Link to="/register">Register</Link>
            </span>
          </div>
        </Card>
      </div>
    </>
  )
}

export default Login

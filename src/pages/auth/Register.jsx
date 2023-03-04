import { createUserWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import registerImg from '../../assets/register.png'
import Card from '../../components/card/Card'
import Loader from '../../components/loader/Loader'
import { auth } from '../../firebase/congif'
import styles from './auth.module.scss'

const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const handleRegister = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast.error('Password do not match.')
    }
    setIsLoading(true)
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user
        setIsLoading(false)
        toast.success('Registration Successful...')
        navigate('/login')
      })
      .catch((error) => {
        toast.error(error.message)
        setIsLoading(false)
      })
  }

  return (
    <>
      {isLoading && <Loader />}
      <div className={`container ${styles.auth}`}>
        <Card>
          <div className={styles.form}>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
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
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button type="submit" className="--btn --btn-primary --btn-block">
                Register
              </button>
            </form>
            <span className={styles.register}>
              <p>Already an account?</p>
              <Link to="/login">Login</Link>
            </span>
          </div>
        </Card>
        <div className={styles.img}>
          <img src={registerImg} alt="" width="600" />
        </div>
      </div>
    </>
  )
}

export default Register

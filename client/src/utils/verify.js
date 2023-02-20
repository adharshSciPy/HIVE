import React from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

function VerifyToken() {
   function verify(){
      const token = Cookies.get(Token)
      const navigate = useNavigate()
      axios.post('http://localhost:5000/user/verifyToken', {
         token
      })
      .then((res) => {
         console.log(`Verification console${res.data}`)
         Navigate('/')
      }).catch((err)=> {
         console.log(`Verification Error ${err}`)
         Cookies.remove(Token)
         navigate('/login')
      })
   }

   useEffect(()=> {
      verify()
   }, [])
  return (
      
  )
}

export default VerifyToken
import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'

export default function Landing() {
    const { user } = useSelector((state) => state.auth);
   const navigate = useNavigate()

   useEffect(() => {
    if (!user) {
        navigate("/login");
      }
      else{
        navigate("/dashboard")
      }
   })
  return (
    <div>Landing</div>
  )
}

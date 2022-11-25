import React from 'react'
import { useSelector } from 'react-redux';
import "./loading.css"
import Footer from './Navbar/Footer';
export default function LoadingPage() {
    const { user } = useSelector((state) => state.auth);
  return (
    <div className='loading-container'>
        <h1>Hello {user && user.name}</h1>
        <p>Select a group to chat wit your friends.</p>
        <div className='landing-pic'></div>

    </div>
  )
}

import { Avatar } from '@material-ui/core'
import React, { useState } from 'react'
import { GoogleLogout } from 'react-google-login'
import { useDispatch, useSelector } from 'react-redux'
import { selectSignedIn, selectUserData, setUserData, setSignedIn, setInput } from '../features/userSlice'

import '../styling/navbar.css'


export default function Navbar() {
    const [inputValue, setInputValue] = useState('tech')

    const isSignedIn = useSelector(selectSignedIn)
    const userData = useSelector(selectUserData)
    const dispatch = useDispatch()

    const logout = () => {
        dispatch(setSignedIn(false))
        dispatch(setUserData(null))
    } 

    const handleClick = (e) => {
        e.preventDefault()
        dispatch(setInput(inputValue))

        setInputValue('')
    }

    return (
        <div className='navbar'>
            <h1 className="navbar__header">BlogMania 💬</h1>
            {isSignedIn &&
                <div className='blog__search'>
                    <input 
                        className='search'
                        placeholder='Search for a blog'
                        value={inputValue}
                        onChange={(e) =>  setInputValue(e.target.value)}
                    />
                    <button className="submit" onClick={handleClick}>
                        Search
                    </button>
                </div>}
                {isSignedIn ? (
                    <div className='navbar__user__data'>
                    <Avatar src={userData?.imageUrl} alt={userData?.name} className='user' />
                    <h1 className='signedIn'>{userData?.givenName}</h1>
                    <GoogleLogout 
                        clientId="474640795465-q3k3e3rshs9h9113759th0jmqvf9q0po.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <button
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                className="logout__button"
                            >
                                Logout 😦
                            </button>
                        )}
                        onLogoutSuccess={logout}
                    />
                </div>) : (<h1 className="notSignedIn">User not available 😞</h1>)}
        </div>
    )
}
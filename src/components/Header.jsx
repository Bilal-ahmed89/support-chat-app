import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from './../context/authContext/Auth';
import { doSignOut } from './../auth';

const Header = () => {
    const navigate = useNavigate()
    const { userLoggedIn, userRole} = useAuth()
    return (
        <nav className='flex flex-row gap-x-2 w-full z-20 fixed top-0 left-0 h-12 border-b place-content-center items-center justify-between px-5 bg-gray-200'>
            {
                userLoggedIn
                    ?
                    <>
                        <button onClick={() => { doSignOut().then(() => { navigate('/signin') }) }} className='text-sm text-blue-600 underline'>Logout</button>
                    </>
                    :
                    <>
                        <Link className='text-sm text-blue-600 underline' to={'/signin'}>Login</Link>
                        <Link className='text-sm text-blue-600 underline' to={'/register'}>Register New Account</Link>
                    </>
            }
            { userLoggedIn && userRole === 'admin' ? (
                <button
                    onClick={() => navigate('/dashboard')}
                    className="text-sm text-blue-600 underline"
                >
                    Dashboard
                </button>
            ) : (
                userLoggedIn && (
                    <Link className="text-sm text-blue-600 underline" to={'/my-requests'}>
                        My Requests
                    </Link>
                )
            )}

        </nav>
    )
}

export default Header;
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from './../context/authContext/Auth'
import { doSignOut } from './../auth'

const Header = () => {
    const navigate = useNavigate()
    const { userLoggedIn, userRole } = useAuth()

    return (
        <nav className='flex flex-row justify-between items-center w-full z-20 fixed top-0 left-0 h-16 border-b px-6 bg-white shadow-md'>
            <div className='flex items-center gap-x-4'>
                <Link to='/'><h1 className='text-xl font-semibold text-gray-800'>Support System</h1></Link>
            </div>

            <div className='flex gap-x-6'>
                {
                    userLoggedIn
                        ? (
                            <>
                                <button
                                    onClick={() => { doSignOut().then(() => { navigate('/signin') }) }}
                                    className='text-sm font-medium text-blue-600 hover:text-blue-800 transition duration-300 ease-in-out'>
                                    Logout
                                </button>
                            </>
                        )
                        : (
                            <>
                                <Link
                                    className='text-sm font-medium text-blue-600 hover:text-blue-800 transition duration-300 ease-in-out'
                                    to={'/signin'}>
                                    Login
                                </Link>
                                <Link
                                    className='text-sm font-medium text-blue-600 hover:text-blue-800 transition duration-300 ease-in-out'
                                    to={'/register'}>
                                    Register
                                </Link>
                            </>
                        )
                }
                {
                    userLoggedIn && userRole === 'admin'
                        ? (
                            <button
                                onClick={() => navigate('/dashboard')}
                                className='text-sm font-medium text-blue-600 hover:text-blue-800 transition duration-300 ease-in-out'>
                                Dashboard
                            </button>
                        )
                        : (
                            userLoggedIn && (
                                <Link
                                    className='text-sm font-medium text-blue-600 hover:text-blue-800 transition duration-300 ease-in-out'
                                    to={'/my-requests'}>
                                    My Requests
                                </Link>
                            )
                        )
                }
            </div>
        </nav>
    )
}

export default Header

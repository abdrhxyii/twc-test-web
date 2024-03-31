import React from 'react'
import { Navigate } from 'react-router'

const ProtectedRoute = ({element}) => {
    const authenticate = !!localStorage.getItem('authToken')
    return authenticate ? element : <Navigate to="/login"/>
}

export default ProtectedRoute
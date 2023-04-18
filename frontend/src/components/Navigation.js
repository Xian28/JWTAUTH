import { Link } from '@reach/router'
import React from 'react'

const Navigation = ({ logOutCallback }) => (
    <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/protected">Protected</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><button onClick={logOutCallback}>Logout</button></li>
    </ul>
)

export default Navigation
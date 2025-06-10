import React from "react"
import { useNavigate } from 'react-router-dom';

function NotFound() {
    const navigate = useNavigate()
    return (
        <>
            <div className="notFound">
                <h1>404 | Page not found</h1>
                <button onClick={() => navigate('../')}>Go Back to Home Page</button>
            </div>
        </>
    )
}

export default NotFound
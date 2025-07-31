import React from 'react'
import { useNavigate } from 'react-router-dom'

const PageNotFound = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className="col-md-6 offset-md-3 text-center">
                <h2>404 Page not found!</h2>
                <button onClick={() => navigate('/')} class="btn btn-warning">Redirect-to-Home</button>
            </div>
        </>
    )
}

export default PageNotFound
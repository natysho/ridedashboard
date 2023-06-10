import React from 'react'
import { Link } from 'react-router-dom'

function Error404() {
    return (
        <div className='container-fluid  d-flex justify-content-center'
            style={{ width: '100vw', height: '100vh' }}
        >

            <div className='align-self-center'>
                <h1 >404 - Not Found!</h1>
                <Link to="/">Go Home</Link>
            </div>

        </div>
    )
}

export default Error404
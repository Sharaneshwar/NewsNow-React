import React from 'react'
import loader from './loader.gif'

const Loader = () => {
    return (
        <div className='text-center'>
            <img className='my-4' src={loader} alt="Loading..." width={50} />
        </div>
    )
}

export default Loader

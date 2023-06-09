import React, { Component } from 'react'
import loader from './loader.gif'

export class Loader extends Component {
    render() {
        return (
            <div className='text-center d-flex justify-content-center align-items-center' style={{ height: "60vh" }}>
                <img src={loader} alt="Loading..." width={50} />
            </div>
        )
    }
}

export default Loader

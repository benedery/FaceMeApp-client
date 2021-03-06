import React from 'react';
import Tilt from 'react-tilt';
import face from './face.png'
import './Logo.css'


const Logo = () => {
    return (
    <div className='ma4 mt0'>
        <Tilt className="Tilt br2 shadow-2" options={{ max : 50 }} style={{ height: 150, width: 200 }} >
            <div className="Tilt-inner"><img style={{paddingTop: '20px'}} alt="face_logo" src={face} /> </div>
        </Tilt>
    </div>
    )
};

export default Logo
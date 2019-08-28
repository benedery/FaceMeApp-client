import React from 'react';


const ImageLinkForm = ({onInputChange, onSubmit}) => {
    return (
        <div>
            <p className='f3'>
                {'This Face App will detect faces In your pictures, Check it Out'}
            </p>
            <div>
            <input type='text' className='f4 pa2 w-70 center shadow-2' onChange={onInputChange} style={{
                boxSizing:"content-box"
            }}/>
            <button
                onClick={onSubmit}
                className='w-30 grow f4 link ph3 pv2 dib white bg-light-blue mt2 shadow-2'>Detect Face</button>
            </div>
        </div>
    )
};

export default ImageLinkForm
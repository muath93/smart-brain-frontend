import React from 'react';
import './FaceRecognation.css'

const FaceRecognation = ({ imgUrl, box }) => {
    return (
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id='inputImage' src={imgUrl} alt="" width='500px' height='auto' />
                <div className='bounding-box'
                    style={{
                        top: box.topRow,
                        left: box.leftCol,
                        right: box.rightCol,
                        bottom: box.bottomRow
                    }}>
                </div>
            </div>
        </div>
    );
}

export default FaceRecognation;
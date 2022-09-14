import React from 'react';
import './Screen.css';

const Screen = (props) => {
    return(
        <div className=''>
            <input className='screen' value={props.value} />
        </div>
        // <div className='screenP'>
            
        //     {/* <p>{result}</p>
        //     <p>{text}</p> */}
        // </div>
    );
}

export default Screen;
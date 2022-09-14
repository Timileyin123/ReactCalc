import React from 'react';
import './buttonBox.css';
const ButtonBox = ({children}) => {
     
        return (
            <div className='buttonBox'>
                {children}
            </div>
        );
}
 
export default ButtonBox;

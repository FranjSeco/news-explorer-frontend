import React from 'react';

import './Overlay.css';

const Overlay = (props) => (
        <div className={`overlay ${(props.isOpen) && 'overlay_popup'}`}>
            {props.children}
        </div>
);

export default Overlay;

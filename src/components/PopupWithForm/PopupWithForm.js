import React from 'react';
import './PopupWithForm.css';
import Overlay from '../Overlay/Overlay';

const PopupWithForm = (props) => (
        <Overlay isOpen={props.isOpen}>
            <div className={'popup'}>
                <button className="close-icon" onClick={props.onClose} type="button"> </button>
                <form className={'popup__form form'} onSubmit={props.onSubmit} name={props.title} noValidate>
                    {
                        props.children
                    }
                </form>
            </div>
        </Overlay>
);

export default PopupWithForm;

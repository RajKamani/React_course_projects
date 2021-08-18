import React from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";

const Backdrop = (props) => {
    return <div className={classes.backdrop} onClick={props.onCloseClick}></div>;
};

const ModalOverlay = (props) => {
    return (
        <div className={classes.modal}>
            <div className={classes.content}>{props.children}</div>
        </div>
    );
};

const portalEle = document.getElementById('overlays');
const Modal = (props) => {
    return (
        <React.Fragment>
            {ReactDOM.createPortal(<Backdrop onCloseClick={props.onCloseClick} />, portalEle)}
            {ReactDOM.createPortal(<ModalOverlay >{props.children}</ModalOverlay>, portalEle)}
        </React.Fragment>
    );
};
export default Modal;

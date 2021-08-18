
import Card from './Card';
import classes from './ErrorModal.module.css'
import btnClass from "../UI/Button.module.css";

const ErrorModal = (props) => {

    return (
        <div>
            <div className={classes.backdrop} onClick={props.discardErr} />
            <Card className={classes.modal}>
                <header className={classes.header}>
                    <h2>{props.title}</h2>
                </header>
                <div className={classes.content}>
                    <p>{props.msg}</p>
                </div>
                <footer className={classes.actions}>
                    <button onClick={props.discardErr} className={btnClass.button}>Okay</button>
                </footer>

            </Card>
        </div>
    );

}
export default ErrorModal
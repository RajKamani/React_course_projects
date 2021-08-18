import Card from "../UI/Card";
import classes from "./AddUser.module.css";
import btnClass from "../UI/Button.module.css";
import { useState } from "react";
import ErrorModal from "../UI/ErrorModal";
const AddUser = (props) => {
    const [username, setUserName] = useState("");
    const [err, setError] = useState();
    const [age, setAge] = useState("");

    const userNameHandler = (event) => {
        setUserName(event.target.value);
    };
    const ageHandler = (event) => {
        setAge(event.target.value);
    };

    const addUserhandler = (event) => {
        event.preventDefault();
        if (username.trim().length === 0 || age.trim().length === 0 || +age < 0) {
            setError({
                title: "Invalid Input",
                msg: "Enter Valid Input"
            })
            return
        }

        const user = {
            id: Math.random(),
            username: username,
            age: age
        }
        props.newUser(user);
        setUserName("");
        setAge("")
    };
    const errorDiscardHandler = () => {
        setError();
    }

    return (
        <div>
            {err && < ErrorModal title={err.title} msg={err.msg} discardErr={errorDiscardHandler} />}
            < Card className={classes.input} >
                <form onSubmit={addUserhandler}>
                    <label htmlFor="username">Username</label>
                    <input value={username} onChange={userNameHandler} id="username" type="text" />
                    <label htmlFor="age">Age</label>
                    <input value={age} onChange={ageHandler} id="age" type="number" />
                    <button className={btnClass.button} type="submit">
                        Add User
                    </button>
                </form>
            </Card >
        </div>
    );
};

export default AddUser;

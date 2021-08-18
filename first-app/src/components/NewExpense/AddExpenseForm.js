import { useState } from "react";
import "./AddExpenseForm.css";
const AddExpenseFrom = (props) => {
    const [enteredTitle, setEnteredTitle] = useState("");
    const [enteredAmount, setEnteredAmount] = useState("");
    const [enteredDate, setEnteredDate] = useState("");
    const TitleChangeHandler = (event) => {
        setEnteredTitle(event.target.value);
    };

    const AmountChangeHandler = (event) => {
        setEnteredAmount(event.target.value);
    };

    const DateChangeHandler = (event) => {
        setEnteredDate(event.target.value);
    };

    const onSubmitHandler = (event) => {
        event.preventDefault();
        const NewExData = {
            name: enteredTitle,
            amount: enteredAmount,
            date: new Date(enteredDate),
        };
        props.onDataArrived(NewExData);
    };

    return (
        <form onSubmit={onSubmitHandler}>
            <div className="new-expense__controls">
                <div className="new-expense__control">
                    <label>Title</label>
                    <input
                        type="text"
                        value={enteredTitle}
                        onChange={TitleChangeHandler}
                    />
                </div>
                <div className="new-expense__control">
                    <label>Amount</label>
                    <input
                        type="text"
                        min="0.01"
                        step="0.01"
                        value={enteredAmount}
                        onChange={AmountChangeHandler}
                    />
                </div>
                <div className="new-expense__control">
                    <label>Date</label>
                    <input
                        type="date"
                        min="2019-01-01"
                        max="2022-12-31"
                        value={enteredDate}
                        onChange={DateChangeHandler}
                    />
                </div>
            </div>
            <div className="new-expense__actions">
                <button onClick={props.hide}>Cancel</button>
                <button type="submit"> Add Expnese</button>
            </div>
        </form>
    );
};

export default AddExpenseFrom;

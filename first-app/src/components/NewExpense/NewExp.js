import "./NewExp.css";
import AddExpenseForm from "./AddExpenseForm";
import { useState } from "react";


const NewExp = (props) => {

    const [isEditable, setIsEditable] = useState(false);
    const onDataArrivedHandler = (newExData) => {

        props.onAddExpense(newExData);
        setIsEditable(false);
    }
    const onEditableHandler = () => {
        setIsEditable(true)
    }
    const hideForm = (value) => {
        setIsEditable(false);
    }
    return (
        <div className="new-expense">

            {!isEditable && <button onClick={onEditableHandler}>Add Expense</button>}
            {isEditable && <AddExpenseForm hide={hideForm} onDataArrived={onDataArrivedHandler} />}
        </div>
    );
};

export default NewExp;

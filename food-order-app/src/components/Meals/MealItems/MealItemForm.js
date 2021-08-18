import { useRef, useState } from "react";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
    const enteredAMT = useRef();
    const [formError, setFormError] = useState(false);
    const onSubmitHandler = (event) => {
        event.preventDefault();
        const enteredAmount = enteredAMT.current.value;
        const enteredAmountNumber = +enteredAmount;

        if (
            enteredAmount.trim().length === 0 ||
            enteredAmountNumber < 1 ||
            enteredAmountNumber > 5
        ) {
            setFormError(true);
            return;
        }
        props.AddToCart(enteredAmountNumber);
    };
    return (
        <form className={classes.form} onSubmit={onSubmitHandler}>
            <Input
                ref={enteredAMT}
                label="Amount"
                input={{
                    type: "number",
                    id: "amount_" + props.id,
                    min: "1",
                    max: "5",
                    step: "1",
                    defaultValue: "1",
                }}
            />
            <button>+ Add</button>
            {formError && <p>Enter valid Amount (1-5).</p>}
        </form>
    );
};
export default MealItemForm;

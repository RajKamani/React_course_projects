import "./ExpenseItem.css";
import ExpenseDate from "./ExpenseDate";
import Card from "./Card";

function ExpenseItem(props) {

    return (
        <Card className="expense-item">
            <ExpenseDate date={props.item.date} />
            <div className="expense-item__description">
                <h2>{props.item.name}</h2>
                <div className="expense-item__price">${props.item.amount}</div>
            </div>

        </Card>
    );
}

export default ExpenseItem;

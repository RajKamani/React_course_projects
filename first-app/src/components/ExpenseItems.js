import ExpenseItem from "./ExpenseItem";
import Card from "./Card";
import ExpensesFilter from "./ExpensesFilter";
import "./ExpenseItems.css";
import { useState } from "react";
import ExpensesChart from './ExpensesChart'
function ExpenseItems(props) {
    const [filterYear, setFilterYear] = useState("2021");
    const onYearDataHandler = (year) => {
        setFilterYear(year);
        console.log(year);
    };
    const filterData = props.item.filter((data) => {
        return data.date.getFullYear().toString() === filterYear;
    });
    return (
        <div>
            <Card className="expenses">
                <ExpensesFilter SelYear={filterYear} onYear={onYearDataHandler} />

                <ExpensesChart expenses={filterData} />
                {filterData.length === 0 ? <p style={{ color: "white" }}>No Expenses For This Year.</p> : ""}
                {filterData.map((x, index) => (
                    <ExpenseItem key={index} item={x} />
                ))}
            </Card>
        </div>
    );
}

export default ExpenseItems;

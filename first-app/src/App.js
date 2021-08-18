import { useState } from "react";
import "./App.css";
import ExpenseItems from "./components/ExpenseItems";
import NewExp from "./components/NewExpense/NewExp";
function App() {
  const item = [
    {
      name: "Pen",
      amount: "100",
      date: new Date(),
    },
    {
      name: "Cloth",
      amount: "1000",
      date: new Date(),
    },
  ];
  const [itemNew, setItemNew] = useState(item);
  const onAddExpenseHandler = (newExData) => {
    setItemNew((oldItemsArray) => {
      return [newExData, ...oldItemsArray];
    });
  };
  return (
    <div>
      <NewExp onAddExpense={onAddExpenseHandler} />
      <ExpenseItems item={itemNew} />
    </div>
  );
}

export default App;

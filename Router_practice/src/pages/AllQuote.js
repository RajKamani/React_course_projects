import QuoteList from "../components/quotes/QuoteList";

const TEMP_DATA = [
  { id: 1, author: "Raj", text: "lerning is fun.." },
  { id: 2, author: "Raj", text: "lerning is fun.. 2" },
  { id: 3, author: "Raj", text: "lerning is fun.. 3" },
  { id: 4, author: "Raj", text: "lerning is fun.. 4" },
];
const AllQuote = () => {
  return <QuoteList quotes={TEMP_DATA} />;
};

export default AllQuote;

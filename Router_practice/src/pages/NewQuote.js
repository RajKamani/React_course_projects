import QuoteForm from "./../components/quotes/QuoteForm";
const NewQuote = () => {
  const addQuoteHandler = (newQ) => {
    console.log(newQ);
  };

  return <QuoteForm onAddQuote={addQuoteHandler} />;
};

export default NewQuote;

import { useHistory } from "react-router-dom";
import QuoteForm from "./../components/quotes/QuoteForm";
import { addQuote } from "./../lib/api";
import { useHttp } from "./../hooks/use-http";
import { useEffect } from "react";

const NewQuote = () => {
  const history = useHistory();

  const { sendRequest, status } = useHttp(addQuote);

  useEffect(() => {
    if (status === "completed") {
      history.replace("/quotes");
    }
    return () => {};
  }, [status, history]);
  const addQuoteHandler = (newQ) => {
    sendRequest(newQ);

    history.push("/quotes");
  };

  return (
    <QuoteForm isLoading={status === "pending"} onAddQuote={addQuoteHandler} />
  );
};

export default NewQuote;

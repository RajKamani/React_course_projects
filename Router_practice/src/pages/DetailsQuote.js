import { Fragment } from "react";
import { Route, useParams } from "react-router-dom";
import Comments from "./../components/comments/Comments";
import HighlightedQuote from "./../components/quotes/HighlightedQuote";
import F404 from "./F404";

const TEMP_DATA = [
  { id: 1, author: "Raj", text: "lerning is fun.." },
  { id: 2, author: "Raj", text: "lerning is fun.. 2" },
  { id: 3, author: "Raj", text: "lerning is fun.. 3" },
  { id: 4, author: "Raj", text: "lerning is fun.. 4" },
];
const DetailsQuote = () => {
  const params = useParams();
  const getQ = TEMP_DATA.find((quote) => quote.id === parseInt(params.Qid));
  console.log(getQ);
  if (!getQ) {
    return <F404 />;
  }
  return (
    <Fragment>
      <HighlightedQuote text={getQ.text} author={getQ.author} />
      <Route path={`/quotes/${params.Qid}/comments`}>
        <Comments />
      </Route>
    </Fragment>
  );
};

export default DetailsQuote;

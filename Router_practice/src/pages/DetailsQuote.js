import { Fragment } from "react";
import { Route, useParams } from "react-router-dom";
import Comments from "./../components/comments/Comments";
const DetailsQuote = () => {
  const params = useParams();
  return (
    <Fragment>
      <h1>Details Quote Page</h1>
      <p>{params.Qid}</p>
      <Route path={`/quotes/${params.Qid}/comments`}>
        <Comments />
      </Route>
    </Fragment>
  );
};

export default DetailsQuote;

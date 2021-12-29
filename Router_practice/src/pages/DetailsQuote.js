import { Fragment, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import { Link } from "react-router-dom";
import { Route, useParams } from "react-router-dom";
import NoQuotesFound from "../components/quotes/NoQuotesFound";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";
import Comments from "./../components/comments/Comments";
import HighlightedQuote from "./../components/quotes/HighlightedQuote";
import F404 from "./F404";

const DetailsQuote = () => {
  const params = useParams();
  const match = useRouteMatch();
  const {
    sendRequest,
    status,
    data: lodadedQ,
    error,
  } = useHttp(getSingleQuote, true);

  useEffect(() => {
    sendRequest(params.Qid);
  }, [sendRequest, params]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered focused">{error}</p>;
  }

  if (status === "completed" && (!lodadedQ || lodadedQ.length === 0)) {
    return (
      <div className="centered">
        <NoQuotesFound />
      </div>
    );
  }

  if (!lodadedQ.text) {
    return <F404 />;
  }

  return (
    <Fragment>
      <HighlightedQuote text={lodadedQ.text} author={lodadedQ.author} />
      <Route path={match.path} exact>
        <div className="centered">
          <Link className="btn--flat" to={`${match.url}/comments`}>
            Load Comments..
          </Link>
        </div>
      </Route>

      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </Fragment>
  );
};

export default DetailsQuote;

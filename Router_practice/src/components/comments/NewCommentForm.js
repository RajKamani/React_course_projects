import { useEffect, useRef } from "react";
import { addComment } from "../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";
import { useHttp } from "./../../hooks/use-http";
import classes from "./NewCommentForm.module.css";

const NewCommentForm = (props) => {
  const commentTextRef = useRef();

  const { sendRequest, status, error } = useHttp(addComment, true);

  const { onAddComment } = props;
  useEffect(() => {
    if (status === "completed" && !error) {
      onAddComment();
    }
  }, [error, status, onAddComment]);

  const submitFormHandler = (event) => {
    event.preventDefault();
    const comData = commentTextRef.current.value;
    // optional: Could validate here

    // send comment to server
    sendRequest({
      commentData: { text: comData },
      quoteId: props.qid,
    });
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      {status === "pending" && (
        <div className="centered">
          <LoadingSpinner />
        </div>
      )}
      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor="comment">Your Comment</label>
        <textarea id="comment" rows="5" ref={commentTextRef}></textarea>
      </div>
      <div className={classes.actions}>
        <button className="btn">Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;

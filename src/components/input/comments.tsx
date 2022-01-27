import { useEffect, useState } from "react";

import CommentList from "./comment-list";
import NewComment, { CommentData, ExistingComment } from "./new-comment";
import classes from "./comments.module.css";
import ErrorAlert from "../ErrorAlert";

interface CommentProps {
  eventId: string;
}

function Comments({ eventId }: CommentProps) {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<ExistingComment[]>([]);
  const [commentsError, setCommentsError] = useState("");

  // function toggleCommentsHandler() {
  //   setShowComments(!showComments);
  // }

  function addCommentHandler(commentData: CommentData) {
    setCommentsError("");
    fetch(`/api/comments/${eventId}`, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          return resp.json().then((text) => {
            throw new Error(text.message);
          });
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        setCommentsError(err.message);
      });
  }

  useEffect(() => {
    if (!showComments) {
      fetch(`/api/comments/${eventId}`)
        .then((resp) => {
          if (resp.ok) {
            return resp.json();
          } else {
            return resp.json().then((text) => {
              throw new Error(text.message);
            });
          }
        })
        .then((data) => {
          setComments(data.comments);
        })
        .catch((err) => {
          setCommentsError(err.message);
        });
    }
  }, [showComments, eventId]);

  return (
    <section className={classes.comments}>
      <button onClick={() => setShowComments(!showComments)}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {commentsError && <ErrorAlert>{commentsError}</ErrorAlert>}
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList comments={comments} />}
    </section>
  );
}

export default Comments;

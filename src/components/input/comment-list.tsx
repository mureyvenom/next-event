import classes from "./comment-list.module.css";
import { ExistingComment } from "./new-comment";

interface CommentListProps {
  comments: ExistingComment[];
}

function CommentList({ comments }: CommentListProps) {
  return (
    <ul className={classes.comments}>
      {comments.map((comment) => {
        return (
          <li key={comment._id}>
            <p>{comment.text}</p>
            <div>
              By <address>{comment.name}</address>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default CommentList;

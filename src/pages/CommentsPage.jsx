import "../styles/commentPage.css";
import CommentReview from "../components/CommentReview";
import BackIcon from "../assets/icons/back.svg?react";

export default function CommentPage() {
  return (
    <main aria-label="comments review page" className="comment-page">
      <header className="comment-page-header ">
        <BackIcon className="fa" />
        <h3>All Reviews</h3>
      </header>

      <section aria-label="comments section" className="comments-section">
        <CommentReview />
        <CommentReview />
      </section>
    </main>
  );
}

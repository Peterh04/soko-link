import "../styles/commentPage.css";
import CommentReview from "../components/CommentReview";
import BackIcon from "../assets/icons/back.svg?react";
import { useNavigate } from "react-router-dom";

export default function CommentPage({ vendorReviews }) {
  const navigate = useNavigate();
  return (
    <main aria-label="comments review page" className="comment-page">
      <header className="comment-page-header ">
        <button onClick={() => navigate(-1)}>
          <BackIcon className="fa" />
        </button>
        <h3>All Reviews</h3>
      </header>

      <section aria-label="comments section" className="comments-section">
        {vendorReviews.map((review) => (
          <CommentReview
            key={review.id}
            reviewerName={review.buyer.name}
            reviewDate={review.createdAt}
            reviewRate={review.rating}
            reviewContent={review.content}
            reviewerProfileImage={review.buyer.profileImage}
          />
        ))}
      </section>
    </main>
  );
}

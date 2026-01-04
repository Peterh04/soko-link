import "../styles/commentReview.css";

export default function CommentReview({
  reviewerName,
  reviewRate,
  reviewDate,
  reviewContent,
  reviewerProfileImage,
}) {
  const getDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  return (
    <div className="comment-review" aria-label="comment review">
      <div className="comment-review-header">
        <div className="user-profile">
          <div className="user-image-container">
            <img
              src={
                reviewerProfileImage == null
                  ? "https://images.unsplash.com/photo-1597393922738-085ea04b5a07?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1022"
                  : reviewerProfileImage
              }
              alt=""
              className="user-img"
            />
          </div>
          <div className="user-comment-meta">
            <h5 className="user-name">{reviewerName}</h5>
            <p>{getDate(reviewDate)}</p>
          </div>
        </div>
        <div className="user-rating">
          <p>
            {" "}
            ⭐ <span>{reviewRate}</span>
          </p>
        </div>
      </div>

      <div>{reviewContent}</div>
    </div>
  );
}

import "../styles/commentReview.css";

export default function CommentReview() {
  return (
    <div className="comment-review" aria-label="comment review">
      <div className="comment-review-header">
        <div className="user-profile">
          <div className="user-image-container">
            <img
              src="https://images.unsplash.com/photo-1597393922738-085ea04b5a07?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1022"
              alt=""
              className="user-img"
            />
          </div>
          <div className="user-comment-meta">
            <h5 className="user-name">Sarah Johnson</h5>
            <p>March 15, 2025</p>
          </div>
        </div>
        <div className="user-rating">
          <p>
            {" "}
            ⭐ <span>5.0</span>
          </p>
        </div>
      </div>

      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged.{" "}
      </p>
    </div>
  );
}

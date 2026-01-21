import "../styles/feedback.css";

export default function FeedbackContainer({
  name = "Jenny Doe",
  comment = "Fast delivery, items were well received!",
  date = "10/09/25",
  profileImage,
}) {
  return (
    <div className="feedback-container">
      <div className="section-header">
        <div className="user-profile">
          <div className="user-image-container">
            <img
              src={
                profileImage == null
                  ? "https://images.unsplash.com/photo-1597393922738-085ea04b5a07?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1022"
                  : profileImage
              }
              alt=""
              className="vendor-img"
            />
          </div>
          <h5 className="vendor-name">{name}</h5>
        </div>

        <div className="user-comment-date">{date}</div>
      </div>

      <div>{comment}</div>
    </div>
  );
}

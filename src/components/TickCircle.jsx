import "../styles/TickCircle.css";

const TickCircle = () => {
  return (
    <div className="tick-container">
      <div className="tick-circle">
        <svg
          className="tick-svg"
          viewBox="0 0 60 60"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle className="circle" cx="30" cy="30" r="26" fill="none" />
          <path className="tick" fill="none" d="M18 32l8 8 18-18" />
        </svg>
      </div>
    </div>
  );
};

export default TickCircle;

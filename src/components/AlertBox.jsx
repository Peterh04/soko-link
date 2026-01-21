export default function AlertBox({ message, type, visible }) {
  if (!visible) return null;
  return (
    <div className={`alertBox ${type} ${visible ? "visible" : ""}`}>
      {message}
    </div>
  );
}

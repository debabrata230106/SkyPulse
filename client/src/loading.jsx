import "bootstrap/dist/css/bootstrap.min.css";

export default function LoadingSpinner() {
  return (
    <div
      style={{
        position: "absolute",
        top: 0, // just below header height
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.25)",
      }}
    >
      <div
        className="spinner-border text-light"
        role="status"
        style={{ width: "60px", height: "60px", backgroundColor: "transparent" }}
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

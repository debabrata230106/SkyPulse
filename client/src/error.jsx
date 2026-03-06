// whenever any backend error came , show this page
import { useNavigate } from "react-router-dom";
export default function ErrorPage() {
  const navigate = useNavigate();
  return (
    <div
      style={{ textAlign: "center", marginTop: "100px", padding: "0px 20px" }}
    >
      <h1>⚠️ Unable to load data</h1>
      <br />
      <p>The server is currently unavailable or taking too long to respond.</p>
      <p>Please refresh the page or try again in a few minutes.</p>

      <button onClick={() => navigate("/")} style={{
        marginTop: "50px",
        padding: "5px 15px",
        fontSize: "25px",
        fontWeight: "bold",
        borderRadius: "10px",
        color: "white",
        backgroundColor: "rgb(255, 70, 70)",
        border: "none"
      }}>Retry</button>
    </div>
  );
}

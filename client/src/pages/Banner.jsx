import { useNavigate } from "react-router-dom";
import "../styles/logo.css";

function Banner() {
  const navigate = useNavigate();

  return (
    <div className="title">
      <h1>TalkerAI</h1>
      <div className="banner-buttons">
        <button className="btn" onClick={() => navigate("/login")}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Banner;

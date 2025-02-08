import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import robotherapyImage from "../assets/robotherapy.jpg";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <>
      <h1>
        Feeling Down? Feeling Up? Just Bored? Just looking for a good
        conversation? or Do you need some advice?
      </h1>
      <h2>
        Well you have come to the right place, With help from a well known API
        we are able to give you that sometimes expensive advice or conversation
        you seek. Enjoy in depth conversations as your 'companion' walks through
        your issues.{" "}
      </h2>
      <img className="robo" src={robotherapyImage} alt="AI Therapy Robot" />
    </>
  );
}

export default LandingPage;

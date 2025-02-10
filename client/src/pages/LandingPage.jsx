import { useNavigate } from "react-router-dom";
import "../styles/LandingPage.css";
import robotherapyImage from "../assets/robotherapy.jpg";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Your AI Mental Health Companion</h1>
          <p className="hero-subtitle">
            Experience compassionate, professional mental health support
            anytime, anywhere. Our AI therapist is here to listen, understand,
            and guide you through life's challenges.
          </p>

          <div className="hero-features">
            <div className="feature">
              <div className="feature-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <span>24/7 Support</span>
            </div>
            <div className="feature">
              <div className="feature-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <span>Private & Secure</span>
            </div>
            <div className="feature">
              <div className="feature-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <span>Professional Guidance</span>
            </div>
          </div>
        </div>

        <div className="hero-image">
          <img
            src={robotherapyImage}
            alt="AI Therapy Robot"
            className="therapy-robot"
          />
        </div>
      </div>

      <div className="stats-section">
        <div className="stats-container">
          <div className="stat-item">
            <div className="stat-number">10,000+</div>
            <div className="stat-label">Conversations</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">24/7</div>
            <div className="stat-label">Availability</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">99.9%</div>
            <div className="stat-label">Uptime</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">100%</div>
            <div className="stat-label">Private</div>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <div className="cta-content">
          <h2>Ready to Start Your Mental Health Journey?</h2>
          <p>
            Join the users who have found support, understanding, and guidance
            through our AI companion. Your mental health matters.
          </p>
          <button
            className="cta-primary-large"
            onClick={() => navigate("/createaccount")}
          >
            Get Started Today
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;

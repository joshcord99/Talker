import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { CREATE_USER } from "../utils/mutations";
import "../styles/createaccount.css";

const CreateAccount = () => {
  const [CreateAccountData, setCreateAccountData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    goal: "",
    birthday: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [createUser] = useMutation(CREATE_USER);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCreateAccountData({
      ...CreateAccountData,
      [name]: value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateEmail = (email) => {
    return email.includes("@");
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!validateEmail(CreateAccountData.email)) {
      setErrorMessage("Email must contain an '@' symbol.");
      return;
    }

    if (!validatePassword(CreateAccountData.password)) {
      setErrorMessage(
        "Password must be at least 8 characters long, contain at least one uppercase letter, and one number."
      );
      return;
    }

    if (!CreateAccountData.birthday) {
      setErrorMessage("Please select your birthday.");
      return;
    }

    try {
      const { data } = await createUser({
        variables: {
          input: {
            firstName: CreateAccountData.firstName,
            lastName: CreateAccountData.lastName,
            username: CreateAccountData.username,
            password: CreateAccountData.password,
            age: 25,
            gender: "Not specified",
            dob: CreateAccountData.birthday,
            userEmotion: CreateAccountData.goal || "Neutral",
          },
        },
      });

      localStorage.setItem("id_token", data.createUser.token);
      localStorage.setItem("user", JSON.stringify(data.createUser.profile));
      navigate("/dashboard");
    } catch (err) {
      console.error("Error creating account:", err);
      setErrorMessage("Failed to create account. Please try again.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Create Account</h1>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <div className="form-group">
          <label className="form-label">Username</label>
          <input
            className="form-input"
            type="text"
            name="username"
            value={CreateAccountData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">First Name</label>
          <input
            className="form-input"
            type="text"
            name="firstName"
            value={CreateAccountData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Last Name</label>
          <input
            className="form-input"
            type="text"
            name="lastName"
            value={CreateAccountData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            className="form-input"
            type="email"
            name="email"
            value={CreateAccountData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Password</label>
          <div className="password-input-container">
            <input
              className="form-input password-input"
              type={showPassword ? "text" : "password"}
              name="password"
              value={CreateAccountData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="password-toggle"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              ) : (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Current Emotion</label>
          <input
            className="form-input"
            type="text"
            name="goal"
            value={CreateAccountData.goal}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Birthday</label>
          <input
            className="form-input"
            type="date"
            name="birthday"
            value={CreateAccountData.birthday}
            onChange={handleChange}
            required
          />
        </div>
        <div className="bttn">
          <button type="submit">Create Account</button>
        </div>
      </form>
    </div>
  );
};

export default CreateAccount;

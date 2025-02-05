import { useState } from "react";
import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { CREATE_USER } from "../utils/mutations";
import "../css/logo.css";
import "../css/createaccount.css";

const LOGIN_USER = gql`
  mutation LoginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      token
      user {
        _id
        username
        firstName
        lastName
        email
        age
        gender
        dob
        userEmotion
      }
    }
  }
`;

function Logo() {
  const [showLogin, setShowLogin] = useState(false);
  const [showCreateAccount, setShowCreateAccount] = useState(false);

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const [createAccountData, setCreateAccountData] = useState({
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
  const [showCreatePassword, setShowCreatePassword] = useState(false);
  const [loginUser] = useMutation(LOGIN_USER);
  const [createUser] = useMutation(CREATE_USER);
  const navigate = useNavigate();

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleCreateAccountChange = (e) => {
    const { name, value } = e.target;
    setCreateAccountData({
      ...createAccountData,
      [name]: value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleCreatePasswordVisibility = () => {
    setShowCreatePassword(!showCreatePassword);
  };

  const validateEmail = (email) => {
    return email.includes("@");
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const { data } = await loginUser({
        variables: {
          username: loginData.username,
          password: loginData.password,
        },
      });

      localStorage.setItem("id_token", data.loginUser.token);
      localStorage.setItem("user", JSON.stringify(data.loginUser.user));
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      setErrorMessage("Invalid username or password. Please try again.");
    }
  };

  const handleCreateAccountSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!createAccountData.firstName.trim()) {
      setErrorMessage("First name is required.");
      return;
    }

    if (!createAccountData.lastName.trim()) {
      setErrorMessage("Last name is required.");
      return;
    }

    if (!createAccountData.email.trim()) {
      setErrorMessage("Email is required.");
      return;
    }

    if (!validateEmail(createAccountData.email)) {
      setErrorMessage("Email must contain an '@' symbol.");
      return;
    }

    if (!createAccountData.username.trim()) {
      setErrorMessage("Username is required.");
      return;
    }

    if (!validatePassword(createAccountData.password)) {
      setErrorMessage(
        "Password must be at least 8 characters long, contain at least one uppercase letter, and one number."
      );
      return;
    }

    if (!createAccountData.birthday) {
      setErrorMessage("Please select your birthday.");
      return;
    }

    try {
      const { data } = await createUser({
        variables: {
          input: {
            firstName: createAccountData.firstName,
            lastName: createAccountData.lastName,
            email: createAccountData.email,
            username: createAccountData.username,
            password: createAccountData.password,
            age: 25,
            gender: "Not specified",
            dob: createAccountData.birthday,
            userEmotion: createAccountData.goal || "Neutral",
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

  const handleBackToMain = () => {
    setShowLogin(false);
    setShowCreateAccount(false);
    setErrorMessage("");
    setLoginData({ username: "", password: "" });
    setCreateAccountData({
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      goal: "",
      birthday: "",
    });
  };

  if (showLogin) {
    return (
      <div>
        <form onSubmit={handleLoginSubmit}>
          <h1>Login</h1>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              className="form-input"
              type="text"
              name="username"
              value={loginData.username}
              onChange={handleLoginChange}
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
                value={loginData.password}
                onChange={handleLoginChange}
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

          <div className="bttn">
            <button type="submit">Login</button>
          </div>

          <div className="bttn">
            <button type="button" onClick={() => setShowCreateAccount(true)}>
              Create Account
            </button>
          </div>

          <div className="bttn">
            <button type="button" onClick={handleBackToMain}>
              Back
            </button>
          </div>
        </form>
      </div>
    );
  }

  if (showCreateAccount) {
    return (
      <div>
        <form onSubmit={handleCreateAccountSubmit}>
          <h1>Create Account</h1>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              className="form-input"
              type="text"
              name="username"
              value={createAccountData.username}
              onChange={handleCreateAccountChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">First Name</label>
            <input
              className="form-input"
              type="text"
              name="firstName"
              value={createAccountData.firstName}
              onChange={handleCreateAccountChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Last Name</label>
            <input
              className="form-input"
              type="text"
              name="lastName"
              value={createAccountData.lastName}
              onChange={handleCreateAccountChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              className="form-input"
              type="email"
              name="email"
              value={createAccountData.email}
              onChange={handleCreateAccountChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="password-input-container">
              <input
                className="form-input password-input"
                type={showCreatePassword ? "text" : "password"}
                name="password"
                value={createAccountData.password}
                onChange={handleCreateAccountChange}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={toggleCreatePasswordVisibility}
              >
                {showCreatePassword ? (
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
            <label className="form-label">Goal</label>
            <input
              className="form-input"
              type="text"
              name="goal"
              value={createAccountData.goal}
              onChange={handleCreateAccountChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Birthday</label>
            <input
              className="form-input"
              type="date"
              name="birthday"
              value={createAccountData.birthday}
              onChange={handleCreateAccountChange}
            />
          </div>

          <div className="bttn">
            <button type="submit">Create Account</button>
          </div>

          <div className="bttn">
            <button type="button" onClick={() => setShowLogin(true)}>
              Login
            </button>
          </div>

          <div className="bttn">
            <button type="button" onClick={handleBackToMain}>
              Back
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <>
      <h1 className="title">
        Welcome To Your AI Mental Health Companion
        <button className="btn" onClick={() => setShowLogin(true)}>
          Login
        </button>
        <button className="btn" onClick={() => setShowCreateAccount(true)}>
          Create Account
        </button>
      </h1>
    </>
  );
}

export default Logo;

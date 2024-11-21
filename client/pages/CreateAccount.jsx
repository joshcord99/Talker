import { useState } from "react";
import "../css/createaccount.css";

const CreateAccount = () => {
  const [CreateAccountData, setCreateAccountData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    goal: ""
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCreateAccountData({
      ...CreateAccountData,
      [name]: value,
    });
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

    try {
      const data = await signUp(CreateAccountData);
      Auth.login(data.token);
    } catch (err) {
      console.error("Error: Existing User", err);
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
          />
        </div>

        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            className="form-input"
            type="text"
            name="email"
            value={CreateAccountData.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            className="form-input"
            type="password"
            name="password"
            value={CreateAccountData.password}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Goal</label>
          <input
            className="form-input"
            type="text"
            name="goal"
            value={CreateAccountData.goal}
            onChange={handleChange}
          />
        </div>
        <div className="bttn">
          <button type="submit">
            Create Account
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAccount;

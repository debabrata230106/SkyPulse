import "./loginForm.css";
import { useState } from "react";
import { saveDb } from "./savedb.js";

export default function LoginForm({ isOpen, setIsOpen, fsetSign, fsign, triggerRefresh }) {
  const [sign, setSign] = useState(fsign);
  const [nameError, setNameError] = useState("Username cannot be empty.");
  const [reviewError, setReviewError] = useState("Looks good");

  // handle name input validation
  const handleNameChange = (event) => {
    let value = event.target.value;

    // Strip non-letters
    value = value.replace(/[^a-zA-Z]/g, "");

    // Update state
    setSign({ ...sign, username: value });

    if (value.length === 0) {
      setNameError("Username cannot be empty");
    } else if (value.length < 4) {
      setNameError("Username too short.");
    } else if (value.length > 10 && value.length <= 12) {
      setNameError("Username length exceeded");
    } else if (value.length > 12) {
      value = value.substring(0, 12);
      // Update state
      setSign({ ...sign, username: value });
    } else {
      setNameError("Looks good");
    }
  };

  // handle review input validation
  const handleReviewChange = (event) => {
    let value = event.target.value;

    // Update state
    setSign({ ...sign, review: value });

    if (value.length > 100 && value.length <= 102) {
      setReviewError("Review length exceeded");
    } else if (value.length > 102) {
      value = value.substring(0, 102);
      // Update state
      setSign({ ...sign, review: value });
    } else {
      setReviewError("Looks good");
    }
  };

  // handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    let name = sign.username.trim();
    const fname = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    let review = sign.review.trim();
    const freview =
      review.charAt(0).toUpperCase() + review.slice(1).toLowerCase();
    let frating = parseInt(sign.rating);
    fsetSign({ username: fname, rating: frating, review: freview });
    console.log(fsign);
    try {
      const data = await saveDb({ username: fname, rating: frating, review: freview });
      console.log("Saved:", data);
      triggerRefresh();
    } catch (err) {
      console.error("Submit failed:", err);
    }
    setIsOpen(false);
  };

  return (
    <div id="modal-form" style={{ display: isOpen ? "flex" : "none" }}>
      <form id="form-box" onSubmit={handleSubmit}>
        <h3>
          Sign In Form
          <span id="close-form" onClick={() => setIsOpen(false)}>
            <i className="fa-solid fa-xmark"></i>
          </span>
        </h3>

        <div id="main-form">
          <div id="name-input">
            <input
              className="input"
              type="text"
              id="username"
              name="username"
              autoComplete="name"
              placeholder=" "
              value={sign.username}
              required
              onChange={handleNameChange}
            />
            <label htmlFor="username">Username</label>

            <p
              id="name-p"
              style={{
                color: nameError === "Looks good" ? "#00ff84df" : "#ff2d57",
              }}
            >
              {nameError === "Looks good" ? (
                <i className="fa-solid fa-circle-check"></i>
              ) : (
                <i className="fa-solid fa-circle-exclamation"></i>
              )}
              &nbsp;&nbsp;
              {nameError}
            </p>
          </div>

          <div id="rate-input" className={sign.rating > 0 ? "has-rating" : ""}>
            <h6>Give Rating</h6>
            <div id="stars" className="input">
              {[1, 2, 3, 4, 5].map((num) => {
                return (
                  <div
                    className={sign.rating >= num ? "active-star" : ""}
                    onClick={() => setSign({ ...sign, rating: num })}
                    key={num}
                  >
                    <i className="fa-solid fa-star"></i>
                  </div>
                );
              })}
            </div>
            <p
              id="rate-p"
              style={{ color: sign.rating === 0 ? "#ff2d57" : "#00ff84df" }}
            >
              {sign.rating === 0 ? (
                <i className="fa-solid fa-circle-exclamation"></i>
              ) : (
                <i className="fa-solid fa-circle-check"></i>
              )}
              &nbsp;&nbsp;
              {sign.rating === 0 ? "Please give a rating." : "Looks good"}
            </p>
          </div>

          <div id="review-input">
            <input
              className="input"
              type="text"
              id="review"
              name="review"
              autoComplete="review"
              placeholder=" "
              value={sign.review}
              onChange={handleReviewChange}
            />
            <label htmlFor="review">
              Give Review&nbsp;
              <span id="optional-span">(Optional)</span>
            </label>

            <p
              id="review-p"
              style={{
                color: reviewError === "Looks good" ? "#00ff84df" : "#ff2d57",
              }}
            >
              {nameError === "Looks good" ? (
                <i className="fa-solid fa-circle-check"></i>
              ) : (
                <i className="fa-solid fa-circle-exclamation"></i>
              )}
              &nbsp;&nbsp;
              {reviewError}
            </p>
          </div>
        </div>

        <button
          type="submit"
          id="submit"
          disabled={
            !(
              nameError === "Looks good" &&
              sign.rating !== 0 &&
              reviewError === "Looks good"
            )
          }
        >
          Submit
        </button>
      </form>
    </div>
  );
}

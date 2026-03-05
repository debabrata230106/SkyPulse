import "./footer.css";
import { useEffect, useState } from "react";
import { usersData } from "./data.js";


export default function Footer({ refreshFlag }) {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    async function loadUsersData() {
      try {
        const data = await usersData();
        setUserData(data);
      } catch (err) {
        console.error("Failed to load reviews:", err);
      }
    }

    loadUsersData();
  }, [refreshFlag]);

  return (
    <footer id="footer">
      <div id="f-left">
        <h5>
          <img src="/logo.png" alt="logo" id="sp-logo" />
          In SkyPulse you can find weather information for any city in the
          world.
        </h5>

        <p id="disclaimer">
          <i className="fa-solid fa-exclamation"></i>&nbsp; SkyPulse is made for
          learning purpose, so weather data may vary slightly from official
          forecasts.
        </p>

        <div id="links">
          <a
            href="https://github.com/debabrata230106/SkyPulse.git"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-github"></i>
            Github
          </a>
          <a
            href="https://www.linkedin.com/in/debabrata-dey-166aa93a9/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-linkedin-in"></i>
            Linkedin
          </a>
        </div>

        <p id="copyright">
          <i className="fa-solid fa-copyright"></i> {new Date().getFullYear()}{" "}
          SkyPulse | Made by Debabrata
        </p>
      </div>
      <div id="f-right">
        <p>
          <i className="fa-solid fa-users-line"></i>
          Feedback
        </p>
        <div id="feedback" role="list">
          {userData.map((user) => {
            return (
              <div className="user" key={user._id} role="listitem">
                <p><i className="fa-regular fa-user"></i>&nbsp;{user.username}</p>
                <div>
                  {[1, 2, 3, 4, 5].map((num) => {
                    return (
                      <i
                        className={
                          num <= user.rating
                            ? "fa-solid fa-star"
                            : "fa-regular fa-star"
                        }
                        style={{
                          color: num <= user.rating ? "#ffef40e3" : "",
                        }}
                        key={num}
                      ></i>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </footer>
  );
}

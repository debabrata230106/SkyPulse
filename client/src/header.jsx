import "./header.css";
import Tooltip from "./tooltip.jsx";
import Search from "./search.jsx";

export default function Header({
  setIsOpen,
  fsign,
  fsetSign,

  setInput,
  input,
  setSuggestions,
  onSelectCity,

  setInputFocus,
}) {
  return (
    <div id="main-1">
      <div id="main11">
        <img id="logo" src="/logo.png" alt="logo" />
        <p id="title">SkyPulse</p>
      </div>

      <Search
        input={input}
        setInput={setInput}
        setSuggestions={setSuggestions}
        onSelectCity={onSelectCity}
        setInputFocus={setInputFocus}
      />

      <div id="login-out">
        <button
          onClick={() => {
            fsign.username
              ? fsetSign({ username: "", rating: 0, review: "" })
              : setIsOpen(true);
          }}
          className= {fsign.username ? "logout" : "login"}
        >
          {fsign.username ? (
            <p className="log-text">Logout</p>
          ) : (
            <p className="log-text">Login</p>
          )}
          {fsign.username ? (
            <i
              className="fa-solid fa-right-from-bracket"
            ></i>
          ) : (
            <i
              className="fa-solid fa-right-to-bracket"
            ></i>
          )}
        </button>
      </div>

      <div id="user">
        <Tooltip
          username={fsign.username} //prop
          rating={fsign.rating} //prop
          childdiv={
            //prop
            <div
              id="user-info-display"
              style={{
                //inline style for more preference
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "10px",
                padding: "0",
                margin: "0",
                fontSize: "20px",
                fontWeight: "lighter",
              }}
            >
              <i
                className="fa-solid fa-user"
                style={{ color: "rgb(38, 140, 230)" }}
              ></i>
              <p id="user-text">
                {fsign.username
                  ? `Hi, ${fsign.username}`
                  : `Hi, User`}
              </p>
            </div>
          }
        />
      </div>
    </div>
  );
}

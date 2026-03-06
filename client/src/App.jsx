// styles
import "./App.css";

//functions
// import { checkCity } from "./checkCity.js";
import { fetchWeather } from "./fetchWeather.js";
import { getCityName } from "./getCityName.js";
import { searchCity } from "./searchHandler.js";
import { checkCity } from "./checkCity.js";

//components
import Header from "./header.jsx";
import LoginForm from "./loginForm.jsx";
import Hourly from "./hourly.jsx";
import Daily from "./daily.jsx";
import Primary from "./primary.jsx";
import Loading from "./loading.jsx";
import Sugglist from "./sugglist.jsx";
import Footer from "./footer.jsx";

// error page
import ErrorPage from "./error.jsx";

//hooks
import { useReducer, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

//initial state
const initialState = {
  status: "idle", // idle | loading

  weather: null,

  autoCity: null, // from geolocation (NOT saved)

  userCity: localStorage.getItem("lastCity") || "New York", // saved city

  activeCity: null, // what is currently shown on screen

  input: "",

  suggestions: [],
};

// function to update state on every action
function reducer(state, action) {
  switch (action.type) {
    case "LOADING":
      return { ...state, status: "loading" };

    case "DONE":
      return { ...state, status: "idle" };

    case "SET_WEATHER":
      return { ...state, weather: action.payload };

    case "SET_AUTO_CITY":
      return { ...state, autoCity: action.payload, activeCity: action.payload };

    case "SET_USER_CITY":
      localStorage.setItem("lastCity", action.payload);
      return { ...state, userCity: action.payload, activeCity: action.payload };

    case "SET_INPUT":
      return { ...state, input: action.payload };

    case "SET_SUGGESTIONS":
      return { ...state, suggestions: action.payload };

    default:
      return state;
  }
}

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [degree, setDegree] = useState("far");
  const [fsign, fsetSign] = useState({ username: "", rating: 0, review: "" });
  const [isOpen, setIsOpen] = useState(false);
  const [inputFocus, setInputFocus] = useState(false); // for controlling sugg list visibility depending on input focus.
  const [refreshFlag, setRefreshFlag] = useState(false); // to refresh the footer after db update.

  const [state, dispatch] = useReducer(reducer, initialState);

  const monthnames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    if (state.activeCity) {
      // nothing happens if activeCity is null
      dispatch({ type: "SET_INPUT", payload: state.activeCity });
    }
  }, [state.activeCity]); // change input when activeCity changes

  useEffect(() => {
    async function boot(userCity) {
      dispatch({ type: "LOADING" });

      try {
        const pos = await new Promise((res, rej) =>
          navigator.geolocation.getCurrentPosition(res, rej),
        );

        const { latitude, longitude } = pos.coords;

        const data = await fetchWeather({ latitude, longitude, navigate });
        const city = (await getCityName({ latitude, longitude })) || "Unknown";

        if (!data) {
          //go in catch
          throw new Error();
        } else {
          dispatch({ type: "SET_AUTO_CITY", payload: city });
          dispatch({ type: "SET_WEATHER", payload: data });
        }
      } catch {
        if (userCity) {
          await searchCity(
            userCity,
            dispatch,
            navigate,
            fetchWeather,
            checkCity,
          );
        }
      }

      dispatch({ type: "DONE" });
    }

    boot(state.userCity);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    navigator.permissions?.query({ name: "geolocation" }).then((p) => {
      p.onchange = async () => {
        if (p.state === "granted") {
          window.location.reload(); // simplest + correct UX: refresh the page
        }

        if (p.state === "denied" && state.userCity) {
          searchCity(
            state.userCity,
            dispatch,
            navigate,
            fetchWeather,
            checkCity,
          );
        }
      };
    });
  }, [state.userCity, navigate]);

  if (location.pathname === "/error") {
    return <Error />;
  }
  return (
    <>
      <div id="main">
        <Header
          // for auth
          setIsOpen={setIsOpen}
          fsign={fsign}
          fsetSign={fsetSign}
          setSuggestions={(v) =>
            dispatch({ type: "SET_SUGGESTIONS", payload: v })
          }
          setInput={(v) => dispatch({ type: "SET_INPUT", payload: v })}
          input={state.input}
          onSelectCity={(city) =>
            searchCity(city, dispatch, navigate, fetchWeather, checkCity)
          }
          setInputFocus={setInputFocus}
        />

        <div
          id="main-2"
          style={{ filter: state.status === "loading" ? "blur(5px)" : "none" }}
        >
          <div id="left">
            <Primary
              weather={state.weather}
              activeCity={state.activeCity}
              monthnames={monthnames}
              degree={degree}
              setDegree={setDegree}
            />
            <Hourly
              weather={state.weather}
              monthnames={monthnames}
              degree={degree}
            />
          </div>
          <div>
            <Daily
              weather={state.weather}
              monthnames={monthnames}
              degree={degree}
            />
          </div>
        </div>

        <LoginForm
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          fsetSign={fsetSign}
          fsign={fsign}
          triggerRefresh={() => setRefreshFlag((prev) => !prev)}
        />

        <Footer refreshFlag={refreshFlag} />
      </div>

      {/* only loading spinner visible when loading  */}
      {state.status === "loading" && <Loading />}

      <Sugglist
        suggestions={state.suggestions}
        setSuggestions={(v) =>
          dispatch({ type: "SET_SUGGESTIONS", payload: v })
        }
        setInput={(v) => dispatch({ type: "SET_INPUT", payload: v })}
        onSelectCity={(city) =>
          searchCity(city, dispatch, navigate, fetchWeather, checkCity)
        }
        inputFocus={inputFocus}
      />
    </>
  );
}

export default App;

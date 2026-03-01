import "./sugglist.css";

export default function Sugglist({ suggestions, setSuggestions, setInput, onSelectCity, inputFocus }) {

  if (suggestions.length === 0) {
    return <></>;
  }
  return (
    <ul id="sugg" style={{ display: inputFocus ? "" : "none" }}>
      {suggestions.map((s, idx) => (
        <li
          key={idx}
          onMouseDown={() => {
            setInput(s);
            setSuggestions([]);
            onSelectCity(s);   // call parent search function
          }}
        >
          {s}
        </li>
      ))}
    </ul>
  );
}

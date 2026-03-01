import "./header.css";

export default function SearchBox({
  input,
  setInput,
  setSuggestions,
  onSelectCity,

  setInputFocus,
}) {
  // Fetch suggestions when user types & what typed is immediately set as input
  const handleInputChange = async (e) => {
    const value = e.target.value;
    setInput(value);

    if (value.length > 3) {
      try {
        //Api fetch
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/cities?query=${value}`,
        );
        const data = await res.json();
        setSuggestions(data);
      } catch (err) {
        console.error("Error fetching city suggestions:", err);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSelectCity(input);
      setSuggestions([]);
    }
  };

  return (
    <div id="search">
      <input
        type="text"
        placeholder={input ? "" : "City"}
        name="city"
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}

        onFocus={() => setInputFocus(true)}
        onBlur={() => setInputFocus(false)}
      />
      <button
        onClick={() => {
          onSelectCity(input);
          setSuggestions([]);
        }}
      >
        <i className="fa-solid fa-magnifying-glass-location"></i>
        <span id="search-text"> Search</span>
      </button>
    </div>
  );
}

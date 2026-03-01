export async function saveDb(fsign) {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/savedb`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fsign),
    });

    const data = await res.json();
    console.log("Saved to DB:", data);
  } catch (err) {
    console.error("Error saving user data:", err);
  }
}

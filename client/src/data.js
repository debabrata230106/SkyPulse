export async function usersData() {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/usersdata`);

  if (!res.ok) {
    throw new Error("Failed to fetch users data");
  }

  return res.json();
}
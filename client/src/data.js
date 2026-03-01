export async function usersData() {
  const res = await fetch("http://localhost:3000/usersdata");

  if (!res.ok) {
    throw new Error("Failed to fetch users data");
  }

  return res.json();
}
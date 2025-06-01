export default async function fetchUserData(endpoint) {
  try {
    console.log('hehe')
    const response = await fetch(`http://localhost:3001${endpoint}`);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("fetchModel error:", err);
    return null;
  }
}
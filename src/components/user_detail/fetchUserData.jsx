export default async function fetchUserData(endpoint) {
  try {
    console.log("hehe");
    const response = await fetch(`https://ngl6xs-3001.csb.app${endpoint}`);
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

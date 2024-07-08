export async function getAllUsers() {
  const res = await fetch('https://6683b4274102471fa4cb0564.mockapi.io/api/v1/users')
  const data = await res.json()

  return data
}
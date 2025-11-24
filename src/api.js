const BASE = 'https://jsonplaceholder.typicode.com'


export async function fetchUsers(){
const res = await fetch(`${BASE}/users`)
if(!res.ok) throw new Error('Failed to fetch users')
return res.json()
}


export async function fetchPostsByUser(userId){
const res = await fetch(`${BASE}/posts?userId=${userId}`)
if(!res.ok) throw new Error('Failed to fetch posts')
return res.json()
}
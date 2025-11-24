import React, { useEffect, useState } from 'react'
import { fetchPostsByUser } from '../api'


export default function UserPosts({ userId, onError }){
const [posts, setPosts] = useState([])
const [loading, setLoading] = useState(false)
const [error, setError] = useState(null)


useEffect(() => {
if(!userId) return
setLoading(true)
setError(null)
fetchPostsByUser(userId)
.then(data => setPosts(data))
.catch(err => { setError(err.message); onError && onError(err.message) })
.finally(() => setLoading(false))
}, [userId]) // dependency array ensures fetch runs when userId changes


if(loading) return <div className="loading">Loading posts...</div>
if(error) return <div className="error">{error}</div>


return (
<div className="posts">
{posts.map(p => (
<div key={p.id} className="post">
<h4>{p.title}</h4>
<p>{p.body}</p>
</div>
))}
</div>
)
}
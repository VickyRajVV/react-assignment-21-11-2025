import React from 'react'


export default function UserCard({ user, onClick }){
return (
<div className="card" onClick={() => onClick(user)} style={{cursor:'pointer'}}>
<h4>{user.name}</h4>
<p style={{margin: '6px 0'}}>{user.email}</p>
<small>{user.company?.name}</small>
</div>
)
}
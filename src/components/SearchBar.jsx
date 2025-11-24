import React from 'react'



export default function SearchBar({ value, onChange, inputRef }){
return (
<input
ref={inputRef}
className="input"
placeholder="Search users by name or email..."
value={value}
onChange={e => onChange(e.target.value)}
style={{width: '100%', boxSizing:'border-box'}}
/>
)
}
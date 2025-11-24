import React, { useEffect, useMemo, useRef, useState } from 'react'
import { fetchUsers } from '../api'
import UserCard from './UserCard'
import SearchBar from './SearchBar'
import Pagination from './Pagination'
import Modal from './Modal'
import UserPosts from './UserPosts'
import { useFetch } from '../hooks/useFetchReducer'


function generateFakeUsers(count, startId) {
  const fakeUsers = [];
  for (let i = 0; i < count; i++) {
    fakeUsers.push({
      id: startId + i,
      name: `Fake User ${i + 1}`,
      email: `fake${i + 1}@example.com`,
      phone: "000-000-0000",
      company: { name: "Fake Company" },
      address: { street: "Fake Street", city: "Fake City" }
    });
  }
  return fakeUsers;
}

export default function UserList(){
// useFetch demonstrates useReducer internally and returns {loading,error,data}
const { loading, error, data: apiUsers } = useFetch(
  "https://jsonplaceholder.typicode.com/users",
  []
);

const users = useMemo(() => {
  if (!apiUsers) return [];

  const fakeUsers = generateFakeUsers(20, apiUsers.length + 1); 
  return [...apiUsers, ...fakeUsers];
}, [apiUsers]);



// Local UI state using useState
// useState is imported as a named import: `import React, { useState } from 'react'` or `import { useState } from 'react'`.
// We import useState in {} because it's a named export from the React package (not the default export).
// Example: `import React, { useState } from 'react'` -> React is default, useState is named.


const [query, setQuery] = useState('')
const [selectedUser, setSelectedUser] = useState(null)
const [isModalOpen, setModalOpen] = useState(false)
const inputRef = useRef(null) // will point to search input DOM node


// Pagination state
const [currentPage, setCurrentPage] = useState(1)
const perPage = 6


// useMemo to avoid recalculating filtered list on every render unless `users` or `query` changes
const filteredUsers = useMemo(() => {
if(!users) return []
const q = query.trim().toLowerCase()
if(!q) return users
return users.filter(u => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q))
}, [users, query])


// Derived values for pagination
const totalPages = Math.max(1, Math.ceil(filteredUsers.length / perPage))
const pageUsers = useMemo(() => {
const start = (currentPage - 1) * perPage
return filteredUsers.slice(start, start + perPage)
}, [filteredUsers, currentPage])


useEffect(() => {
// focus the search input on mount
inputRef.current?.focus()
}, []) // empty dependency array -> runs once on mount


useEffect(() => {
// if query changes, reset to page 1
setCurrentPage(1)
}, [query])


const handleUserClick = (user) => {
setSelectedUser(user)
setModalOpen(true)
}


return (
<div>
<div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
<h2>Users</h2>
</div>

{loading && <div className="loading">Loading users...</div>}
{error && <div className="error">{error}</div>}

<SearchBar value={query} onChange={setQuery} inputRef={inputRef} />

<div className="grid" style={{ marginTop: 12 }}>
  {pageUsers.map(u => (
    <UserCard key={u.id} user={u} onClick={handleUserClick} />
  ))}
</div>

<Pagination 
  currentPage={currentPage} 
  totalPages={totalPages} 
  onPageChange={setCurrentPage} 
/>

<Modal open={isModalOpen} onClose={() => setModalOpen(false)}>
  {selectedUser && (
    <div>
      <h3>{selectedUser.name}</h3>
      <p><strong>Email:</strong> {selectedUser.email}</p>
      <p><strong>Phone:</strong> {selectedUser.phone}</p>
      <p><strong>Company:</strong> {selectedUser.company?.name}</p>
      <p><strong>Address:</strong> {selectedUser.address?.street}, {selectedUser.address?.city}</p>

      <hr />

      <h4>Posts by {selectedUser.name}</h4>
      <UserPosts 
        userId={selectedUser.id} 
        onError={(msg) => console.error(msg)} 
      />
    </div>
  )}
</Modal>

</div>
)
}

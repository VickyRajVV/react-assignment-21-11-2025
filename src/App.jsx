
import React from 'react'
import UserList from './components/UserList'

export default function App() {
  return (
    <div className="container">
      <header className="header">
        <div>
          <h1 style={{ margin: 0 }}> Users & Details</h1>
          <p style={{ margin: '6px 0 0 0', color: '#555' }}>
            <hr />
          </p>
        </div>
      </header>

      <main style={{ marginTop: 18 }}>
        <UserList />
      </main>

      <footer style={{ marginTop: 28, fontSize: 13, color: '#666' }}>
        <p style={{ margin: 0 }}>
         <hr />
        </p>
      </footer>
    </div>
  )
}

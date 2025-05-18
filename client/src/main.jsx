import React from 'react'
import ReactDOM from 'react-dom/client'
import App, { SocketContext } from './App.jsx'
import { UserProvider } from './UserContext.jsx'
import { SocketProvider } from './SocketContext.jsx'
import { PageProvider } from './PageContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SocketProvider>
      <PageProvider>
      <UserProvider>
        <App />
      </UserProvider>
      </PageProvider>
    </SocketProvider>
  </React.StrictMode>,
)

import { createContext, useState, useEffect } from 'react'
import { io, Socket } from 'socket.io-client'

const socket: Socket = io('http://localhost:3000')
const SocketContext = createContext<Socket>(socket)

const SocketProvider: React.FC = ({ children }) => {
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  )
}

export { SocketContext, SocketProvider }

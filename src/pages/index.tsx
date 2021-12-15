import { useEffect, useState } from 'react'
import io, { Socket } from 'socket.io-client'
import { Textarea } from '../components/Textarea'

const socket: Socket = io('http://localhost:3000')

type Chat = {
  message: string
}

export default function Home() {
  const [newChat, setNewChat] = useState<Chat>()
  const [chats, setChats] = useState<Chat[]>([])

  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected！')
      socket.emit('joinRoom', { room: 'testroom' })
    })

    socket.on('disconnect', () => {
      console.log('disconnected')
    })

    socket.on('msgToClient', (newData) => {
      console.log('received message', newData)
      setNewChat(newData)
    })
    return () => {
      socket.close()
    }
  }, [])

  useEffect(() => {
    if (newChat?.message) {
      setChats([newChat, ...chats])
    }
  }, [newChat])

  return (
    <div className=" w-2/3 mx-auto">
      <h1 className="text-3xl my-10">Chat</h1>
      <Textarea socket={socket} />
      <ul role="list" className="divide-y divide-gray-20 ">
        {chats.map((chat, idx) => {
          return (
            <li key={idx} className="px-4 py-4 sm:px-6 flex">
              <span className="inline-block h-10 w-10 mr-4 rounded-full overflow-hidden bg-gray-100">
                <svg
                  className="h-full w-full text-gray-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </span>
              <p className="w-full h-10">{chat.message}</p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

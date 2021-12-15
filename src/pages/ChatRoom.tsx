import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { Textarea } from '../components/Textarea'
import { SocketContext } from '../lib/Socket'

type Chat = {
  message: string
}

export default function ChatRoom() {
  const socket = useContext(SocketContext)
  const router = useRouter()
  const query = router.query
  const [room, setRoom] = useState<string>()
  const [newChat, setNewChat] = useState<Chat>()
  const [chats, setChats] = useState<Chat[]>([])
  useEffect(() => {
    socket.on('msgToClient', (message) => {
      console.log('received message', message)
      setNewChat(message)
    })
  }, [])

  useEffect(() => {
    if (newChat?.message) {
      setChats([newChat, ...chats])
    }
  }, [newChat])

  useEffect(() => {
    const room = query.room
    if (typeof room == 'string') setRoom(room)
    else {
      alert('Error: Return to top page')
      router.push('/')
    }
  }, [query])

  return (
    <div className=" w-2/3 mx-auto">
      <h1 className="text-3xl my-10">Chat</h1>
      <Textarea room={room} />
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

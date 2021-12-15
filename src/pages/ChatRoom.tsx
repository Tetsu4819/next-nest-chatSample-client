import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { Message } from '../components/Message'
import { Textarea } from '../components/Textarea'
import { ChatModel } from '../lib/models'
import { SocketContext } from '../lib/Socket'

export default function ChatRoom() {
  const socket = useContext(SocketContext)
  const router = useRouter()
  const query = router.query
  const [room, setRoom] = useState<string>()
  const [name, setName] = useState<string>()
  const [newChat, setNewChat] = useState<ChatModel>()
  const [chats, setChats] = useState<ChatModel[]>([])
  useEffect(() => {
    socket.on('msgToClient', (message) => {
      console.log('received message', message)
      setNewChat(message)
    })
  }, [])

  useEffect(() => {
    if (newChat) {
      setChats([newChat, ...chats])
    }
  }, [newChat])

  useEffect(() => {
    const room = query.room
    const name = query.name
    if (typeof room === 'string' && typeof name === 'string') {
      setRoom(room)
      setName(name)
    } else {
      alert('Error: Return to top page')
      router.push('/')
    }
  }, [query])

  return (
    <div className=" w-2/3 mx-auto">
      <h1 className="text-3xl my-10">Chat</h1>
      <Textarea room={room} name={name} />
      <ul role="list" className="divide-y divide-gray-20 ">
        {chats.map((chat, idx) => {
          return (
            <li key={idx} className="px-4 py-4 sm:px-6 flex">
              <Message chat={chat} />
            </li>
          )
        })}
      </ul>
    </div>
  )
}

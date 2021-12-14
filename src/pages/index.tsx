import { useEffect, useState } from 'react'
import io from 'socket.io-client'
const socket = io('http://localhost:3000')

type Chat = {
  message: string
}

export default function Home() {
  const [text, setText] = useState('')
  const [newChat, setNewChat] = useState<Chat>()
  const [chats, setChats] = useState<Chat[]>([])

  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected！')
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
      setChats([...chats, newChat])
    }
  }, [newChat])

  const submit = () => {
    socket.emit('msgToServer', { message: text })
    setText('')
    console.log('submit')
  }

  return (
    <div>
      <textarea
        value={text}
        className="border w-96"
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <button
        className="bg-blue-500 h-8 w-20 mx-auto rounded-md text-center"
        onClick={submit}
      >
        submit
      </button>

      {chats.map((chat, idx) => {
        return <p key={idx + chat.message}>{chat.message}</p>
      })}
    </div>
  )
}

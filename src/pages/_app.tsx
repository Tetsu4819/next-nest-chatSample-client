import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import { SocketContext, SocketProvider } from '../lib/Socket'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const socket = useContext(SocketContext)
  const router = useRouter()

  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected！')
    })

    socket.on('joinedRoom', (data) => {
      const room = data.room
      const name = data.name
      room &&
        router.push({
          pathname: '/ChatRoom',
          query: { room: room, name: name }
        })
    })

    socket.on('disconnect', () => {
      console.log('disconnected')
    })

    return () => {
      socket.close()
    }
  }, [])

  return (
    <SocketProvider>
      <Component {...pageProps} />
    </SocketProvider>
  )
}

export default MyApp

import { useContext, useState } from 'react'
import { SocketContext } from '../lib/Socket'

export const Login = () => {
  const socket = useContext(SocketContext)
  const [room, setRoom] = useState<string>('')
  const [name, setName] = useState<string>('')

  const handleSubmit = () => {
    if (!room || !name) {
      alert('Value is missing.')
      return
    }
    const loginInfo = { room: room, name: name }
    socket.emit('joinRoom', loginInfo)
  }
  return (
    <>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8 mt-20">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Enter Room
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="room"
                  className="block text-sm font-medium text-gray-700"
                >
                  Room ID
                </label>
                <div className="mt-1">
                  <input
                    id="room"
                    name="room"
                    type="room"
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  User Name
                </label>
                <div className="mt-1">
                  <input
                    id="name"
                    name="name"
                    type="name"
                    autoComplete="current-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <button
                  onClick={handleSubmit}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Enter
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

import { Fragment, useContext, useState } from 'react'
import {
  EmojiHappyIcon,
  EmojiSadIcon,
  FireIcon,
  HeartIcon,
  PaperClipIcon,
  ThumbUpIcon,
  XIcon
} from '@heroicons/react/solid'
import { Listbox, Transition } from '@headlessui/react'
import { SocketContext } from '../lib/Socket'

const moods = [
  {
    name: 'Excited',
    value: 'excited',
    icon: FireIcon,
    iconColor: 'text-white',
    bgColor: 'bg-red-500'
  },
  {
    name: 'Loved',
    value: 'loved',
    icon: HeartIcon,
    iconColor: 'text-white',
    bgColor: 'bg-pink-400'
  },
  {
    name: 'Happy',
    value: 'happy',
    icon: EmojiHappyIcon,
    iconColor: 'text-white',
    bgColor: 'bg-green-400'
  },
  {
    name: 'Sad',
    value: 'sad',
    icon: EmojiSadIcon,
    iconColor: 'text-white',
    bgColor: 'bg-yellow-400'
  },
  {
    name: 'Thumbsy',
    value: 'thumbsy',
    icon: ThumbUpIcon,
    iconColor: 'text-white',
    bgColor: 'bg-blue-500'
  },
  {
    name: 'I feel nothing',
    value: null,
    icon: XIcon,
    iconColor: 'text-gray-400',
    bgColor: 'bg-transparent'
  }
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
type Props = {
  room: string
  name: string
}

export const Textarea = (props: Props) => {
  const { room, name } = props
  const socket = useContext(SocketContext)
  const [text, setText] = useState<string>('')
  const [selected, setSelected] = useState(moods[5])

  const submit = () => {
    const data = { room: room, name: name, message: text }
    console.log(data)
    socket.emit('msgToServer', data)
    setText('')
    console.log('submit!')
  }

  return (
    <div className="flex items-start space-x-4 my-4">
      <div className="flex-shrink-0">
        <span className="inline-block h-14 w-14 rounded-full overflow-hidden bg-gray-100">
          <svg
            className="h-full w-full text-gray-300"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </span>
      </div>
      <div className="min-w-0 flex-1">
        <div className="relative">
          <div className="border border-gray-300 rounded-lg shadow-sm overflow-hidden ">
            <label htmlFor="comment" className="sr-only">
              Add your comment
            </label>
            <textarea
              value={text}
              rows={3}
              id="comment"
              className="block w-full p-3 border-0 resize-none focus:ring-0 sm:text-sm"
              placeholder="Add your comment..."
              defaultValue={''}
              onChange={(e) => setText(e.target.value)}
            />

            <div className="py-2" aria-hidden="true">
              <div className="py-px">
                <div className="h-9" />
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 inset-x-0 pl-3 pr-2 py-2 flex justify-between">
            <div className="flex items-center space-x-5">
              <div className="flex items-center">
                <button
                  type="button"
                  className="-m-2.5 w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-500"
                >
                  <PaperClipIcon className="h-5 w-5" aria-hidden="true" />
                  <span className="sr-only">Attach a file</span>
                </button>
              </div>
              <div className="flex items-center">
                <Listbox value={selected} onChange={setSelected}>
                  {({ open }) => (
                    <>
                      <Listbox.Label className="sr-only">
                        Your mood
                      </Listbox.Label>
                      <div className="relative">
                        <Listbox.Button className="relative -m-2.5 w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-500">
                          <span className="flex items-center justify-center">
                            {selected.value === null ? (
                              <span>
                                <EmojiHappyIcon
                                  className="flex-shrink-0 h-5 w-5"
                                  aria-hidden="true"
                                />
                                <span className="sr-only">Add your mood</span>
                              </span>
                            ) : (
                              <span>
                                <div
                                  className={classNames(
                                    selected.bgColor,
                                    'w-8 h-8 rounded-full flex items-center justify-center'
                                  )}
                                >
                                  <selected.icon
                                    className="flex-shrink-0 h-5 w-5 text-white"
                                    aria-hidden="true"
                                  />
                                </div>
                                <span className="sr-only">{selected.name}</span>
                              </span>
                            )}
                          </span>
                        </Listbox.Button>

                        <Transition
                          show={open}
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="absolute z-10 mt-1 -ml-6 w-60 bg-white shadow rounded-lg py-3 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:ml-auto sm:w-64 sm:text-sm">
                            {moods.map((mood) => (
                              <Listbox.Option
                                key={mood.value}
                                className={({ active }) =>
                                  classNames(
                                    active ? 'bg-gray-100' : 'bg-white',
                                    'cursor-default select-none relative py-2 px-3'
                                  )
                                }
                                value={mood}
                              >
                                <div className="flex items-center">
                                  <div
                                    className={classNames(
                                      mood.bgColor,
                                      'w-8 h-8 rounded-full flex items-center justify-center'
                                    )}
                                  >
                                    <mood.icon
                                      className={classNames(
                                        mood.iconColor,
                                        'flex-shrink-0 h-5 w-5'
                                      )}
                                      aria-hidden="true"
                                    />
                                  </div>
                                  <span className="ml-3 block font-medium truncate">
                                    {mood.name}
                                  </span>
                                </div>
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </>
                  )}
                </Listbox>
              </div>
            </div>
            <div className="flex-shrink-0"></div>
            <button
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={submit}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

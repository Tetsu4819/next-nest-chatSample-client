import { ChatModel } from '../lib/models'

type Props = {
  chat: ChatModel
}

export const Message = (props: Props) => {
  const { name, message } = props.chat
  return (
    <div className="flex">
      <div className="mr-4 flex-shrink-0">
        <span className="inline-block h-10 w-10 mr-4 rounded-full overflow-hidden bg-gray-100">
          <svg
            className="h-full w-full text-gray-300"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </span>
      </div>
      <div>
        <h4 className="text-lg font-bold">{name ? name : 'null'}</h4>
        <p className="mt-1">{message}</p>
      </div>
    </div>
  )
}

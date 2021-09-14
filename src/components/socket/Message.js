
import { format } from 'timeago.js'

export default function Message({ msg, id }) {
  return (

    <div className={msg.sender_id === id ? "message right" : "message left"}>{msg.message}
      <small>
        {format(msg.date)}
      </small>
    </div>


  )
}

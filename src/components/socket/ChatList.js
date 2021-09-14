import './ChatList.css'

export default function ChatList({ name, pic }) {
  return (
    <div className="nc new-user">

      <div className="user-img-box">
        <img className="user-profile-image"
          src={pic} /></div>

      <div className="userName">
        <h5>{name}</h5>
      </div>
      {/* <div className="last-msg-time"></div> */}

    </div>
  )
}


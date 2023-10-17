import React from 'react'
import './Message.css'

function ReceiveMessage(props) {
  return (
    <div className='recv_chat'>
        <p className='recv_head'>
            {props.message}
            <span className='recv_time'>{props.time}</span>
        </p>
    </div>
  )
}

export default ReceiveMessage
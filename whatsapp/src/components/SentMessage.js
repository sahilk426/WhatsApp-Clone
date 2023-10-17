import React from 'react'
import './Message.css'

function SentMessage(props) {
  return (
    <div className='sent_chat'>
        <p className='sent_head'>
            {props.message}
            <span className='sent_time'> {props.time} </span>
        </p>
    </div>
  )
}

export default SentMessage
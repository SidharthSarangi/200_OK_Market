import React from 'react'
import {format} from "timeago.js" ;

const Message = (props) => {
 
  const {message,own} = props ;

  return (
    <div className={own ?'message own':'message'}>
        <div className='messageTop'>
            <img 
                className='messageImg'
                src='https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cGVvcGxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
                alt=""
            />
            <p className='messageText'>{message.text}</p>
        </div>
        <div className='messageBottom'>{format(message.createdAt)}</div>
    </div>
  )
}

export default Message
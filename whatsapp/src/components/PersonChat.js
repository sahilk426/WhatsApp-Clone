import React, { useContext, useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import { styled, Box, Typography } from "@mui/material";
import './PersonChat.css'
import { AppContext } from '../context/AppContext';
import { setConversation ,getConversation} from '../service/api';
import { formatDate } from '../utils/common-utils';


const Timestamp = styled(Typography)`
    font-size: 12px;
    margin-left: auto;
    color: #00000099;
`;

const PersonChat = ({user}) => {
  const {account,setSelectedPerson,newMessageFlag} = useContext(AppContext);
  const [message, setMessage] = useState({});

  useEffect(() => {
    const getConversationMessage = async() => {
        const data = await getConversation({ senderId: account.sub, receiverId: user.sub });
        setMessage({ text: data?.message, timestamp: data?.updatedAt });
    }
    getConversationMessage();
}, [newMessageFlag]);
  return (
    <div className='personal_chats' onClick={async() => {
      setSelectedPerson(user);
      await setConversation({senderId:account.sub,receiverId:user.sub});
    }}>
        <div className='chats_avatar'>
            <Avatar src={user.picture}/>
        </div>
        <div className='chats_details'>
            <h1>{user.name}</h1>
            <p style={{display:"flex",justifyContent:'space-between'}}>
              <p>{message?.text?.includes('localhost') ? 'media' : message.text}</p>
              
              <p style={{textAlign:'right',marginRight:'4px'}}>{ message?.text && <Timestamp>{formatDate(message?.timestamp)}</Timestamp>}</p>
            </p>
        </div>
    </div>
  )
}

export default PersonChat
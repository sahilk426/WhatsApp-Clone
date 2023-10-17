import React, { useContext, useEffect, useState } from "react";
import "./Chat.css";
import Avatar from "@mui/material/Avatar";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from "@mui/icons-material/Search";
import IconButton from '@mui/material/IconButton';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import MicIcon from '@mui/icons-material/Mic';
import SentMessage from "./SentMessage";
import ReceiveMessage from "./ReceiveMessage";
import EmptyChat from "./EmptyChat";
import { Box, styled, Typography } from '@mui/material';
import { AppContext } from "../context/AppContext";
import { getConversation, getMessages, newMessages, uploadFile } from "../service/api";
import SendIcon from '@mui/icons-material/Send';
import { downloadMedia, formatDate } from "../utils/common-utils";
import EmojiPicker from 'emoji-picker-react';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { GetApp as GetAppIcon } from '@mui/icons-material';

const Time = styled(Typography)`
    font-size: 10px;
    color: #919191;
    margin-top: 6px;
    word-break: keep-all;
    margin-top: auto;
`;

const Chat = () => {
  const {selectedPerson,account,socket,setActiveUsers,activeUsers} = useContext(AppContext);
  const [text,setText] = useState('');
  const [flag,setFlag] = useState(false);
  const [conversation,setConversation] = useState({});
  const [message,setMessage] = useState([]);
  const [file,setFile] = useState();
  const [image,setImage] = useState('');
  const [incomingMessage,setIncomingMessage] = useState(null);

  const submitHandler = async() => {
    let message = {};
    if (!file) {
      message = {
        senderId: account.sub,
        receiverId: selectedPerson.sub,
        conversationId: conversation._id,
        type: 'text',
        text: text
      }
    }else {
      message = {
        senderId: account.sub,
        receiverId: selectedPerson.sub,
        conversationId: conversation._id,
        type: 'file',
        text: image
      }
    }
    socket.current.emit('sendMessage',message);
    await newMessages(message);
    setText('');
    setFile('');
    setImage('');
    setFlag(!flag);
  }
  useEffect(() => {
    socket.current.on('getMessage',data => {
      setIncomingMessage({
        ...data,
        createdAt:Date.now()
      })
    })
  },[]);
  useEffect(() => {
    incomingMessage && conversation?.members?.includes(incomingMessage.senderId) && 
        setMessage((prev) => [...prev, incomingMessage]);
  }, [incomingMessage, conversation]);
  useEffect(() => {
    const getConversationDetail = async() => {
      let data = await getConversation({senderId : account.sub,receiverId:selectedPerson.sub});
      setConversation(data);
      console.log('getConversation',data);
    }
    selectedPerson && getConversationDetail();
  },[selectedPerson]);
  useEffect(() => {
    const getMessageDetails = async() => {
      let data = await getMessages(conversation._id);
      setMessage(data);
      console.log('getMessage',data);
    }
    conversation._id && getMessageDetails();
  },[selectedPerson._id,conversation._id,flag]);
  useEffect(() => {
    const getImage = async () => {
      if (file) {
          const data = new FormData();
          data.append("name", file.name);
          data.append("file", file);

          const response = await uploadFile(data);
          setImage(response.data);
      }
    }
    getImage();
  },[file]);
  useEffect(() => {
    socket.current.emit('addUser', account);
    socket.current.on("getUsers", users => {
        setActiveUsers(users);
    })
}, [account])
  const onFileChange = (e) => {
    setFile(e.target.files[0]);
    setText(e.target.files[0].name);
    // console.log(e);
  }
  return (
      <>
      {!selectedPerson &&
        <EmptyChat/>
      }
      {selectedPerson &&
        <div className="chat">
        <div className="chat_top">
          <div id="chat_icon">
            <Avatar src={selectedPerson.picture}/>
          </div>
          <div id="chat_name">
            <p style={{color: 'black',fontSize:'16px'}}>{selectedPerson.name}</p>
            <p style={{marginTop:'3px'}}>{activeUsers?.find(user => user.sub === selectedPerson.sub) ? 'Online' : 'Offline'}</p>
          </div>
          <div id="chat_search">
            <SearchIcon />
            <IconButton><MoreVertIcon/></IconButton>
          </div>
        </div>
        <div className="chat_section">
        {message && message.map((msg,index) => {
            return(
              <>
                {account.sub !== msg.senderId ? 
                <>
                    {
                      message.type === 'file' ? 
                      <ImageMessage message={message}/>: 
                      <SentMessage message={msg.text} time={formatDate(msg.createdAt)}/>
                    }
                </>
                  :

                  <>
                    {
                      message.type === 'file' ? 
                      <ImageMessage message={message}/>: 
                      <ReceiveMessage message={msg.text} time={formatDate(msg.createdAt)}/>
                    }
                </>
                }
              </>
            );
          })
        }
          
          
        </div>
          <div className="chat_foot">
            <div id="chat_emoji">
              <IconButton>
              <EmojiEmotionsIcon/>
              {/* <EmojiPicker height={500} width={400}/> */}
              </IconButton>
              <IconButton>
                <label htmlFor="fileInput" style={{cursor:'pointer'}}>
                    <AttachFileIcon/>
                </label>
                <input 
                  type="file" 
                  id="fileInput"
                  style={{display:'none'}}
                  onChange={(e) => {
                    onFileChange(e);
                  }}
                />
              </IconButton>
                
            </div>
            <div id="chat_text">
              <input placeholder='Type a message' type='text' value={text}
                onChange={(e) => {
                  setText(e.target.value);
                }}
                onKeyPress={(e) => { 
                  if (e.which === 13) {
                    submitHandler();
                  }
                }}
              />
            </div>
            <div id="chat_mic">
            {text.length == 0 ? <IconButton>
            <MicIcon/>
            </IconButton>: <IconButton onClick={submitHandler} style={{color:'#00A884'}}><SendIcon/></IconButton>}
            
            </div>
          </div>
      </div>
      }
        
    </>
  );
};
const ImageMessage = ({ message }) => {

  return (
      <div style={{ position: 'relative' }}>
          {
              message?.text?.includes('.pdf') ?
                  <div style={{ display: 'flex' }}>
                      <img src={'https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/27_Pdf_File_Type_Adobe_logo_logos-512.png'} alt="pdf-icon" style={{ width: 80 }} />
                      <Typography style={{ fontSize: 14 }} >{message.text.split("/").pop()}</Typography>
                  </div>
              : 
                  <img style={{ width: 300, height: '100%', objectFit: 'cover' }} src={message.text} alt={message.text} />
          }
          <Time style={{ position: 'absolute', bottom: 0, right: 0 }}>
              <GetAppIcon 
                  onClick={(e) => downloadMedia(e, message.text)} 
                  fontSize='small' 
                  style={{ marginRight: 10, border: '1px solid grey', borderRadius: '50%' }} 
              />
              {formatDate(message.createdAt)}
          </Time>
      </div>
  )
}
export default Chat;

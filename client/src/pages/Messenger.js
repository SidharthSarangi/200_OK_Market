import React,{useState,useEffect, useRef} from "react";
import { useLocation} from "react-router-dom";
import Conversation from "../components/Conversation";
import Message from "../components/Message";
import axios from "axios" ;
import {io} from "socket.io-client" ;
import { useCookies } from "react-cookie";

const Messenger = () => {
  // const location = useLocation();
  // const state = location.state;
  // console.log('This is for the state',state);   
  
  
  const [conversations, setConversations] = useState([]) ;
  const [currentChat, setCurrentChat] = useState(null) ;
  const [messages, setMessages] = useState([]) ;
  const [newMessage, setNewMessage] = useState("") ;
  const [arrivalMessage, setArrivalMessage] = useState(null) ;
  // const [socket, setSocket] = useState(null) ;
  const socket = useRef() ;
  const scrollRef = useRef() ;
  
    
    const [cookies, setCookie, removeCookie] = useCookies([]) ;
    // const userId = cookies.UserId ;
    const user = {
      "_id" : cookies.UserId 
    } ;
    
    
    useEffect(()=>{
      socket.current = io("ws://localhost:8900") ;
      socket.current.on("getMessage",(data)=>{
        setArrivalMessage({
          sender: data.senderId,
          text : data.text,
          createdAt: Date.now(),
        })
      })
      // if(!state) setCurrentChat(state?.convEle) ;
      // state && setCurrentChat(state.convEle.data) ;
    },[])
    
  // console.log('This is currentChat',currentChat);
  useEffect(() => {
    arrivalMessage && 
    currentChat?.members.includes(arrivalMessage.sender) &&
       setMessages((prev)=> [...prev, arrivalMessage]); 
  }, [arrivalMessage, currentChat])
  
  useEffect(()=>{
    socket.current.emit("addUser", user._id) ;
    socket.current.on("getUsers", users=>{
      console.log(users) ;
    })
  },[user._id])


  console.log(socket) ;
  
  useEffect(() => {
    const getConversations = async () =>{
      try {
        const res = await axios.get("http://localhost:8000/conversations/"+user._id) ;
        setConversations(res.data) ;
      } catch (err) {
        console.log(err) ;
      }
    }
    getConversations() ;
  }, [user._id])
  
  
  useEffect(() => {
    const getMessages = async () =>{
      try {
        const res = await axios.get("http://localhost:8000/messages/"+ currentChat?._id) ;
        setMessages(res.data) ;
      } catch (err) {
        console.log(err) ;
      }
    }  
    getMessages() ;
  }, [currentChat]) ;
  // console.log(messages) ;

  const handleSubmit = async (e) =>{
    e.preventDefault() ;
    const message = {
      sender : user._id,
      text : newMessage,
      conversationId: currentChat._id 
    } ;

    const receiverId = currentChat.members.find(
      (member) => member !== user._id 
    ) ;

    socket.current.emit("sendMessage",{
      senderId : user._id ,
      receiverId,
      text: newMessage 
    })
  
    try {
      const res = await axios.post("http://localhost:8000/messages", message) ;
      setMessages([...messages, res.data]) ;
      setNewMessage("") ;
    } catch (err) {
       console.log(err) ;
    }
  }
  // console.log('This is currentChat',currentChat);
  useEffect(()=>{
    scrollRef.current?.scrollIntoView({behavior:"smooth"}) ;
  },[messages])

  
  return (
    <>
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput"/>
            {
              conversations.map((ele) => (
                <div onClick={()=>setCurrentChat(ele)}>
                 <Conversation conversation={ele} currentUser={user}/>
                </div>
              ))
            }            
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {
                currentChat?
            (
             <>
                <div className="chatBoxTop">
                    {
                      messages.map((ele)=>(
                        <div ref={scrollRef}>
                          <Message message={ele} own={ele.sender === user._id}/>
                        </div>
                      ))
                    }
                </div>
                <div className="chatBoxBottom">
                  <textarea 
                  className="chatMessageInput"
                  placeholder="write something..."
                  onChange={(e)=>setNewMessage(e.target.value)}  
                  value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>send</button>
                </div>
             </> 
            ): ( <span className="noConversationText">Open a conversation to start a chat.</span>
          )}
          </div>
        </div>
      </div>
    </>
  );
};
 
export default Messenger;

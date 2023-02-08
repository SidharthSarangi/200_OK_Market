import axios from 'axios';
import React,{useState,useEffect} from 'react'

const Conversation = (props) => {
  
  const {conversation, currentUser}  = props ;
  const [seller, setSeller] = useState(null) ;
  
  
  useEffect(() => {
      const sellerId = conversation.members.find((m)=> m !== currentUser._id) ;
    
      const getSeller = async () =>{
        // console.log(sellerId) ;
        try {
            const res = await axios.get("http://localhost:8000/sellerdetails?userId="+sellerId) ;
            setSeller(res.data) ;
        } catch (error) {
            console.log(error) ;
        }
      }
      getSeller() ;
  }, [currentUser, conversation]) ;
  

  return (
    <div className='conversation'>
        <img className='conversationImg' 
         src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHBlb3BsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
         alt=''
        />
        <span className='conversationName'>{seller?.owner_name}</span>
    </div>
  )
}

export default Conversation
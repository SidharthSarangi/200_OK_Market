import React,{useState, useEffect} from 'react'
import Items from '../components/Items';
import Navbar from '../components/Navbar'; 
import { useCookies } from "react-cookie";
import AuthModal from '../components/AuthModal';

const Home = () => {
  
  const [cookies, setCookie, removeCookie] = useCookies(['user']) ;
  const user_Id = cookies.UserId ;
  const authToken = cookies.AuthToken;
  const [showModal, setShowModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true)
  

  return (
    <>
    <Navbar authToken={authToken} minimal={false} setShowModal={setShowModal} showModal={showModal} setIsSignUp={setIsSignUp}/>
        {!showModal && <Items/>}
    <div className='overlay'>
        {showModal && <AuthModal setShowModal={setShowModal} isSignUp={isSignUp}/>}
    </div>
    </>
  )
}

export default Home
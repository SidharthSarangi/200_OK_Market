import React,{useState, useEffect} from "react";
import { useLocation, Link, useNavigate} from "react-router-dom";
import Item from '../components/Item'
import axios from "axios";

const ViewUserDetails = () => {
  
  const location = useLocation();
  const state = location.state;
  console.log('This is me',state);   

  // const navigate = useNavigate() ;
  
  const Id = state?._id;
  const ownerId = state?.owner_Id ;
  

  let navigate = useNavigate() ;

  const [userName, setUserName] = useState("")
  const [userPosts, setUserPosts] = useState([]) ;

  // GET USER NAME FROM USER->OWNERID AND POSTS FROM POSTS->OWNERid
  const details = async () =>{
      try {
         const res1 = await axios.get("http://localhost:8000/sellerdetails?userId="+ownerId) ;
         console.log(res1.data) ;
         setUserName(res1.data.owner_name) ;
         const res2 = await axios.get("http://localhost:8000/item/particular" , {params: {ownerId}}) ;
         console.log(res2.data) ;
         setUserPosts(res2.data) ;
      } catch (error) {
        console.log(error) ;
      }
  }

  useEffect(()=>{
    details() ;
  },[])

 
  const onBackClick = () =>{
    navigate('/') ;
  }


  return (
    <div>
        <div className="viewDetailNav">
          {/* <strong>Id:{Id}</strong>  */}
          <div className="userNameDiv">{userName}</div>
          {/* <Link to="/"> */}
            <div className="backBtnDiv">
              <button className="ViewBackBtn" title="to marketplace" onClick={onBackClick}>Back</button>
            </div>
          {/* </Link> */}
        </div>
        <div className="container my-3">
        <span className="Adspan">Published Ads:</span>
            <div className='row'>
                {
                    userPosts.map((ele , i)=>{
                        return(
                            <>
                                <div className='col-md-4' key={i}>
                                    <Item no={ele._id} price={ele.price} description={ele.description} ele={ele} />
                                </div>
                            </>
                        ) ;
                    })
                }
            </div>
          
        </div>    
    </div>
  );
};

export default ViewUserDetails;

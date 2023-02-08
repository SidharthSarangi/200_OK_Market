import React, { useState , useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import pic from "../images/add-friend.png" ;
import axios from "axios";

const Item = (props) => {
  const { no ,price ,description, ele} = props;

  let navigate = useNavigate() ;

  const [cookies, setCookie, removeCookie] = useCookies(['user']) ;
  const authToken = cookies.AuthToken;
  
  const receiverId = ele.from_userId ;
  const senderId = cookies.UserId ;

  // const arr = ["https://images.unsplash.com/photo-1621600411688-4be93cd68504?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" ,"https://images.unsplash.com/photo-1609607847926-da4702f01fef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=693&q=80","https://images.unsplash.com/photo-1542567455-cd733f23fbb1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80","https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"] ;
  const arr =  ele.imgUrls ;
  console.log(arr) ;

  const handleClick = async () =>{
    try {
      const res1 = await axios.get(`http://localhost:8000/conversations/find/${senderId}/${receiverId}`) ;
      console.log(res1) ;
      
      !res1.data && (await axios.post('http://localhost:8000/conversations', {senderId,receiverId})) ; 
      
    } catch (err) {
      console.log(err) ;
    }
    
    navigate('/messenger') ;
  }

  const data1 = {
    _id : ele._id,
    owner_Id : ele.from_userId
  }
  
  const handleOnDel = async () =>{
    try {
      // send DEL request
      const res = await axios.delete("http://localhost:8000/item/deletePost" , {params: {no}}) ; 
      console.log(res) ;
      
      window.location.reload(); 
    } catch (error) {
      console.log(error) ;
    }
  }
 

  return (
    <div className="my-3">
        <div className="card" style={{ width: "18rem" }}>
          
         
          <div id={`carouselExampleControlsNoTouching${no}`} className="carousel slide" data-bs-touch="false">
            <div className="carousel-inner">
                {
                    
                        arr.map((e,i)=>(
                            <div key={i}>
                                <div className="carousel-item active">
                                    <img src={e} className="d-block w-100" alt="..." />
                                </div>
                            </div>
                        ))
                }
            </div>
                <button className="carousel-control-prev" type="button" data-bs-target={`#carouselExampleControlsNoTouching${no}`} data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true" />
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target={`#carouselExampleControlsNoTouching${no}`} data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true" />
                    <span className="visually-hidden">Next</span>
                </button>
          </div>  



          <div className="card-body cardBody">
            <h5 className="card-title">{ele.productName}</h5>
                                   
            
            
            <div className="addToChatDiv" >
              <img src={pic} className='addToChat' title="Add to Chat" alt="addtochat" />
              <button className='addToChatBtn' onClick={handleClick} disabled={!authToken || ele.from_userId===senderId} >Add to Chat</button>
            </div>

              <button className="btn btn-primary detailBtn" type="button" data-bs-toggle="collapse" data-bs-target={`#collapseExample${no}`} aria-expanded="false" aria-controls="collapseExample">
                  Details
              </button>

              <Link to={`/view-contact-details/${ele._id}`} state={data1}>
                <button className="btn btn-secondary sellerBtn">seller profile</button>
              </Link>


              
              <span className="delBtn">
                {ele.from_userId===senderId && <img src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png" className="delBtnImg" title="delete post" onClick={handleOnDel}/>}
              </span>



              <div className="collapse" id={`collapseExample${no}`}>
                  <div className="card card-body">
                      <h4>Price: {price}</h4>
                      <p>{description}</p>
                  </div>
              </div>


              
          

          </div>
        </div>
    </div>
  );
};

export default Item;

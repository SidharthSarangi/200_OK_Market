import React,{useState,useEffect} from 'react'
import { Link, useNavigate } from "react-router-dom";
import Item from './Item';
import axios from 'axios';
import { useCookies } from "react-cookie";

const Items = () => {

//   const arr = ["1", "2","3","4","5","6","7","8","9","10","11","12","13",] ;
  
// const posts = [{id:"6341d1c19297a4e188b7a73c",price:"3000",desc:"This is a product1"},{id:"63425f9d9297a4e18835a257",price:"3010",desc:"This is a product2"},{id:"3",price:"9000",desc:"This is a product3"},{id:"6341d1c19297a4e188b7a73c",price:"3009",desc:"This is a product4"},{id:"5",price:"9400",desc:"This is a product5"},{id:"6341cc4f3c33ac52c13c09f8",price:"30000",desc:"This is a product6"},{id:"7",price:"5600",desc:"This is a product7"},{id:"8",price:"30750",desc:"This is a product8"},{id:"9",price:"3890",desc:"This is a product"},{id:"6341d1c19297a4e188b7a73c",price:"35000",desc:"This is a product10"},{id:"11",price:"3000",desc:"This is a product11"},{id:"12",price:"30556",desc:"This is a product12"},{id:"6341cc4f3c33ac52c13c09f8",price:"8070",desc:"This is a product13"}] ;
  const [posts, setPosts] = useState([]) ;

  // in the user model keep track of number of images a user is posting and then send it as props
  const [cookies, setCookie, removeCookie] = useCookies(['user']) ;

  const getAllPosts = async () =>{
    try {
      const res = await axios.get('http://localhost:8000/item')
      console.log(res.data) ; 
      setPosts(res.data) ;
    } catch (error) {
      console.log(error) ;
    }
}

useEffect(() => {
  getAllPosts() ;
}, [])

  return (
    <div className="container my-3">
        <div className='row'>
            {
                posts.map((ele , i)=>{
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
  )
}

export default Items
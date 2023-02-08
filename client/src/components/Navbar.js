import axios from 'axios';
import React, { useState,useEffect } from 'react'
import { useCookies } from "react-cookie";

const Navbar = (props) => {

  const [images, setImages]= useState([]) ;
  const [imageURLs, setImageURLs] = useState([]) ;

  const [cookies, setCookie, removeCookie] = useCookies(['user']) ;
  const user_Id = cookies.UserId ;

  const {authToken ,minimal ,setShowModal, showModal, setIsSignUp} = props ;

  // useEffect(() => {
  //   if(images.length<1 || images.length>4) return ;
    
  //   const newImageURLs= [] ;
  //   images.forEach(image => newImageURLs.push(URL.createObjectURL(image))) ;
    
  //   setImageURLs(newImageURLs) ;
  // }, [images])
  

  // function onImageChange(e){
  //   setImages([...e.target.files]) ;
  // }


  //  THIS WORKS BUT ONLY FOR ONE IMAGE THAT TOO SHOULD BE VERY SMALL SIZE IMAGE(~40kb). OR ERROR>PAYLOADTOOLARGEeRROr
  const onImageChange = async(e) => {
    try {
      for (let i = 0; i < e.target.files.length; i++) {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[i]);
        reader.onload = (readerEvent) => {
          imageURLs.push(readerEvent.target?.result);
        };
      }
    } catch (error) {
      console.log(error);
    }
  };


  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = async (event) => {
    // event.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/item/sell', {inputs,imageURLs,user_Id} ) ;
      console.log(res) ;
      if(res.status===413) console.log("Reduce Size")
    } catch (error) {
      console.log(error) ;
    }

    console.log(inputs);
  }
  console.log(imageURLs) ;


  const handleAuth = async ()=>{
    if(authToken){
      removeCookie('UserId',cookies.UserId) ;
      removeCookie('AuthToken',cookies.AuthToken) ;
      window.location.reload() ;
      return 
    }
    setShowModal(true) ;
    setIsSignUp(true) ;
  }

  const handleClick = () =>{
    setShowModal(true) ;
    setIsSignUp(false) ;
  }


  return (
    // Link to /chat
    <nav className="navbar navbar-expand-lg bg-light navbarComponent">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">200 OK Market</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {/* <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Home</a>
              </li> */}
              <li className="nav-item">
                <a className="nav-link" href="/messenger" target="_blank">Chat</a>
              </li>
              <div>
        <button type="button" className="btn btn-primary sellBtn" data-bs-toggle="modal" data-bs-target="#exampleModal" disabled={!authToken}>
          +sell
        </button>
        <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">SELL whatever you wish</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
              </div>
              <div className="modal-body">
                <input type="file" multiple accept="image/*" onChange={onImageChange}/>
                <form onSubmit={handleSubmit}>
                  <label>Enter Item Name:
                    <input 
                      type="text" 
                      name="itemName" 
                      required={true}
                      value={inputs.itemName || ""} 
                      onChange={handleChange}
                    />
                  </label>
                  <label>Enter Price:
                    <input 
                      type="number" 
                      name="price" 
                      required={true}
                      value={inputs.price || ""} 
                      onChange={handleChange}
                    />
                  </label>
                  <label>Enter Description:
                    <input 
                      type="text" 
                      name="description" 
                      required={true}
                      value={inputs.description || ""} 
                      onChange={handleChange}
                    />
                  </label>
                    <input type="submit" />
                </form>
                {/* {imageURLs.map(imageSrc => <img src={imageSrc}/> )} */}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                {/* <button type="button" className="btn btn-primary" onClick={handleOnSell}>Save changes</button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
            </ul>
          </div>
          <button className='signInBtn' onClick={handleAuth}>
            {authToken?"Sign Out":"Sign Up"}
          </button>
          {!authToken && !minimal && <button 
            className="nav-btn" 
            onClick={handleClick} 
            disabled={showModal}
            >Log in</button>}
        </div>
      </nav>
  )
}

export default Navbar
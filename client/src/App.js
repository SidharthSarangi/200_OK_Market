import './App.css';
import './styles.css' ;
import React from 'react';
import {BrowserRouter , Routes, Route} from "react-router-dom" ;
import Home from './pages/Home';
import Messenger from './pages/Messenger';
import ViewUserDetails from './pages/ViewUserDetails';
import { useCookies } from 'react-cookie';

function App() {
  
  const [cookies , setCookie, removeCookie] = useCookies(['user']) ;
  const authToken = cookies.AuthToken ;
  
  return (
    
    // <div className="App">
    //   <h1>Hello from 200OK Market</h1>
    //   <Items/>
    // </div>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      {authToken && <Route path="/messenger" element={<Messenger/>}/>}
      <Route
              exact
              path="/view-contact-details/:id"
              element={<ViewUserDetails/>}
      />
    </Routes>
    </BrowserRouter>
  );
}

export default App;





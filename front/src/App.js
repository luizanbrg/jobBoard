import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import secureLocalStorage from  "react-secure-storage";
import './App.css';

// ------- Section Advertisement -------
import Advertisement from '../src/advertisements/Advertisement.jsx';
import AdvertisementCreate from './advertisements/AdvertisementCreate.jsx';

// ------- Section Pages -------
import SignUp from './auth/signup.jsx';
import Dashboard from './admin/Dashboard.jsx'
import Account from './people/Account.jsx';
import Form from './advertisements/Form.jsx';

// ------- Section Features -------
import Error from './features/Error.jsx';

// ------- Section layouts -------
import Navigation from './components/layouts/Navigation.jsx'
import Footer from './components/layouts/Footer.jsx';


function App() {

//   const [authTypeApp, setAuthTypeApp] = useState(null);
//   setAuthTypeApp(type_app);
//   useEffect(() => {
//     const checkStorage = () => {
//     const token_app = secureLocalStorage.getItem("@TokenUser");
//     const type_app = secureLocalStorage.getItem("@TypeUser");
//     //console.log(token_app);
//     setAuthTokenApp(token_app);
//     setAuthTypeApp(type_app);

//     };

//     setTimeout(checkStorage, 200);
// }, []);

  return (
    // <div className="App">
    //   <header className="App-header">
    //     <h1 className="indexTitle">Job Board</h1>
    //     {/* <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a> */}
    //     <Advertisement />
    //     <AdvertisementCreate />
    //     <SignUp />
    //     <Footer />
    //   </header>
    // </div>
    <>
      <Router>
        <Navigation/>
          <Routes>
            {/* ==================================== */}
            {/* ~~~~~~~~~~ ADMIN ~~~~~~~~~~ */}
            {/* { authTypeApp == 'admin' ? (
                <>
                  <Route path='/dashboard' element={<Dashboard/>}/>
                </>
            ) : (
                <></>
            )}  */}
            <Route path='/dashboard' element={<Dashboard/>}/>

            
            {/* ====================================== */}
            {/* ~~~~~~~~~~ ADVERTISEMENT ~~~~~~~~~~ */}
            <Route path='/' element={<Advertisement />}/>
            <Route path='/advertisementCreate' element={<AdvertisementCreate/>}/>



            {/* ====================================== */}
            {/* ~~~~~~~~~~ PAGES ~~~~~~~~~~ */}
            <Route path='*' element={<Error />}/>
            <Route path='/form' element={<Form />}/>
            {/* <Route path='/account/:value' element={<Account/>}/> */}
            <Route path='/account' element={<Account/>}/>

            {/* ====================================== */}
            {/* ~~~~~~~~~~ Auth ~~~~~~~~~~ */}
            <Route path='/signup' element={<SignUp />}/>
            {/* <Route path='/login' element={<Login />}/>  */}
          </Routes>
      </Router>
    </>
  );
}

export default App;

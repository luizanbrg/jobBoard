import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import secureLocalStorage from  "react-secure-storage";
import './App.css';

// ------- Section Advertisement -------
import Advertisement from '../src/advertisements/Advertisement.jsx';
import AdvertisementCreate from './advertisements/AdvertisementCreate.jsx';
import AdminAdvertising from './admin/AdminAdvertising.jsx';
import AdvertisementShow from './advertisements/AdvertisementShow.jsx';

// ------- Section Pages -------
import SignUp from './auth/signup.jsx';
import Login from './auth/login.jsx';
import Dashboard from './admin/Dashboard.jsx';
import Account from './people/Account.jsx';
import Form from './advertisements/Form.jsx';

// ------- Section Features -------
import Error from './features/Error.jsx';

// ------- Section layouts -------
import Navigation from './components/layouts/Navigation.jsx';
import Footer from './components/layouts/Footer.jsx';
import ButtonAdd from './components/buttons/ButtonAdd.jsx';
import AdminApplications from './admin/AdminApplications.jsx';
import ApplicationCreate from './applications/ApplicationCreate.jsx';
import ApplicationShow from './applications/ApplicationShow.jsx';

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
    <>
      <Router>
        <Navigation />
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

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/listAdvertisement" element={<AdminAdvertising />} />
          <Route path="/listApplication" element={<AdminApplications />} />

          {/* ====================================== */}
          {/* ~~~~~~~~~~ ADVERTISEMENT ~~~~~~~~~~ */}
          <Route path="/" element={<Advertisement />} />
          <Route path="/advertisementCreate" element={<AdvertisementCreate />} />
          <Route path="/advertisement/:id" element={<AdvertisementShow />} />

          {/* ====================================== */}
          {/* ~~~~~~~~~~ APPLICATIONS ~~~~~~~~~~ */}
          <Route path="/applicationCreate" element={<ApplicationCreate />} />
          <Route path="/apply/:id" element={<ApplicationShow />} />

          {/* ====================================== */}
          {/* ~~~~~~~~~~ PAGES ~~~~~~~~~~ */}
          <Route path="*" element={<Error />} />
          <Route path="/form" element={<Form />} />
          {/* <Route path='/account/:value' element={<Account/>}/> */}
          <Route path="/account" element={<Account />} />

          {/* ====================================== */}
          {/* ~~~~~~~~~~ PAGES ~~~~~~~~~~ */}
          <Route path="/buttonAdd" element={<ButtonAdd />} />

          {/* ====================================== */}
          {/* ~~~~~~~~~~ Auth ~~~~~~~~~~ */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;

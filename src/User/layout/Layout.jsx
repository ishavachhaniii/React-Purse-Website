import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Routers from '../routers/Routers';
import AdminNav from '../../Admin/AdminNav';
import AdminLogin from '../../Admin/Authentication/AdminLogin';
import AdminSignUp from '../../Admin/Authentication/AdminSignUp';

const Layout = () => {
  const [user, setUser] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const isAdminLoginPage = location.pathname === '/admin-login';
  const isAdminSignUpPage = location.pathname === '/admin-signup';
  const isDashboardPage = location.pathname.startsWith('/dashboard');

  const handleLogin = () => {
    setUser('admin-login');
    navigate('/dashboard');
  };

  return (
    <>
      {isAdminLoginPage ? (
        <AdminLogin handleLogin={handleLogin} />
      ) : (
        <>
          {isDashboardPage ? (
            <AdminNav />
          ) : (
            !isAdminSignUpPage && <Navbar setUserState={() => setUser(null)} />
          )}
          <div>
            <Routers />
          </div>
          {!isAdminSignUpPage && <Footer />}
        </>
      )}
    </>
  );
};

export default Layout;

// import React, { useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import Navbar from './Navbar';
// import Footer from './Footer';
// import Routers from '../routers/Routers';
// import AdminNav from '../../Admin/AdminNav';
// import AdminLogin from '../../Admin/Authentication/AdminLogin';

// const Layout = () => {
//   const [user, setUser] = useState('');
//   const location = useLocation();

//   const isAdminLoginPage = location.pathname === '/admin-login';

//   return (
//     <>
//       {isAdminLoginPage ? (
//         <AdminLogin />
//       ) : (
//         <>
//           {location.pathname.startsWith('/dashboard') ? (
//             <AdminNav />
//           ) : (
//             <Navbar setUserState={() => setUser(null)} />
//           )}
//           <div>
//             <Routers />
//           </div>
//           <Footer />
//         </>
//       )}
//     </>
//   );
// };

// export default Layout;

// import React, {useState} from 'react'
// import Navbar from "./Navbar";
// import Footer from './Footer'
// import Routers from '../routers/Routers'
// import AdminNav from '../../Admin/AdminNav'
// import { useLocation } from "react-router-dom";

// const Layout = () => {
//   const [user, setUser] = useState("");

//   const location = useLocation();

//   return (
//     <>
//      {location.pathname.startsWith("/dashboard") ? (
//         <AdminNav />
//       ) : (
//         <Navbar setUserState={() => setUser(null)} />
//       )}
//     <div>
//       <Routers />
//     </div>
//     <Footer />
//     </> 
//   )
// }

// export default Layout
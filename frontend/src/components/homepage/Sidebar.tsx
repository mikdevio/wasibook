import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar: React.FC = () => {
    const [message, setMessage] = useState<string>('');
    const navigate = useNavigate();


    const handleLogout = async (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/user/logout', {
                method: "GET",
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }

            navigate('/login');
            
          } catch (error) {
            setMessage('Error logging out');
            console.log("Error al deslogear..")
          }

    };


  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark min-vh-100" style={{width: "280px"}}>
    <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
      {/* <svg className="bi pe-none me-2" width="40" height="32"><use xlink:href="#bootstrap"/></svg> */}
      <span className="fs-4">Sidebar</span>
    </a>
    <hr />
    <ul className="nav nav-pills flex-column mb-auto">
      <li className="nav-item">
        <a href="#" className="nav-link active" aria-current="page">
          {/* <svg className="bi pe-none me-2" width="16" height="16"><use xlink:href="#home"/></svg> */}
          Home
        </a>
      </li>
      <li>
        <a href="#" className="nav-link text-white">
          {/* <svg className="bi pe-none me-2" width="16" height="16"><use xlink:href="#speedometer2"/></svg> */}
          Dashboard
        </a>
      </li>
      <li>
        <a href="#" className="nav-link text-white">
          {/* <svg className="bi pe-none me-2" width="16" height="16"><use xlink:href="#table"/></svg> */}
          Orders
        </a>
      </li>
      <li>
        <a href="#" className="nav-link text-white">
          {/* <svg className="bi pe-none me-2" width="16" height="16"><use xlink:href="#grid"/></svg> */}
          Products
        </a>
      </li>
      <li>
        <a href="#" className="nav-link text-white">
          {/* <svg className="bi pe-none me-2" width="16" height="16"><use xlink:href="#people-circle"/></svg> */}
          Customers
        </a>
      </li>
    </ul>
    <hr/>
    <a href="#" onClick={handleLogout} className="nav-link text-white">
          {/* <svg className="bi pe-none me-2" width="16" height="16"><use xlink:href="#speedometer2"/></svg> */}
          Signout
        </a>
  </div>
  );
}

export default Sidebar;

import './bars.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars,faCog,faClose, faSignOutAlt, faUserCircle ,faUser} from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { Menu } from '../../Context/MenuContext';
import {WindowSize} from '../../Context/WindowContext';

import { DropdownButton, Dropdown } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Axios } from '../../Api/axios';
import { USER, LOGOUT } from '../../Api/Api';
import { Link, useNavigate } from 'react-router-dom';
import Cookie from 'cookie-universal';

export default function TopBar() {
  const menu = useContext(Menu);
  const { isOpen, setIsOpen } = menu;
  
  const WindowContext =useContext(WindowSize);
  const windowSize =WindowContext.windowSize;

  const nav = useNavigate();
  const [user, setUser] = useState('');
  const cookie = Cookie();

  useEffect(() => {
    Axios.get(`/${USER}`)
      .then(res => {
        setUser(res.data);
      })
      .catch(() => nav('/login', { replace: true }));
  }, []);

  async function handleLogout() {
    try {
      await Axios.get(`/${LOGOUT}`);
      cookie.remove('ecom');
      window.location.pathname = '/login';
    } catch (err) {
      console.log(err);
    }
  }

  return (
  
<div className="top-bar"   style={{
  width: windowSize >'768' ? `calc(100% - ${isOpen ? '270px' : '90px'})` : `calc(100% - ${isOpen ? '00px' : '0px'})` ,
  
}}>
  <div className="d-flex align-items-center h-100 justify-content-between px-3" >
   
    <div className="d-flex align-items-center"  style={{
  marginLeft: windowSize <'768' && isOpen ? '260px' :'0px', transition:' margin-left 0.5s ease' ,
  
}}>
      <FontAwesomeIcon
        onClick={() => setIsOpen(prev => !prev)}
        cursor={'pointer'}
        icon={windowSize <'768' && isOpen ? faClose: faBars}
        className="menu-icon"
      />
    </div>
    
    <div className=" d-flex align-items-center justify-content-end" >
<DropdownButton id=" dropdown-basic-button"  variant="transparent" title={<FontAwesomeIcon icon={faUser} />}>
    <div className="user-info">
        <FontAwesomeIcon icon={faUser} />
        <div>
            <strong>{user.name}</strong>
            <div>{user.email}</div>
        </div>
    </div>
     <div className="dropdown-divider"></div>
    {user.role === '1995' && (
        <Dropdown.Item className="dropdown-item p-2 d-flex align-items-center">
            <FontAwesomeIcon icon={faCog} className="me-2" /> 
            <Link className="text-decoration-none text-body" to={`/dashboard/users/${user.id}`}>
                Setting
            </Link>
        </Dropdown.Item>
    )}
    <Dropdown.Item className="dropdown-item p-2 d-flex align-items-center" onClick={handleLogout}>
        <FontAwesomeIcon icon={faSignOutAlt} className="me-2" /> 
        Logout
    </Dropdown.Item>
</DropdownButton>

    </div>
  </div>
</div>

  );
}

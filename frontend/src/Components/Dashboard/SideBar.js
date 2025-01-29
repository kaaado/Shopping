import './bars.css';
import {NavLink,useNavigate} from 'react-router-dom';
import {Menu} from '../../Context/MenuContext';
import {WindowSize} from '../../Context/WindowContext';
import { useState,useEffect,useContext } from 'react';
import {Axios} from '../../Api/axios';
import {  USER } from '../../Api/Api';
import {links} from './NavLink.js';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHome} from '@fortawesome/free-solid-svg-icons';

export default function SideBar() {
const menu =useContext(Menu);
const isOpen=menu.isOpen;
const WindowContext =useContext(WindowSize);
const windowSize =WindowContext.windowSize;

const [user, setUser] = useState("");
const nav = useNavigate();
useEffect(()=>{
   Axios.get(`/${USER}`).then(res=>setUser(res.data)).catch(()=> nav('/login'),{replace:true} );
},[])

  return (
  <><div  style={{position:'fixed' ,  left:'0',
  width:'100%',minHeight:'100dvh', backgroundColor:'rgba(0,0,0,0.2)',
   display:windowSize<'768' && isOpen? "block" : "none"}}></div>
    <div className="side-bar pt-3" style={{
    left:windowSize<'768' ? isOpen ? 0: '-100%':0,
    width:isOpen? "250px":"70px",
    position:windowSize<'768' ? "fixed" : "sticky",
    color:'#038edc',transition: 'left 0.5s ease, width 0.5s ease'
    }}>
    <div className="{` d-flex align-items-center logo ${isOpen ? 'side-bar-expanded' : 'side-bar-collapsed'}`}">
    <FontAwesomeIcon 
    className='sidebar-icon icon-collapsed'
    icon={faHome}
   
     
  />
     <h4 className=" m-0" style={{ display: isOpen ? "block" : "none" }}>Dashboard</h4>
    </div>
    
    {links.map((link ,index)=>(
    link.role.includes(user.role) && 
 <NavLink 
  key={index} 
  to={link.to} 
  className={`side-bar-link d-flex align-items-center gap-2 ${isOpen ? 'side-bar-expanded' : 'side-bar-collapsed'}`}
>
  <FontAwesomeIcon 
    className='sidebar-icon icon-collapsed'
    icon={link.icon} 
  />
  <p className="m-0" style={{ display: isOpen ? "block" : "none" }}>
    {link.name}
  </p>
</NavLink>


    ))}
    </div></>
  );
}

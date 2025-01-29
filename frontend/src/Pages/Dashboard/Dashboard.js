import TopBar from '../../Components/Dashboard/TopBar';
import SideBar from '../../Components/Dashboard/SideBar';
import { Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { Menu } from '../../Context/MenuContext';
import {WindowSize} from '../../Context/WindowContext';
import './dashboard.css';

export default function Dashboard() {
  const menu = useContext(Menu);
  const isOpen = menu.isOpen;
  const WindowContext =useContext(WindowSize);
const windowSize =WindowContext.windowSize;

  return (
    <div className="dashboard-container">
      <SideBar />
      <div className="dashboard-content" style={{
  width: windowSize >'768' ? `calc(100% - ${isOpen ? '270px' : '90px'})` : `calc(100% - ${isOpen ? '00px' : '0px'})` ,
  
}}>
        <TopBar />
        <div className="outlet-container">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

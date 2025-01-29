import {Outlet,Navigate,useNavigate} from 'react-router-dom';
import Cookie from 'cookie-universal';
import { useState,useEffect } from 'react';
import {Axios} from '../../../Api/axios';
import {  USER } from '../../../Api/Api';
import LoadingSubmit from '../../../Components/Loading/loading';
import Err403 from '../../../Pages/Auth/Error/404';
export default function RequireAuth({allowedRole}){
const [user, setUser] = useState("");
const nav = useNavigate();
useEffect(()=>{
   Axios.get(`/${USER}`).then(res=>setUser(res.data)).catch(()=> nav('/login'),{replace:true} );
},[])

const cookie = Cookie();
const token = cookie.get('ecom')

return token ? user=== "" ? <LoadingSubmit /> :  allowedRole.includes(user.role) ? <Outlet /> : <Err403 role={user.role} /> : <Navigate to={'/login'} replace={true} />;
}

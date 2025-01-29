import { useEffect,useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { BASEURL, GOOGLE_CALL_BACK } from '../../../Api/Api';
import Cookie from 'cookie-universal';
import { useNavigate } from 'react-router-dom';
import LoadingSubmit from '../../../Components/Loading/loading';

export default function GoogleCallBack() {
const cookie=Cookie();
const nav = useNavigate();
const [loading, setLoading] = useState(false);
const location=useLocation();
useEffect(()=>{
	async function GoogleCall(){
	setLoading(true);
		try{
		const res = await axios.get(`${BASEURL}/${GOOGLE_CALL_BACK}${location.search}`);
		setLoading(false);
		const token = res.data.access_token;
        cookie.set('ecom', token);
        nav('/')
		}catch(err){
		setLoading(false);
			console.log(err);
		}
	}
	GoogleCall();
},[])
  return (
   <>
   	{loading && <LoadingSubmit />}
   </>
  )
}

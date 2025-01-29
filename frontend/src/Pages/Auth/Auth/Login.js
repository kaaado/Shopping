import { useState,useEffect ,useRef } from 'react';
import axios from 'axios';
import { BASEURL, LOGIN } from '../../../Api/Api';
import { useNavigate,Link } from 'react-router-dom';
import LoadingSubmit from '../../../Components/Loading/loading';
import Cookie from 'cookie-universal';
import { Form, Button } from 'react-bootstrap';

export default function Login() {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const nav = useNavigate();
  const cookie = Cookie();

  const handleChange = (e) => {
    e.preventDefault();
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${BASEURL}/${LOGIN}`, form);
      setLoading(false);
      const token = res.data.token;
      const role = res.data.user.role;
      const go= role==="1995"? "/dashboard/users":"/";
      cookie.set('ecom', token);
      window.location.pathname=`${go}`;
    } catch (err) {
      setLoading(false);
      err.response.status === 401 ? setError('Invalid credentials!') : setError('Internal Server Error');
    }
  }
const focus=useRef(null);
useEffect(()=>{
focus.current.focus();
},[])
  return (
    <>
      {loading && <LoadingSubmit />}
      <div className='container' >
        <div className='row ' style={{height:'100dvh'}}>
          <Form className='form' style={{ height: '30rem' }} onSubmit={handleSubmit}>
            <div className='custom-form'>
              <h1>Welcome back!</h1>
              <Form.Group className="form-custom" controlId="email"> 
                <Form.Control 
                name='email'
                  type="email" 
                  placeholder="Enter Your Email.." 
                  value={form.email} 
                  onChange={handleChange} 
                  required 
                  ref={focus}
                />
                <Form.Label>Email</Form.Label>
              </Form.Group>
              <Form.Group className="form-custom" controlId="password">
                  <Form.Control 
                  name='password'
                  type="password" 
                  placeholder="Enter Your Password.." 
                  value={form.password} 
                  onChange={handleChange} 
                  minLength="6" 
                  required 
                />
                <Form.Label>Password</Form.Label>
              </Form.Group>
               <div className="fw-bolder text-end mb-2 links">
              <Link to="/register">Register</Link>
              </div>
              <button className='btnn btnn-primary' type="submit">
                Login
              </button>
              <div className="google-btn">
                <a href={`${BASEURL}/login-google`}>
                  <div className="google-icon-wrapper">
                    <img className="google-icon" src='https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg' alt="sign in with google" />
                  </div>
                  <p className='google-text'><b>Sign in with google</b></p>
                </a>
              </div>
              {error !== "" && <span className='error'>{error}</span>}
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}

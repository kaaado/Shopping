import { useState,useEffect,useRef } from 'react';
import axios from 'axios';
import { BASEURL, REGISTER } from '../../../Api/Api';
import { useNavigate,Link } from 'react-router-dom';
import LoadingSubmit from '../../../Components/Loading/loading';
import Cookie from 'cookie-universal';
import { Form, Button } from 'react-bootstrap';

export default function Register() {
  const [form, setForm] = useState({
    name: '',
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
      const res = await axios.post(`${BASEURL}/${REGISTER}`, form);
      setLoading(false);
      const token = res.data.token;
      cookie.set('ecom', token);
      window.location.pathname='/';
    } catch (err) {
      setLoading(false);
      err.response.status === 422 ? setError('Email is already taken') : setError('Internal Server Error');
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
        <div className='row' style={{ height: '100dvh' }}>
          <Form className='form' onSubmit={handleSubmit} style={{ height: '35rem' }}>
            <div className='custom-form'>
              <h1>Register Now!</h1>
              <Form.Group className="form-custom" controlId="name">
                <Form.Control 
                  name='name'
                  type="text" 
                  placeholder="Enter Your Name.." 
                  value={form.name} 
                  onChange={handleChange} 
                  minLength="3" 
                  required 
                  ref={focus}
                />
                <Form.Label>Name</Form.Label>
              </Form.Group>
              <Form.Group className="form-custom" controlId="email">
                <Form.Control 
                  name='email'
                  type="email" 
                  placeholder="Enter Your Email.." 
                  value={form.email} 
                  onChange={handleChange} 
                  required 
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
              <div className="fw-bolder text-end mb-2 links" >
              <Link to="/login">Login</Link>
              </div>
              <button className='btnn btnn-primary' type="submit">
                Register
              </button>
               <div className="google-btn">
                <a href={`${BASEURL}/login-google`}>
                  <div className="google-icon-wrapper">
                    <img className="google-icon" src='https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg' alt="register in with google" />
                  </div>
                  <p className='google-text'><b>Register with google</b></p>
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

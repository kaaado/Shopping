import { useState,useEffect,useRef } from 'react';
import { USER } from '../../../Api/Api';
import { Axios } from '../../../Api/axios';
import { useNavigate } from 'react-router-dom';
import { Form,Button } from 'react-bootstrap';
import LoadingSubmit from '../../../Components/Loading/loading';

export default function AddUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const nav = useNavigate();
  
async function handleSubmit(e) {
    setLoading(true);
     e.preventDefault();
    try{
    	const res= await Axios.post(`${USER}/add`,{name:name,email:email,password:password,role:role});
    	nav("/dashboard/users")
    }catch(err){
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
      <Form className="bg-white w-100 mx-2 p-3" onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="name">
      <Form.Label>Name</Form.Label>
      <Form.Control 
                  name='name'
                  type="text" 
                  placeholder="Enter Your Name.." 
                  value={name} 
                  onChange={(e)=>setName(e.target.value)} 
                  minLength="3" 
                  required 
                  ref={focus}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label> 
                <Form.Control 
                name='email'
                  type="email" 
                  placeholder="Enter Your Email.." 
                  value={email} 
                  onChange={(e)=>setEmail(e.target.value)} 
                  required 
                />
              </Form.Group>
               <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label> 
                <Form.Control 
                name='password'
                  type="password" 
                  placeholder="Enter Your Password..."
                  value={password} 
                  onChange={(e)=>setPassword(e.target.value)} minLength="6" 
                  required 
                />
              </Form.Group>
              <Form.Group controlId="role" className="mb-3">
               <Form.Label>Role</Form.Label> 
               <Form.Select aria-label="Select Role"
               value={role} 
               onChange={(e)=>setRole(e.target.value)} 
               >
      <option disabled value="">Select Role</option>
      <option value="1995">Admin</option>
      <option value="2001">User</option>
      <option value="1999">Product Manager</option>
    </Form.Select></Form.Group>
              <Button disabled={name.length >2 && email.length >1 && password.length >6 && role.length != "" ? false :true} className="mt-3 w-100" variant="outline-primary" type="submit">Add</Button>
              {error !== "" && <span className='error'>{error}</span>}
                </Form>
                </>
              
  );
}

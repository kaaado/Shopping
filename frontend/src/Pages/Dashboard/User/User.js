import { useState,useEffect } from 'react';
import { USER } from '../../../Api/Api';
import { Axios } from '../../../Api/axios';
import { useNavigate,useParams } from 'react-router-dom';
import { Form,Button } from 'react-bootstrap';
import LoadingSubmit from '../../../Components/Loading/loading';

export default function User() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [disable, setDisable] = useState(true);
  const {id} = useParams();
  
  useEffect(()=>{
  setLoading(true);
  	Axios.get(`${USER}/${id}`).then((data)=>{
  	setName(data.data.name);
  	setEmail(data.data.email);
  	setRole(data.data.role);
  	 setLoading(false);
  	}).then(()=>setDisable(false)).catch(()=>nav('/dashboard/users/page/404',{replace:true}))
  },[]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const nav = useNavigate();
  
async function handleSubmit(e) {
    setLoading(true);
     e.preventDefault();
    try{
    	const res= await Axios.post(`${USER}/edit/${id}`,{name:name,email:email,role:role});
    	nav("/dashboard/users")
    }catch(err){
    setLoading(false);
    err.response.status === 422 ? setError('Email is already taken') : setError('Internal Server Error');
    }
  }

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
              <Button className="mt-3 w-100" variant="outline-primary" disabled={disable}  type="submit">Update</Button>
              {error !== "" && <span className='error'>{error}</span>}
                </Form>
                </>
              
  );
}

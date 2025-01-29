import { useEffect, useState } from "react";
import { USERS,USER } from "../../../Api/Api";
import TableShow from "../../../Components/Dashboard/TableShow";
import {Axios} from "../../../Api/axios";
import {Link } from 'react-router-dom';

export default function Users() {

  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

 useEffect(() => {
    Axios.get(`/${USER}`)
    .then((res) => setCurrentUser(res.data));
  }, []);
  
  
    useEffect(() => {
     setLoading(true);
    Axios.get(`/${USERS}?page=${page}&limit=${limit}`)
    .then((response) => {
    setUsers(response.data.data);
    setTotal(response.data.total);
    })
    .catch((err) => console.log(err))
    .finally(()=>setLoading(false))
  }, [page,limit]);

const header=[

{
key:"name",
	name:"Username",
},
{
key:"email",
	name:"Email",
},
{
key:"role",
	name:"Role",
},
{
key:"created_at",
	name:"Created",
},
{
key:"updated_at",
	name:"Last Login",
},
]
async function handleDelete(id){

try{
	const res=await Axios.delete(`${USER}/${id}`);
	setUsers(prev=>prev.filter(item=> item.id!==id))
	}catch(err){
console.log(err)
}
}
  return (
    <div className="bg-white p-2 w-100">
    <div className="d-flex align-items-center justify-content-between">
    <h1>Users Page</h1>
     <Link to="/dashboard/user/add" className="btn btn-primary">Add User</Link>
    </div>
     <TableShow linkName={USER} search="name" page={page} setPage={setPage} limit={limit} setLimit={setLimit} header={header} data={users} delete={handleDelete} currentUser={currentUser} loading={loading} total={total}/>
    </div>
  );
}

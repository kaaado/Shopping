import { useEffect, useState } from "react";
import { CATEGORIES,CATEGORIE} from "../../../Api/Api";
import {Axios} from "../../../Api/axios";
import {Link } from 'react-router-dom';
import TableShow from "../../../Components/Dashboard/TableShow";
import { Form,Button } from 'react-bootstrap';

export default function Categories() {

const [categories, setCategories] = useState([]);
const [page, setPage] = useState(1);
const [limit, setLimit] = useState(3);
const [total, setTotal] = useState(0);
const [loading, setLoading] = useState(false);


useEffect(() => {
setLoading(true);
    Axios.get(`/${CATEGORIES}?limit=${limit}&page=${page}`)
    .then((response) =>{ setCategories(response.data.data);
    setTotal(response.data.total);
    })
    .catch((err) => console.log(err))
    .finally(()=>setLoading(false))
  }, [limit,page]);

const header=[
{
key:"image",
	name:"Image",
},
{
    key:"title",
	name:"Title",
},
{
key:"created_at",
	name:"Created",
},
{
key:"updated_at",
	name:"Updated",
},
]

async function handleDelete(id){

try{
	const res=await Axios.delete(`${CATEGORIE}/${id}`);
	setCategories(prev=>prev.filter(item=> item.id!==id))
	}catch(err){
console.log(err)
}
}
  


  return (
    <div className="bg-white p-2 w-100">
    <div className="d-flex align-items-center justify-content-between">
    <h1>Categories Page</h1>
     <Link to="/dashboard/category/add" className="btn btn-primary">Add Category</Link>
    </div>
   
     <TableShow search="title" linkName={CATEGORIE} page={page} setPage={setPage} limit={limit} setLimit={setLimit} header={header} data={categories} delete={handleDelete} total={total} loading={loading}/>
     
    </div>
  );
}

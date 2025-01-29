import { useEffect, useState } from "react";
import { PRODUCTS, CATEGORIES, PRODUCT } from "../../../Api/Api";
import { Axios } from "../../../Api/axios";
import { Link } from 'react-router-dom';
import TableShow from "../../../Components/Dashboard/TableShow";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState({});
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  setLoading(true);
    // Fetch products
    Axios.get(`/${PRODUCTS}?limit=${limit}&page=${page}`)
      .then((response) =>{ 		
	  setProducts(response.data.data);
      setTotal(response.data.total);
    })
      .catch((err) => console.log(err)) .finally(()=>setLoading(false))
   }, [limit,page]);
   
  const header = [
  { key: "images", name: "Images" },
    { key: "title", name: "Title" },
    { key: "description", name: "Description" },
    { key: "price", name: "Price" },
    { key: "stock", name: "Stock" },
    { key: "rating", name: "Rating" },
    {
key:"created_at",
	name:"Created",
},
{
key:"updated_at",
	name:"Updated",
},
  ];

  async function handleDelete(id) {
    try {
      const res = await Axios.delete(`${PRODUCT}/${id}`);
      setProducts(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="bg-white p-2 w-100">
      <div className="d-flex align-items-center justify-content-between">
        <h1>Products Page</h1>
        <Link to="/dashboard/product/add" className="btn btn-primary">Add Product</Link>
      </div>
      <TableShow  linkName={PRODUCT} search="title" page={page} setPage={setPage} limit={limit} header={header} data={products} delete={handleDelete} setLimit={setLimit} categories={categories} loading={loading} total={total}/>
    </div>
  );
}

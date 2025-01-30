import {  useContext,useEffect, useState } from "react";
import { Form,Container,Modal,Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Axios } from "../../../Api/axios";
import { CATEGORIES , LOGOUT} from "../../../Api/Api";
import "./navBar.css";
import StringSlice from "../../../helpers/StringSlice";
import SkeletonShow from "../Skeleton/SkeletonShow";
import { Cart } from "../../../Context/CartChangerContext";
import PlusMinusBtn from "../Btns/PlusMinusBtn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faXmark ,faShoppingCart,faSignOutAlt,faUser} from "@fortawesome/free-solid-svg-icons";
import Cookie from 'cookie-universal';

export default function NavBar(){
const [categories, setCategories] = useState([]);
const [loading, setLoading] = useState(true);
const [show, setShow] = useState(false);
const [products, setProducts] = useState([]);
const [count, setCount] = useState(0);
const { isChange } = useContext(Cart);


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
const cookie = Cookie();
const loggedIn = cookie.get('ecom') ? true :false;


async function handleLogout() {
    try {
      await Axios.get(`/${LOGOUT}`);
      cookie.remove('ecom');
      window.location.pathname = '/login';
    } catch (err) {
      console.log(err);
    }
  }

useEffect(() => {
    Axios.get(`${CATEGORIES}`)
      .then((res) => setCategories(res.data.slice(-8)))
      .finally(() => setLoading(false));
  }, []);
  
    useEffect(() => {
    const getProducts = JSON.parse(localStorage.getItem("product")) || [];
    setProducts(getProducts);
  }, [isChange]);


const categoriesShow = categories.map((category, key) => (
    <Link
      key={key}
      to={`/category/${category.id}`}
      className="m-0 category-title text-black"
    >
      {StringSlice(category.title, 15)}
    </Link>
  ));
  
  const handleDelete = (id) => {
    const filterProduct = products.filter((product) => product.id !== id);
    setProducts(filterProduct);
    localStorage.setItem("product", JSON.stringify(filterProduct));
  };
  
  const changeCount = (id, btnCount) => {
    const getProducts = JSON.parse(localStorage.getItem("product")) || [];
    const findProduct = getProducts.find((product) => product.id === id);
    findProduct.count = btnCount;
    localStorage.setItem("product", JSON.stringify(getProducts));
  };
  
  const productsShow = products?.map((product, key) => (
    <div className="mb-4 position-relative" key={key}>
      <div
        onClick={() => handleDelete(product.id)}
        className="position-absolute top-0 end-0 rounded-circle d-flex align-items-center justify-content-center bg-danger text-white"
        style={{ width: "20px", height: "20px", cursor: "pointer" }}
      >
        <FontAwesomeIcon width="10px" icon={faXmark} />
      </div>
      <div className="d-flex align-items-start gap-2 flex-wrap">
        <div
          
          style={{ objectFit: "cover",backgroundImage: `url(`https://shopping-production.up.railway.app${product.img}`)`,height:"80px" ,backgroundPosition: "center",
                backgroundSize: "cover"}}
          className="rounded col-sm-3 col-12"
          
        ></div>
        <div className="col-sm-6 col-12">
          <h6>{product.title}</h6>
          <p className="m-0 text-truncate">{product.description}</p>
          <div className="d-flex align-items-center gap-3">
            <h5 className="m-0 text-primary">{product.discount}$</h5>
            <h6
              className="m-0"
              style={{
                color: "gray",
                textDecoration: "line-through",
              }}
            >
              {product.price}$
            </h6>
          </div>
        </div>

        <PlusMinusBtn
          id={product.id}
          count={product.count || 1}
          setCount={setCount}
          changeCount={changeCount}
        />
      </div>
    </div>
  ));

  
return(
<>
<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
  {products.length > 0 ? productsShow : ( <div className="text-center">No Products added yet</div>)}
</Modal.Body>

        <Modal.Footer>
          <Button variant="none" className="border"  onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Checkout</Button>
        </Modal.Footer>
      </Modal>
	<nav className="py-3">
		<Container>
		  <div className='d-flex align-items-center justify-content-between flex-wrap'>
			<Link className="col-3" to="/">
				<img width="200px" src={require('../../../Assets/logo.png')} alt='logo'/>
		    </Link>
		    <div className="col-12 col-md-6 order-md-2 order-3 mt-md-0 mt-3 position-relative">
		    	<Form.Control 
		    	  className="form-contol custom-search rounded-0"
                  type="Search" 
                  placeholder="Search Product" 
                 />
                 <h3 className="btn btn-primary position-absolute top-0 end-0 h-100 line-height m-0 px-4 rounded-0 d-flex align-items-center justify-content-center">Search</h3>
		    </div>
		    <div className='col-3 d-flex align-items-center justify-content-end gap-4 order-md-3 order-1'>
			<div  onClick={handleShow} style={{ cursor: "pointer", color:'#0c6ffa'}}>
				<FontAwesomeIcon  icon={faShoppingCart} className=" fs-3 fw-light" /> 
		    </div>
		    { !loggedIn ? (
		    <Link  to="/login" className="text-black ">
				<FontAwesomeIcon icon={faUser} className="ms-2 fs-3 fw-light" />
		    </Link>) :
		    
		    (
		     <div style={{cursor:'pointer'}} onClick={handleLogout}>
				<FontAwesomeIcon icon={faSignOutAlt} className="ms-2 fs-3 fw-light" /> 
		    	</div>
		    ) }
		    </div>
		  </div>
		  <div className="mt-3">
		  <div className="d-flex align-items-center justify-content-start gap-5 flex-wrap">
		{loading ? (
                <>
                  <SkeletonShow length="8" width="10ch" />
                </>
              ) : (
                categoriesShow
              )}
    	 
		   <Link className="text-black category-title" to="/categories">
                Show All
              </Link>
		  	</div>
		  </div>
		</Container>
	</nav>
	</>
)
}

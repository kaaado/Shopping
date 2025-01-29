import { useEffect, useState, useContext } from "react";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solid, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import { Cart } from "../../../Context/CartChangerContext";
import { PRODUCT,CART } from "../../../Api/Api";
import { Axios } from "../../../Api/axios";
import PlusMinusBtn from "../../../Components/Website/Btns/PlusMinusBtn";

export default function ProductCard({
  id,
  img,
  title,
  description,
  rating,
  discount,
  price,
  sale,
  col,
  show,f3,f4,f5,f1,
  showAbout,
  About,
  stock,
  showStock
}) {

  const roundStars = Math.round(rating);
  const stars = Math.min(roundStars, 5);
  const showGoldStars = Array.from({ length: stars }).map((_, index) => (
    <FontAwesomeIcon className={`${f5}`} color="gold" key={index} icon={solid} />
  ));
  const showEmptyStars = Array.from({ length: 5 - stars }).map((_, index) => (
    <FontAwesomeIcon className={`${f5}`} key={index} color="gold" icon={regularStar} />
  ));
  
  const product={
  id,
  img,
  title,
  description,
  rating,
  discount,
  price,
  About,
  stock
} 

const [loadingCart, setLoadingCart] = useState(false);
const [count, setCount] = useState(0);
const { setIsChange } = useContext(Cart);
  
  const checkStock = async () => {
    try {
      setLoadingCart(true);
      const getItems = JSON.parse(localStorage.getItem("product")) || [];
      const productCount = getItems.filter((item) => item.id == id)?.[0]?.count;

      
      await Axios.post(`${CART}/check`, {
        product_id: product.id ,
        count: count + (productCount ? productCount : 0),
      });
      return true;
    } catch (err) {
      console.log(err);
      return false;
    } finally {
      setLoadingCart(false);
    }
  };

  const handleSave = async (e) => {
    const check = await checkStock();
    if (check) {
      const getItems = JSON.parse(localStorage.getItem("product")) || [];

      const productExist = getItems.findIndex((pro) => pro.id == id);

      if (productExist !== -1) {
        if (getItems[productExist].count) {
          getItems[productExist].count += count;
        } else {
          getItems[productExist].count = count;
        }
      } else {
        if (count > 1) {
          product.count = count;
        }
        getItems.push(product);
      }

      localStorage.setItem("product", JSON.stringify(getItems));
      setIsChange((prev) => !prev);
    }
  };


  return (
    <NavLink to={`/product/${id}`} className={`${col} col-md-6 col-12`}>
      <div className="m-1 border rounded p-3 h-100 d-flex flex-column justify-content-between">
        <div>
          
          <div className='px-5 py-2 position-relative'>
            {sale && (
              <p
                className="m-0 position-absolute top-0 start-0 bg-primary rounded-circle text-white text-uppercase d-inline-block text-center"
                style={{ width: "50px", height: "50px", lineHeight: "50px" }}
              >
                Sale
              </p>
            )}
            {show &&
            <div
              alt="product img"
              className="w-100"
              style={{
                backgroundImage: `url('${img}')`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                height: "170px",
                width: "100%",
              }}
            ></div>}
          </div>
          <p className={` m-0 text-truncate text-black ${f1} `}>{title}</p>
          {showAbout && ( <p  style={{ color: "gray" }}>{About}</p>)}
          <p  className={`mt-1 text-truncate text-secondary ${f4}`}>
            {description}
          </p>
        </div>
        <div className="d-flex align-items-center justify-content-between mt-2">
          <div>
            {showGoldStars}
            {showEmptyStars}
            <div className="d-flex align-items-center gap-3">
              <h5 className={`m-0 text-primary ${f4}`}>{discount}$</h5>
              <h6
                className={`${f5} m-0`}
                style={{ color: "grey", textDecoration: "line-through" }}
              >
                {price}$
              </h6>
            </div>
          </div>
         {showStock && stock === 0 ? (
                    <p style={{color:"orangered"}}>This Prouduct is unavilable</p>
                  ) : showStock ? (
                    <div className="d-flex align-items-center gap-4">
                      <PlusMinusBtn setCount={(data) => setCount(data)} />
                      <div
                        onClick={handleSave}
                        style={{ cursor: "pointer" }}
                        className="border p-2 rounded"
                      >
                        {loadingCart ? (
                          "Loading"
                        ) : (
                         <FontAwesomeIcon icon={faShoppingCart} className=" fs-3 fw-light" />
                        )}
                      </div>
                    </div>
                  ) :
                  <div
                        style={{ cursor: "pointer" }}
                        className="border p-2 rounded"
                      >
                       
                          <FontAwesomeIcon icon={faShoppingCart}  className=" fs-4 fw-light" />
                        
                      </div>
                  }
        </div>
      </div>
    </NavLink>
  );
}

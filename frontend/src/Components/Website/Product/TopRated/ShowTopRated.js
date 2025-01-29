import { useEffect, useState } from "react";
import TopRated from "./TopRated";
import { Axios } from "../../../../Api/axios";
import { TopRatedApi } from "../../../../Api/Api";
import SkeletonShow from "../../Skeleton/SkeletonShow";


export default function ShowTopRated() {
  const [products, setProducts] = useState([]);
  
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Axios.get(`${TopRatedApi}`)
      .then((res) => {
        setProducts(res.data);
       
        const productIds = res.data.map((product) => product.id);
        localStorage.setItem("ids", JSON.stringify(productIds));
      })
      .finally(() => setLoading(false));
  }, []);
  
  

  const productsShow = products.map((product) => (
    <TopRated
      key={product.id}
      id={product.id}
      title={product.title}
      description={product.description}
      img={product.images[0]?.image}
      sale
      price={product.price}
      discount={product.discount}
      rating={product.rating}
      id={product.id}
      
    />
  ));
  return (
    <div className="col-md-6 col-12" style={{ border: "2px solid #0D6EFD" }}>
      <h1 className="text-center m-0 p-3 bg-primary text-white">Top Rated</h1>
      <div className="p-4">
        {loading ? (
          <>
            <SkeletonShow height="800px" length="1" classess="col-12" />
          </>
        ) : (
          productsShow
        )}
      </div>
    </div>
  );
}

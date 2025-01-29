import { useEffect, useState } from "react";
import { Latest } from "../../../../Api/Api";
import { Axios } from "../../../../Api/axios";
import ProductCard from "../ProductCard";
import SkeletonShow from "../../Skeleton/SkeletonShow";

export function ShowLatestProducts() {
  const [products, setProduts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Axios.get(`${Latest}`)
      .then((res) => setProduts(res.data))
      .finally(() => setLoading(false));
  }, []);

  const productsShow = products.map((product) => (
    <ProductCard
      key={product.id}
      id={product.id}
      title={product.title}
      description={product.description}
      img={product.images[0]?.image}
      sale
      show
      price={product.price}
      discount={product.discount}
      rating={product.rating}
      id={product.id}
      col={`col-lg-6`}
      
    />
  ));
  return (
    <div className="col-md-6 col-12">
      <div className="ms-md-3">
        <h1 className="mt-3">Latest Products</h1>
        <div className="d-flex align-items-stretch justify-content-center flex-wrap mt-4 row-gap-2 mb-5">
          {loading ? (
            <>
              <SkeletonShow
                height="300px"
                length="4"
                classess="col-md-6 col-12"
              />
            </>
          ) : (
            productsShow
          )}
        </div>
      </div>
    </div>
  );
}

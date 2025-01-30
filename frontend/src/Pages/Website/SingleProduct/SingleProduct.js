import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ImageGallery from "react-image-gallery";
import { PRODUCT } from "../../../Api/Api";
import { Axios } from "../../../Api/axios";
import ProductCard from "../../../Components/Website/Product/ProductCard";
import { Cart } from "../../../Context/CartChangerContext";
import SkeletonShow from "../../../Components/Website/Skeleton/SkeletonShow";

export default function SingleProduct() {
  const [product, setProduct] = useState({});
  const [productImages, setProductImages] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const { id } = useParams();
  

  useEffect(() => {
    Axios.get(`${PRODUCT}/${id}`).then((res) => {
      setProductImages(
        res.data[0].images.map((img) => ({
          original: 'https://shopping-production.up.railway.app'+img.image,
          thumbnail: 'https://shopping-production.up.railway.app'+img.image,
        }))
      );
      setProduct(res.data[0]);
    })
    .finally(() => setLoading(false));
  }, [id]);

  return (
    <Container className="mt-2">
      <div className="d-flex align-items-start  flex-wrap">
       {loading ? (
          <>
            <div className="col-lg-4 col-md-6 col-12">
              <SkeletonShow height="250px" length="1" classess="col-12" />{" "}
              <div className="col-12 d-flex mt-1">
                <SkeletonShow height="100px" length="1" classess="col-4" />
                <SkeletonShow height="100px" length="1" classess="col-4" />
                <SkeletonShow height="100px" length="1" classess="col-4" />
              </div>
            </div>

            <div className="col-lg-8 col-md-6 col-12">
              <div className="ms-lg-5">
                <SkeletonShow
                  height="20px"
                  length="1"
                  classess="col-lg-8 col-12"
                />{" "}
                <SkeletonShow
                  height="210px"
                  length="1"
                  classess="col-lg-8 col-12 mt-2"
                />{" "}
                <hr className="col-lg-8 col-12" />
                <div className="d-flex align-items-center justify-content-between col-lg-8 col-12">
                  <SkeletonShow
                    height="20px"
                    length="1"
                    classess="col-4 mt-2"
                  />{" "}
                  <SkeletonShow
                    height="20px"
                    length="1"
                    classess="col-4 mt-2"
                  />{" "}
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
        
        <Col lg={4} md={6} xs={12}>
          <ImageGallery items={productImages}   useTranslate3D  />
        </Col>

      
        <Col  lg={8} md={6} xs={12}>
          <ProductCard 
            id={product.id}
            title={product.title}
            description={product.description}
            rating={product.rating}
            price={product.price}
            discount={product.discount}
            stock={product.stock} 
            f1='fs-2'
            f3='fs-3'
            f4='fs-4'
            f5='fs-5'
            showAbout
            About={product.About}
            stock={product.stock}
            showStock
            img={product.images[0]?.image}
          />
        </Col>
        </>)}
      </div>
    </Container>
  );
}

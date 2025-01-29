import ProductCard from "../ProductCard";

export default function SaleProduct({ id, img, title, description, rating, price, discount, sale, classess }) {
  return (
    <ProductCard 
      id={id}
      img={img}
      title={title}
      description={description}
      rating={rating}
      price={price}
      discount={discount}
      sale={sale}
      col='col-lg-3'
      show
    />
  );
}

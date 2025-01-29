import ProductCard from "../ProductCard";

export default function TopRated({ id, img, title, description, rating, price, discount }) {
  return (
    <ProductCard 
     
      id={id}
      img={img}
      title={title}
      description={description}
      rating={rating}
      price={price}
      discount={discount}
      show
     
    />
  );
}

import { Axios } from "../Api/axios";
import { TopRatedApi } from "../Api/Api";
import { useEffect, useState } from "react";

export default function useRandomProductId() {
  const [products, setProducts] = useState([]);
  const [randomProductId, setRandomProductId] = useState(null);

  useEffect(() => {
    Axios.get(TopRatedApi)
      .then((res) => {
        setProducts(res.data);
        if (res.data.length > 0) {
          const randomIndex = Math.floor(Math.random() * res.data.length);
          setRandomProductId(res.data[randomIndex]?.id);
        }
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return randomProductId;
}

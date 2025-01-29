import './Home.css';
import ShowLatestSaleProducts from "../../../Components/Website/Product/SaleProducts/ShowLatestSaleProducts";
import Landing from "../../../Components/Website/Landing/Landing";
import BeforeTopRated from "../../../Components/Website/BeforTopRated/BeforeTopRated";
import ShowTopRated from "../../../Components/Website/Product/TopRated/ShowTopRated";
import { ShowLatestProducts } from "../../../Components/Website/Product/LatestProducts/ShowLatestProducts";
import Footer from '../Footer/Footer';
import { Container } from "react-bootstrap";

export default function HomePage() {
  return (
    <div>
	 <Landing />
     <ShowLatestSaleProducts />
     <BeforeTopRated />
       <Container>
        <div className="d-flex align-items-start flex-wrap mt-5">
          <ShowTopRated />
          <ShowLatestProducts />
        </div>
      </Container>
      <Footer />
    </div>
  );
}

import { Container } from "react-bootstrap";
import Title_1 from  "../../assets/img/Title-1.webp";
import Title_2 from  "../../assets/img/Title-2.webp";
import Title_3 from  "../../assets/img/Title-3.webp";
import Title_4 from  "../../assets/img/Title-4.webp";
import Title_5 from  "../../assets/img/Title-5.webp";
import Title_6 from  "../../assets/img/Title-6.jpg";
import Title_7 from  "../../assets/img/Title-7.webp";
import Title_8 from  "../../assets/img/Title-8.webp";
import Title_9 from  "../../assets/img/Title-9.webp";
import SingleProduct from "./SingleProduct";

const TitleProduct = () => {
  return (
    <div className="title-wrapper">
      <SingleProduct image={Title_1} name={"kilos"} />
      <SingleProduct image={Title_2} name={"Mobiles"} />
      <SingleProduct image={Title_3} name={"Fasion"} />
      <SingleProduct image={Title_4} name={"Electronic"} />
      <SingleProduct image={Title_5} name={"Home & Furniture"} />
      <SingleProduct image={Title_6} name={"Appliances"} />
      <SingleProduct image={Title_7} name={"Flight Bookings"} />
      <SingleProduct image={Title_8} name={"Beauty, Toy & More"} />
      <SingleProduct image={Title_9} name={"Two Wheelers"} />
    </div>
  );
};

export default TitleProduct;

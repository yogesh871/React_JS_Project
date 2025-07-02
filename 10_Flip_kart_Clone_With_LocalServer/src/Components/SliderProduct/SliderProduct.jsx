import Carousel from 'react-bootstrap/Carousel';
import Slider_1 from "../../assets/img/Slider-1.webp" 
import Slider_2 from "../../assets/img/Slider-2.webp" 
import Slider_3 from "../../assets/img/Slider-3.webp" 
import Slider_4 from "../../assets/img/Slider-4.webp" 
import Slider_5 from "../../assets/img/Slider-5.webp" 
import Slider_6 from "../../assets/img/Slider-6.webp" 
import Slider_7 from "../../assets/img/Slider-7.webp" 
import Slider_8 from "../../assets/img/Slider-8.webp" 
import './SliderProduct.css';

function SliderProduct() {
  return (
    <Carousel className='slider-items'>
      <Carousel.Item interval={2000}><img src={Slider_1} alt="slide 1" /></Carousel.Item>
      <Carousel.Item interval={2000}><img src={Slider_2} alt="slide 2" /></Carousel.Item>
      <Carousel.Item interval={2000}><img src={Slider_3} alt="slide 3" /></Carousel.Item>
      <Carousel.Item interval={2000}><img src={Slider_4} alt="slide 4" /></Carousel.Item>
      <Carousel.Item interval={2000}><img src={Slider_5} alt="slide 5" /></Carousel.Item>
      <Carousel.Item interval={2000}><img src={Slider_6} alt="slide 6" /></Carousel.Item>
      <Carousel.Item interval={2000}><img src={Slider_7} alt="slide 7" /></Carousel.Item>
      <Carousel.Item interval={2000}><img src={Slider_8} alt="slide 8" /></Carousel.Item>
    </Carousel>
  );
}

export default SliderProduct;

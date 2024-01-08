
import Slider from 'react-slick';
import 'node_modules/slick-carousel/slick/slick.css';
import 'node_modules/slick-carousel/slick/slick-theme.css';

import foto1 from "../assets/slide/foto1.jpg";
import foto2 from "../assets/slide/foto2.jpg";
import foto3 from "../assets/slide/foto3.jpg";
import foto4 from "../assets/slide/foto4.jpg";

const Slide = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 4000,
    autoplay:true
    
  };

  const slideImages = [foto1, foto2, foto3, foto4];

  return (
    <div className=' flex justify-center h-1/2  w-screen'>
      <div className="slide-container my-5    w-3/4  ">
        <Slider {...settings}>
          {slideImages.map((slideImage, index) => (
            <div key={index}>
              <img
              className='full'
                src={slideImage}
                alt={`Slide ${index + 1}`}
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Slide;


import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
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
    <div className=' flex justify-center    my-5  w-screen'>
      <div className="slide-container my-5  bg-gray-500 h-[300px]    w-full  ">
        <Slider {...settings}>
          {slideImages.map((slideImage, index) => (
            <div className='h-full ' key={index}>
              <img
              className='h-[300px]  '
                src={slideImage}
                alt={`Slide ${index + 1}`}
                
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Slide;

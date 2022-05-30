// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function Carousel({ photo, photo2, photo3, photo4 }) {
  
  function VerSlide(foto) {

    console.log("foto es ", foto)

      return (
        <>
        <p>este es {foto}</p>
        <SwiperSlide><img src={foto}></img></SwiperSlide>
        </>
      )
    
  }
  
  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={20}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
    >
      {photo ? VerSlide(photo): false}
      {photo2 && photo2 != '../images/formacion.jpg' ? VerSlide(photo2): false}
      {photo3 && photo3 != '../images/formacion.jpg' ? VerSlide(photo3): false}
      {photo4 && photo4 != '../images/formacion.jpg' ? VerSlide(photo4): false}
    
      <p>Fotos</p>
    
    </Swiper>
  );
};
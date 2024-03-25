// import Swiper from "swiper"
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import './Slider.scss'
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const Slider = ({slides}) => {
    const navigate = useNavigate();

    const handleNavigate = (id) => {
        navigate(`/detail/${id}`);
    }

    return (
        <Swiper
            slidesPerView={3}
             autoplay={{ delay: 3000 }}
            loop={true} 
            spaceBetween={30}
            pagination={{
            clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper"
        >
            {slides?.map((slide) => (
                <SwiperSlide key={slide?._id}  onClick={() => handleNavigate(slide?._id)}>
                  <img src={`http://${slide?.image[0]}`} className='imgSlider'/>
                  <i className='titleSlider'>{slide?.title}</i>
                </SwiperSlide>
            ))}
            
            {/* <SwiperSlide>
            <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
            </SwiperSlide>
            <SwiperSlide>
            <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
            </SwiperSlide>
            <SwiperSlide>
            <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
            </SwiperSlide>
            <SwiperSlide>
            <img src="https://swiperjs.com/demos/images/nature-5.jpg" />
            </SwiperSlide>
            <SwiperSlide>
            <img src="https://swiperjs.com/demos/images/nature-6.jpg" />
            </SwiperSlide>
            <SwiperSlide>
            <img src="https://swiperjs.com/demos/images/nature-7.jpg" />
            </SwiperSlide>
            <SwiperSlide>
            <img src="https://swiperjs.com/demos/images/nature-8.jpg" />
            </SwiperSlide>
            <SwiperSlide>
            <img src="https://swiperjs.com/demos/images/nature-9.jpg" />
            </SwiperSlide> */}
        </Swiper>
    )

}

export default Slider
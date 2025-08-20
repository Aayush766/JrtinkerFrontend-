import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';
import TeacherTestimonialSlider from './TeacherTestimonialSlider';

const TeacherAllSlider = () => {
  return (
    <section className="w-full flex items-center justify-center">
      <div className="w-full max-w-[1100px] p-4 sm:p-6">
        <style>
          {`
            .swiper-pagination {
              display: none;
            }
            @media (max-width: 768px) {
              .swiper-slide {
                width: 85% !important;
              }
            }
          `}
        </style>
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          loop={true}
          speed={2600}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false
          }}
          coverflowEffect={{
            rotate: 20,
            stretch: 0,
            depth: 200,
            modifier: 1,
            slideShadows: true,
          }}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 20
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 30
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 40
            }
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination, Autoplay]}
          className="mySwiper"
        >
          {[
            "nature-1", "nature-2", "nature-3",
            "nature-4", "nature-5", "nature-6",
            "nature-7", "nature-8", "nature-9"
          ].map((img, i) => (
            <SwiperSlide key={i} className="w-full sm:w-[300px] h-auto">
              <div className='h-[300px] w-full bg-pink-600 rounded-lg shadow-lg overflow-hidden'>
                <TeacherTestimonialSlider />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TeacherAllSlider;
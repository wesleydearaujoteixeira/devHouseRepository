'use client';

import { useEffect, useState } from 'react';
import styles from './slider.module.css';
import { getHouses } from '@/app/services/servicesApi';
import {register} from 'swiper/element/bundle'

register();

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Image from 'next/image';
import { HouseTypes } from '@/app/types/TypesObject';
import { Swiper, SwiperSlide } from 'swiper/react';


const Slider = () => {



  const [casas, setCasas] = useState <HouseTypes[]> ([]);

  const [casasPerPage, setCasasPerPage] = useState <number>(2);


  const handleResize = () => {
    if (window.innerWidth < 768) {
      setCasasPerPage(1);
    } else {
      setCasasPerPage(2);
    }

  }


  useEffect(() => {

    getHouses().then((response) => {
      setCasas(response.data.houses);
    });

    handleResize();
    window.addEventListener('resize', handleResize);


    return () => {
      window.removeEventListener('resize', handleResize);
    }

  }, []);

  return (
    <div className={styles.slide_container}>
      
        <Swiper
        slidesPerView={casasPerPage}
        navigation
        pagination={{ clickable: true } }
        
        >
        
          {casas?.map((casa, index) => (
            <SwiperSlide key={index}>
                  <Image
                      src={casa.images_url}
                      alt={''}
                      height={650}
                      width={1000}
                      priority 
                  />
        
              </SwiperSlide>
          ))}
        </Swiper>
       
      </div>
  );
};

export default Slider;

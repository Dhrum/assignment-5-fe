import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import img1 from '../assets/glowmart-banner-1.png';
import img2 from '../assets/glowmart-banner-2.png';
import img3 from '../assets/glowmart-banner-3.png';
import img4 from '../assets/glowmart-banner-4.png';
import './CarouselComponent.css';

const CarouselComponent = () => {
    const carouselSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <Slider {...carouselSettings} className="banner-carousel">
            <div>
                <img src={img1} alt="Banner 1" />
            </div>
            <div>
                <img src={img2} alt="Banner 2" />
            </div>
            <div>
                <img src={img3} alt="Banner 3" />
            </div>
            <div>
                <img src={img4} alt="Banner 4" />
            </div>
        </Slider>
    );
};

export default CarouselComponent;

import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './TextBasedCarousel.css';

const TextBasedCarousel = () => {
    const textCarouselSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <section className="offers-carousel">
            <Slider {...textCarouselSettings} className="text-carousel">
                <div>
                    <h3>Dhamaka Offer - Up to 50% off on Electronics!</h3>
                </div>
                <div>
                    <h3>Free Shipping on Orders Over $100</h3>
                </div>
                <div>
                    <h3>Best Sellers - Limited Stock Available!</h3>
                </div>
            </Slider>
        </section>
    );
};

export default TextBasedCarousel;

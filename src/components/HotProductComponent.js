import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './HotProductComponent.css';

const HotProductComponent = ({ products }) => {
    const productSliderSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
    };

    return (
        <section className="hot-products">
            <h2>Hot Products</h2>
            <Slider {...productSliderSettings} className="product-slider">
                {products.map((product) => (
                    <div key={product._id} className="product-card">
                        <img
                            src={product.photoURL}
                            alt={product.name}
                            onError={(e) => (e.target.src = 'https://via.placeholder.com/150?text=No+Image')}
                        />
                        <h3>{product.name}</h3>
                        <p>${product.price}</p>
                        <button className="btn-buy">Buy Now</button>
                    </div>
                ))}
            </Slider>
        </section>
    );
};

export default HotProductComponent;

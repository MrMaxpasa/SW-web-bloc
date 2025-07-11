import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import FavoriteButton from './FavoriteButton'

export default function Carousel({ items, title }) {
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        adaptiveHeight: true
    }

    return (
        <div className="carousel-container">
            <h2 className="text-xl font-bold mb-2">{title}</h2>
            <Slider {...settings}>
                {items.map(item => (
                    <div key={item.uid} className="p-2">
                        <img
                            src={`https://starwars-visualguide.com/assets/img/${item.type}/${item.uid}.jpg`}
                            alt={item.name}
                            className="rounded-lg shadow-md"
                        />
                        <p className="mt-2 text-center">{item.name}</p>
                        <FavoriteButton item={{ ...item, type: item.type }} />
                    </div>
                ))}
            </Slider>
        </div>
    )
}

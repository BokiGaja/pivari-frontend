import React, { useState } from 'react';

import PropTypes from 'prop-types';
import { ReactComponent as LeftArrow } from '../../assets/svg/left-arrow-slide.svg';
import { ReactComponent as RightArrow } from '../../assets/svg/right-arrow-slide.svg';

import 'slick-carousel/slick/slick.css';
import Slider from 'react-slick';

const CarouselSlider = ({ carouselData }) => {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '60px',
    variableWidth: true,
    responsive: [
      {
        breakpoint: 1185,
        settings: {
          arrows: false,
          slidesToShow: 3,
          variableWidth: false,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          arrows: false,
          slidesToShow: 2,
          variableWidth: false,
        },
      },
      {
        breakpoint: 570,
        settings: {
          arrows: false,
          slidesToShow: 1,
          variableWidth: false,
        },
      },
    ],
  };

  const slider = React.useRef(null);

  const [isActive, setIsActive] = useState(false);
  const [popUrl, setPopUrl] = useState('');
  const [popAlt, setPopAlt] = useState('');

  const handleClickImg = (e) => {
    setPopUrl(e.target.getAttribute('src'));
    setPopAlt(e.target.getAttribute('alt'));
    setIsActive(true);
  };

  const handleClickExit = () => {
    setIsActive(false);
    setPopUrl('');
  };

  return (
    <div className="lg:w-[85%] w-full mx-auto mt-[50px] relative ">
      {isActive ? (
        <div
          onClick={handleClickExit}
          className="fixed w-screen lg:h-screen h-[125vh] top-0 left-0 bg-[#282c34bb] z-[9]"
        >
          <div className="absolute lg:w-[500px] w-[280px] top-[20%] left-[35%] z-10">
            <img className="w-full" src={popUrl} alt={popAlt} />
          </div>
        </div>
      ) : null}
      <button
        className="absolute top-[50%] -left-[5%] lg:flex hidden justify-center rounded-full border-2 bg-transparent border-hopGreen p-2 pr-[10px] pl-[5px] hover:border-maltYellow hover:bg-guinessBlack transition-all duration-200"
        onClick={() => slider?.current?.slickPrev()}
      >
        <LeftArrow className="w-8 h-8" />
      </button>
      <Slider ref={slider} {...settings}>
        {carouselData?.map((img) => {
          return (
            <div key={img.id} className="flex w-full justify-center hover:cursor-pointer p-5">
              <img onClick={handleClickImg} className="w-[350px]" src={img.attributes.url} alt={img.attributes.name} />
            </div>
          );
        })}
      </Slider>
      <button
        className="absolute top-[50%] -right-[5%] lg:flex hidden justify-center rounded-full border-2 bg-transparent border-hopGreen p-2 pl-[10px] pr-[5px] hover:border-maltYellow hover:bg-guinessBlack transition-all duration-200"
        onClick={() => slider?.current?.slickNext()}
      >
        <RightArrow className="w-8 h-8" />
      </button>
    </div>
  );
};

CarouselSlider.propTypes = {
  carouselData: PropTypes.array.isRequired,
};

export default CarouselSlider;

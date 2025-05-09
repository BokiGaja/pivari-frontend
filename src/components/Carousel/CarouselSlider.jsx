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
    variableWidth: false,
    responsive: [
      {
        breakpoint: 1520,
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
    <React.Fragment>
      <div className="w-full flex flex-col">
        <div className=" lg:w-[85%] w-full mx-auto mt-[50px] relative ">
          {isActive ? (
            <div
              onClick={handleClickExit}
              className="fixed flex justify-center items-center w-screen h-screen top-0 left-0 bg-[#282c34bb] z-[9]"
            >
              <div className=" max-w-[80vw] z-10">
                <img className="flex w-auto max-h-[95vh] mx-auto" src={popUrl} alt={popAlt} />
              </div>
            </div>
          ) : null}
          <button
            className="absolute top-[40%] -left-[7%] lg:flex hidden justify-center rounded-full border-2 bg-transparent border-hopGreen p-2 pr-[10px] pl-[5px] hover:border-maltYellow hover:bg-guinessBlack transition-all duration-200"
            onClick={() => slider?.current?.slickPrev()}
          >
            <LeftArrow className="w-8 h-8" />
          </button>
          <Slider ref={slider} {...settings}>
            {carouselData?.map((img) => {
              return (
                <div key={img.id || img.attributes.url} className="lg:min-w-[400px] min-w-0 px-[10px]">
                  <div className="flex lg:w-[350px] w-auto h-[500px] relative justify-center hover:cursor-pointer p-5 overflow-hidden">
                    <img
                      onClick={handleClickImg}
                      className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] min-w-[130%] max-w-[300%] max-h-[130%]"
                      src={img.attributes.url}
                      alt={img.attributes.name}
                    />
                  </div>
                </div>
              );
            })}
          </Slider>
          <button
            className="absolute top-[40%] -right-[7%] lg:flex hidden justify-center rounded-full border-2 bg-transparent border-hopGreen p-2 pl-[10px] pr-[5px] hover:border-maltYellow hover:bg-guinessBlack transition-all duration-200"
            onClick={() => slider?.current?.slickNext()}
          >
            <RightArrow className="lg:w-8 lg:h-8 h-6 w-6" />
          </button>
        </div>
        {carouselData?.length > 5 && (
          <div className="flex justify-between flex-wrap lg:w-[600px] w-full lg:px-0 px-[20px] mx-auto mt-[50px] lg:max-h-[250px] max-h-[100px] overflow-y-scroll gap-1">
            {carouselData?.map((img) => {
              return (
                <div
                  key={img.id || img.attributes.url}
                  className="relative flex w-[19%] lg:h-[200px] h-[90px] overflow-hidden hover:cursor-pointer p-2 [::-webkit-scrollbar-track]-[]"
                >
                  <img
                    onClick={handleClickImg}
                    className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] min-w-[130%] max-w-[300%] max-h-[180%]"
                    src={img.attributes.url}
                    alt={img.attributes.name}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

CarouselSlider.propTypes = {
  carouselData: PropTypes.array.isRequired,
};

export default CarouselSlider;

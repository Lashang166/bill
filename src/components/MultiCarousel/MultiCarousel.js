import React from 'react';
import { themeGet } from '@styled-system/theme-get';
import Carousel from 'react-multi-carousel';
import Image from '../Image/Image';
import 'react-multi-carousel/lib/styles.css';
import './MultiCarousel.style.css';
import styled from 'styled-components';
import placeholder from '../Image/product-placeholder.png';

const SingleItem = styled.li `
  border: 1px solid ${themeGet('colors.borderColor', '#f1f1f1')};
  border-radius: 6px;
  margin-right: 20px;
  padding: 0;
  outline: none;
  width: 70px;
  height: auto;
  overflow: hidden;

  &:last-child {
    margin-right: 0;
  }

  &.custom-dot--active {
    border: 2px solid ${themeGet('colors.primary', '#009E7F')};
  }
`;
const responsive = {
    desktop: {
        breakpoint: {
            max: 3000,
            min: 1024,
        },
        items: 1,
    },
    mobile: {
        breakpoint: {
            max: 464,
            min: 0,
        },
        items: 1,
    },
    tablet: {
        breakpoint: {
            max: 1024,
            min: 200,
        },
        items: 1,
    },
};
const CarouselWithCustomDots = ({ items = [], deviceType: { mobile, tablet, desktop }, title, ...rest }) => {
    const children = items.slice(0, 6).map((item, index) => (
        <>
        <Image url={item.url} key={index} alt={title} 
            style={{
                minWidth: 'auto',
                height: 'auto',
                position: 'relative',
                margin: 'auto',
            }}
            className="product-image"/>
        </>));
    const images = items.map((item, index) => (
        <Image 
            url={item.url} 
            key={index} 
            alt={title} 
            style={{ 
                width: '100%', 
                height: '100%', 
                position: 'relative' 
            }}/>
        ));
    const CustomDot = ({ index, onClick, active, carouselState: { currentSlide, deviceType }, }) => {
        return (
        <>
        {items.length !== 0 ?
        <SingleItem data-index={index} key={index} onClick={() => onClick()} className={`custom-dot ${active && 'custom-dot--active'}`}>
            {React.Children.toArray(images)[index]}
        </SingleItem>
        :
            <img src={placeholder} alt='product img loder'/>
        }
        </>
        );
    };
    let deviceType = 'mobile';
    if (mobile) {
        deviceType = 'mobile';
    }
    if (tablet) {
        deviceType = 'tablet';
    }


    {/*<>
      {items.length !== 0 ?
        
        :
            <img src={placeholder} alt='product img loder'/>
        }
    </>*/}
    if(items.length !== 0)
    return (
        <Carousel
          showDots
          ssr
          infinite={true}
          slidesToSlide={1}
          containerClass="carousel-with-custom-dots"
          responsive={responsive}
          deviceType={deviceType}
          autoPlay={false}
          arrows={false}
          customDot={<CustomDot />}
          {...rest}
        >
          {children}
        </Carousel>
      );
    else{
        return (
            <img src={placeholder} alt='product img loder'/>
        )
    }
};
export default CarouselWithCustomDots;

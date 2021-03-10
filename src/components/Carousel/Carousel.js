import React, { useContext } from 'react';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import { apiServer } from '../../API';
import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';
import LanguageContext from '../../contexts/language/language.context';
import { ArrowNext, ArrowPrev } from '../AllSvgIcon';
const ButtonPrev = styled('button') `
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  color: ${themeGet('colors.primary', '#009E7F')};
  padding: 0;
  border-radius: 20px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  border: 0;
  outline: 0;
  cursor: pointer;
  position: absolute;
  top: 50%;
  left: 40px;
  margin-top: -20px;
  z-index: 99;
`;
const ButtonNext = styled('button') `
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  color: ${themeGet('colors.primary', '#009E7F')};
  padding: 0;
  border-radius: 20px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  border: 0;
  outline: 0;
  cursor: pointer;
  position: absolute;
  top: 50%;
  right: 40px;
  margin-top: -20px;
  z-index: 99;
`;
const ButtonGroupWrapper = styled('div') ``;
const PrevButton = ({ onClick, children }) => {
    return (<ButtonPrev onClick={e => {
        e.preventDefault();
        onClick();
    }} className='prevButton'>
      {children}
    </ButtonPrev>);
};
const NextButton = ({ onClick, children }) => {
    return (<ButtonNext onClick={e => {
        e.preventDefault();
        onClick();
    }} className='nextButton'>
      {children}
    </ButtonNext>);
};
const ButtonGroup = ({ next, previous, isRtl = false }) => {
    //const { state: { lang }, } = useContext(LanguageContext);
    const lang = 'ar';
    return (<ButtonGroupWrapper>
      {(isRtl = (lang === 'ar' || lang === 'he' ? (true) : (false)) ? (<>
            <NextButton onClick={() => next()} className='rtl'>
              <ArrowPrev />
            </NextButton>
            <PrevButton onClick={() => previous()}>
              <ArrowNext />
            </PrevButton>
          </>) : (<>
            <PrevButton onClick={() => previous()}>
              <ArrowPrev />
            </PrevButton>
            <NextButton onClick={() => next()}>
              <ArrowNext />
            </NextButton>
          </>))}

      
    </ButtonGroupWrapper>);
};
export default function CustomCarousel({ data,  component, autoPlay = false, infinite = true, customLeftArrow, customRightArrow, itemClass, isRtl, ...props }) {
    let deviceType = 'mobile';
    console.log("window----");
    console.log(window);
    // console.log(`${apiServer}/${data[1].image}`);

    const responsive = {
      superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 1
      },
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
      }
    };
    /*if (mobile) {
        deviceType = 'mobile';
    }
    if (tablet) {
        deviceType = 'tablet';
    }*/
    return (<div dir='ltr'>
      <Carousel 
        arrows={false} 
        responsive={responsive} 
        ssr={true} showDots={false} 
        slidesToSlide={1} infinite={infinite} 
        containerClass='container-with-dots' 
        itemClass={itemClass} 
        deviceType={deviceType} 
        autoPlay={autoPlay} 
        autoPlaySpeed={3000} 
        renderButtonGroupOutside={true} 
        additionalTransfrom={0} 
        itemClass={{flex : 1, }}
        // centerMode={false}
        // focusOnSelect={true}
        //customButtonGroup={<ButtonGroup />} 
        additionalTransfrom={0}
        {...props}
      >
        {data.filter(item => item.image !== "").map((item, index) => {
        if (component)
            return component(item);
        return (
          <div style={{ padding: '0 0px', }} key={index}>
          <img 
            key={index} 
            src={`${apiServer}/ci-api/${item.image}`} 
            alt={""} 
            style={{
              //width: '300px',
              //height: '400px',
              // flex : 1,
              display: 'block',
              position: 'relative',
              margin: 'auto',
              // 'max-width' : '600px',
              'max-width' : window.screen.width,
              'max-height' : '600px',
        }}/>
            </div>);
            {/*return (
              <div style={{backgroundColor: item}}>Frame 1</div>
            )*/}
            
      })}
      </Carousel>
    </div>);
    /*return (
      <Carousel 
        arrows={false} 
        responsive={responsive} 
        ssr={true} showDots={false} 
        slidesToSlide={1} 
        infinite={infinite} 
        containerClass='container-with-dots' 
        //itemClass={itemClass} 
        deviceType={'mobile'} 
        //autoPlay={autoPlay} 
        autoPlaySpeed={3000} 
        renderButtonGroupOutside={true} 
        additionalTransfrom={1} 
        customButtonGroup={<ButtonGroup />} 
        //{...props}
      >
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
        <div>Item 4</div>
      </Carousel>
    )*/
}

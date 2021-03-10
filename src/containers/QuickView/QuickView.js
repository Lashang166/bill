import React, { useContext, useMemo, useState } from 'react';
import Router from 'next/router';
import { useHistory } from "react-router-dom";
import { SearchIcon, } from '../../components/AllSvgIcon';
import { closeModal } from '@redq/reuse-modal';
import { Scrollbars } from 'react-custom-scrollbars';
import Button from '../../components/Button/Button';
import InputIncDec from '../../components/InputIncDec/InputIncDec';
import { QuickViewWrapper, ProductDetailsWrapper, ProductPreview, DiscountPercent, ProductInfoWrapper, ProductInfo, ProductTitle, ProductWeight, ProductDescription, ProductMeta, ProductCartWrapper, ProductPriceWrapper, ProductPrice, SalePrice, ProductCartBtn, MetaSingle, MetaItem, ModalClose, } from './QuickView.style';
import { CURRENCY } from '../../helper/constant';
import { CloseIcon, CartIcon } from '../../components/AllSvgIcon';
import { CartContext } from '../../contexts/cart/cart.context';
import { findProductIndex, getProductQuantity } from '../../helper/utility';
import ReadMore from '../../components/Truncate/Truncate';
import CarouselWithCustomDots from '../../components/MultiCarousel/MultiCarousel';
import LanguageContext from '../../contexts/language/language.context';
import { createGlobalStyle } from 'styled-components';
import { getSelectProduct } from '../../API';


const CartButtonStyle = createGlobalStyle `

.reusecore__button {
  font-family: 'Lato',sans-serif;
  font-size: 15px;
  font-weight: 700;
  height: 36px;
  border-radius: 4rem;
}

`;

const QuickView = ({ modalProps, deviceType, onModalClose, match, PID }) => {
    const history = useHistory();

    const { add, update, products } = useContext(CartContext);
    const { id, type, title, unit, price, discountInPercent, salePrice, description, gallery, categories, } = modalProps;
    const index = findProductIndex(products, id);
    const quantity = getProductQuantity(products, index);

    const [ isVisible, setIsVisible ] = useState(true);


    useMemo(() => {

      // console.log();
      let params = {
        amcode : match.params.productOwner,
        PID : PID
      }

      getSelectProduct(params).then((result) => {
        // return result.data.data[0]
        // console.log("result.data.data[0]---------------------");
        // console.log(result.data.data[0]);

        // if(result.data.data[0].pr_longdesc !== "[]" && result.data.data[0].pr_longdesc !== null){
        //   setIsVisible(true);
        // }
      })

    }, [])

    const handleClick = (e) => {
        e.stopPropagation();
        add(e, modalProps);
    };
    const handleUpdate = (value, e) => {
        if (index === -1 && value === 1) {
            add(e, modalProps);
        }
        else {
            update(id, value);
        }
    };
    
    function onCategoryClick(slug) {
        /*Router.push({
            pathname: `/${type.toLowerCase()}`,
            query: { category: slug },
        }).then(() => window.scrollTo(0, 0));*/
        closeModal();
    }

    let lang = 'en';

    return (<>
      <ModalClose onClick={onModalClose}>
        <CloseIcon />
      </ModalClose>
      <QuickViewWrapper>
        <ProductDetailsWrapper className='product-card' dir='ltr'>
          {lang === 'ar' || lang === 'he' ? ('') : (<ProductPreview>
              <CarouselWithCustomDots items={gallery} deviceType={deviceType}/>
              {!!discountInPercent && (<>
                  <DiscountPercent>{discountInPercent}%</DiscountPercent>
                </>)}
            </ProductPreview>)}
          <ProductInfoWrapper dir={lang === 'ar' || lang === 'he' ? 'rtl' : 'ltr'}>
            <Scrollbars universal autoHide autoHeight autoHeightMax='90vh'>
              <ProductInfo>
                <ProductTitle>{title}</ProductTitle>
                <ProductWeight>{unit > 0 ? "In Stock " + unit : "Ready Stock"}</ProductWeight>
                <ProductDescription>
                  <ReadMore character={600}>{description}</ReadMore>
                </ProductDescription>
                <ProductCartWrapper>
                  <ProductPriceWrapper>
                    {discountInPercent ? (<SalePrice>
                        {price + ' ' + CURRENCY}
                      </SalePrice>) : ('')}

                    <ProductPrice>
                      {salePrice ? salePrice : price}{' '}
                      {CURRENCY}
                    </ProductPrice>
                  </ProductPriceWrapper>
                  <ProductCartBtn>
                    {quantity <= 0 ? (
                      <Button 
                        title='ซื้อเลย' 
                        intlButtonId='addCartButton' 
                        iconPosition='left' 
                        colors='primary' 
                        size='small' 
                        variant='outlined' 
                        className='cart-button' 
                        icon={<CartIcon />} 
                        onClick={e => handleClick(e)}
                      />
                    ) : (
                        <InputIncDec 
                          value={quantity} 
                          onUpdate={(value, e) => handleUpdate(value, e)}/>
                      )
                    }
                      {isVisible ? 
                      <Button 
                        title='รายละเอียด' 
                        intlButtonId='addCartButton' 
                        iconPosition='left' 
                        colors='primary' 
                        size='small' 
                        variant='outlined' 
                        className='cart-button' 
                        icon={<SearchIcon />} 
                        onClick={e => {
                          history.push(`${match.params.productOwner}/${PID}`)
                          // window.location.href = `productList/${match.params.productOwner}/${PID}`;
                          // window.location.href( `productList/${match.params.productOwner}/${PID}`)
                        }}
                      />
                      : null}
                  </ProductCartBtn>
                </ProductCartWrapper>

                <ProductMeta>
                  <MetaSingle>
                    {categories
        ? categories.map((item) => (<MetaItem onClick={() => onCategoryClick(item.slug)} key={item.id}>
                            {item.title}
                          </MetaItem>))
        : ''}
                  </MetaSingle>
                </ProductMeta>
              </ProductInfo>
            </Scrollbars>
          </ProductInfoWrapper>

          {lang === 'ar' || lang === 'he' ? (<ProductPreview>
              <CarouselWithCustomDots items={gallery} deviceType={deviceType}/>
              {!!discountInPercent && (<>
                  <DiscountPercent>{discountInPercent}%</DiscountPercent>
                </>)}
            </ProductPreview>) : ('')}
        </ProductDetailsWrapper>
      </QuickViewWrapper>
    </>);
};
export default QuickView;

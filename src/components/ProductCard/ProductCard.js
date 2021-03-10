import React, { useCallback, useContext } from 'react';
import { CartContext } from '../../contexts/cart/cart.context';
import Image from '../Image/Image';
import Button from '../Button/Button';
import InputIncDec from '../InputIncDec/InputIncDec';
import { AlertDotIcon, CartIcon } from '../AllSvgIcon';
import { useDrawerDispatch } from '../../contexts/drawerProduct/DrawerContext';
import { SearchContext } from '../../contexts/search/search.context';
import { ProductCardWrapper, ProductImageWrapper, ProductInfo, DiscountPercent, } from './ProductCard.style';
import { getProductQuantity, findProductIndex } from '../helpers/utility';
import { getSelectProduct, AddProductData } from '../../API';
import ProductsContext from '../../contexts/products/products.context';

const CopySVG = ({
  size=18, 
  color="#000000"
}) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke={color} 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2">
    </rect>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1">
    </path>
  </svg>
);

const EditSVG = ({size=18, color="#000000"}) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path><polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon></svg>);


const ProductCard = ({ 
  title, 
  image, 
  weight, 
  price, 
  salePrice, 
  discountInPercent, 
  cartProducts, 
  addToCart, 
  updateCart, 
  value, 
  currency, 
  onChange, 
  increment, 
  decrement, 
  data, 
  deviceType, 
  onClick, 
  productOwner, 
  isAdmin, 
  isOwner,
  PID,
  ...props 
}) => {
    const { add, update, products } = React.useContext(CartContext);
    const index = data && data.id ? findProductIndex(products, data.id) : -1;
    const quantity = getProductQuantity(products, index);
    const { state, dispatch } = useContext(SearchContext);
    const { newData, addSingleProduct } = useContext(ProductsContext);

    
    const handleClick = (e) => {
        e.stopPropagation();
        add(e, data);
    };
    const handleUpdate = (value, e) => {
        if (index === -1 && value === 1) {
            add(e, data);
        }
        else {
            update(data.id, value);
        }
    };

    const dispatchAddProduct = useDrawerDispatch();

    

    const onClickEdit = useCallback(
      async (pid) => {
        // console.log("dispatchAddProduct-----");
        // console.log(dispatchAddProduct);

        // 5432
        // alert(pid);
    
        let params = {
          amcode : productOwner,
          PID : pid
        }

        let result = await getSelectProduct(params).then((result) => {
          return result.data.data[0]
        })
        console.log("result.data.data[0]-----------onClickEdit");
        console.log(result);


        dispatchAddProduct({ 
          type: 'OPEN_DRAWER', 
          drawerComponent: 'PRODUCT_FORM', 
          data : { 
            productOwner : productOwner,
            description : result.pr_desc,
            name : result.pr_title,
            SKU : result.prod_sku,
            price : result.retail,
            cost : result.Cost,
            POcost : result.POcost,
            PID : pid,
            mode : "update",
            prCat : result.pr_cat,
            newDataFunc : newData,
            isAbleDelete : weight > 0 ? true : false,
            imageList : result.images,
          } 
        })

        // alert('sss');
      }, [dispatch]
    );

    const onClickCopy = useCallback(
      async (pid) => {
        // console.log("dispatchAddProduct-----");
        // console.log(dispatchAddProduct);

        // 5432

       

        let params = {
          amcode : productOwner,
          PID : pid
        }

        let selectedProductData = await getSelectProduct(params).then((result) => {
          return result.data.data[0]
        })

        // alert(selectedProductData)


        console.log(selectedProductData);
        const newProduct = {
          "pgrpid": 14,
          "retail": selectedProductData.retail,
          "prod_sku": selectedProductData.prod_sku + " copy",
          "pr_desc": selectedProductData.pr_desc === "" ? "-" : selectedProductData.pr_desc,
          "pr_title": selectedProductData.pr_title + " copy",
          "stk_org": 0,
          "Cost": selectedProductData.Cost,
          "POcost": selectedProductData.POcost,
          pid : pid,
          "pr_cat": selectedProductData.pr_cat,
          // "pr_longdesc":{}
        };

        

        AddProductData(newProduct).then(result => {
          console.log("result------------+++++++++++");
          console.log(result);

          // newData(productOwner, "");

          // addSingleProduct(newProduct);
          dispatchAddProduct({ 
            type: 'OPEN_DRAWER', 
            drawerComponent: 'PRODUCT_FORM', 
            data : { 
              productOwner : productOwner,
              description : selectedProductData.pr_desc,
              name : selectedProductData.pr_title + " copy",
              SKU : selectedProductData.prod_sku + " copy",
              price : selectedProductData.retail,
              cost : selectedProductData.Cost,
              POcost : selectedProductData.POcost,
              PID : result.data.pid,
              prCat : result.data.pr_cat,
              mode : "update",
              newDataFunc : newData,
              isAbleDelete : false,
            } 
          })

          
        })
        

        // alert('sss');
      }, [dispatch]
    );

    return (<ProductCardWrapper className='product-card'>
      <ProductImageWrapper 
        onClick={onClick} 
      >
        <Image url={image} className='product-image' style={{ position: 'relative' }} alt={title}/>
        {discountInPercent ? (<>
            <DiscountPercent>{discountInPercent}%</DiscountPercent>
          </>) : ('')}
      </ProductImageWrapper>
      <ProductInfo>
        <h3 className='product-title'>{title}</h3>
        <span className='product-weight'>{weight > 0 ? "In Stock " + weight : "Ready Stock"} 
        {isAdmin || isOwner ? 
          <>
          <Button 
            title='' 
            icon={<EditSVG />}
            intlButtonId='addCartButton' 
            iconPosition='left' 
            colors='primary' 
            size='small' 
            variant='outlined' 
            className='cart-button' 
            style={{
              "width": "18px",
              "height": "18px",
              "padding-left" : "20px",
              "padding-right" : "20px",
            }}
            onClick={() => onClickEdit(PID)}
          />
          <Button 
            title='' 
            icon={<CopySVG />}
            intlButtonId='addCartButton' 
            iconPosition='left' 
            colors='primary' 
            size='small' 
            variant='outlined' 
            className='cart-button' 
            style={{
              "width": "18px",
              "height": "18px",
              "padding-left" : "0px",
              "padding-right" : "0px",
            }}
            onClick={() => onClickCopy(PID)}
          />
          
          </>
        : null}
        </span>
        <div className='product-meta'>
          <div className='productPriceWrapper'>
            {discountInPercent ? (<span className='discountedPrice'>
                {price}{' '}
                {currency}
              </span>) : ('')}

            <span className='product-price'>
              {salePrice ? salePrice : price}{' '}
              {currency}
            </span>
          </div>

          {quantity <= 0 ? (<Button title='ซื้อเลย' intlButtonId='addCartButton' iconPosition='left' colors='primary' size='small' variant='outlined' className='cart-button' icon={<CartIcon />} onClick={e => handleClick(e)}/>) : 
          (<InputIncDec 
              value={quantity} 
              onClick={(e) => {
                e.stopPropagation(onclick);
              }} 
              onUpdate={(value, e) => handleUpdate(value, e)}
            />
          )}
        </div>
      </ProductInfo>
    </ProductCardWrapper>);
};
export default ProductCard;

import Currency from 'currency.js';
import React, { useState, useReducer } from 'react';
import { getLocalState, setLocalState } from '../../helper/localStorage';
import { cartAnimation } from '../../helper/utility';
import { CartContext } from './cart.context';
const initialState = {
    isOpen: false,
};
function reducer(cartState, action) {
    console.log("action");
    console.log(action);
    switch (action.type) {
        case 'TOGGLE':
            return {
                ...cartState,
                isOpen: !cartState.isOpen,
            };
        default:
            return cartState;
    }
}
// const getCartProducts = () => {
//     const products = getLocalState('cart');
//     return products ? products : [];
// };
// const getTotalPrice = () => {
//     const price = getLocalState('totalPrice');
//     return price ? price : 0;
// };
const getCoupon = () => {
    const coupon = getLocalState('coupon');
    if (coupon)
        return coupon;
    return {
        id: 0,
        code: 'DEFAULT_COUPON',
        discountInPercent: 0,
    };
};
const getDiscount = () => {
    const discount = getLocalState('discount');
    return discount ? discount : 0;
};
export const CartProvider = (props) => {

    const [ cartLocalType, setCartLocalType ] = useState("");
    const [ totalPriceLocalType, setTotalLocalType ] = useState("");
    const [cartState, dispatch] = useReducer(reducer, initialState);
    const [products, setProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(9);
    const [subtotalPrice, setSubTotalPrice] = useState(0);
    const [coupon, setCoupon] = useState(getCoupon());
    const [discount, setDiscount] = useState(getDiscount());
    const setPrice = (coupon = getCoupon()) => {
        const price = calculateTotalPrice(products, coupon);
        // setLocalState('totalPrice', price);
        setLocalState(totalPriceLocalType, price);
        setTotalPrice(price);
    };

    const initialCartValue = (cart, totalPrice) => {

        const productsLocal = getLocalState(cart);

        const priceLocal = getLocalState(totalPrice);
        
        setCartLocalType(cart);
        setTotalLocalType(totalPrice);


        setProducts(productsLocal ? productsLocal : []);
        setTotalPrice(priceLocal ? priceLocal : 0)
        setSubTotalPrice(priceLocal ? priceLocal : 0)
    }

    const calculateTotalPrice = (products, coupon) => {
        let total = Currency(0);
        let finalTotal;
        products.forEach(product => {
            const quantity = product.quantity ? product.quantity : 1;
            const price = product.salePrice ? product.salePrice : product.price;
            const itemPrice = Currency(quantity).multiply(price);
            total = Currency(total).add(itemPrice);
        });
        finalTotal = Number(total.value);
        // setLocalState('subTotalPrice', finalTotal);
        setLocalState(totalPriceLocalType, finalTotal);
        setSubTotalPrice(finalTotal);
        if (coupon.discountInPercent) {
            const discount = (finalTotal * Number(coupon.discountInPercent)) / 100;
            setLocalState('discount', discount);
            setDiscount(discount);
            finalTotal = finalTotal - discount;
        }
        return finalTotal;
    };
    const add = (event, item) => {
        console.log("item.quantity------");
        console.log(item.quantity);
        // TODO: cookie storage
        if (products.length) {
            const index = products.findIndex(product => product.id === item.id);
            if (index !== -1) {
                // if product already available in the cart
                const product = products[index];
                const quantity = product.quantity ? product.quantity : 0;
                products[index] = { ...product, ...item, quantity: quantity + item.quantity }; // just increase the quantity
            }
            else {
                // if this product is not available in the cart

                console.log("item.quantity------");
                console.log(item.quantity);
                if(item.quantity > 1){
                    products.push({ ...item, quantity: item.quantity });
                }
                else{
                    products.push({ ...item, quantity: 1 });
                }
            }
        }
        else {
            // if the cart is empty
            // products.push({ ...item, quantity: 1 });
            if(item.quantity > 1){
                products.push({ ...item, quantity: item.quantity });
            }
            else{
                products.push({ ...item, quantity: 1 });
            }
        }
        if(cartLocalType === 'cart'){
            cartAnimation(event);
        }
        
        // setLocalState('cart', products);
        setLocalState(cartLocalType, products);
        setProducts([...products]); // have to use the shallow copy [...products]
        setPrice();
    };
    const addCoupon = (coupon) => {
        setLocalState('coupon', coupon);
        setCoupon(coupon);
        setPrice(coupon);
    };
    const removeCoupon = () => {
        setLocalState('coupon', {
            id: 0,
            code: 'DEFAULT_COUPON',
            discountInPercent: 0,
        });
        setLocalState('discount', 0);
        setCoupon({
            id: 0,
            code: 'DEFAULT_COUPON',
            discountInPercent: 0,
        });
        setPrice({
            id: 0,
            code: 'DEFAULT_COUPON',
            discountInPercent: 0,
        });
    };
    const update = (itemId, quantity) => {
        const index = products.findIndex(product => product.id === itemId);
        if (quantity < 1 && index > -1) {
            // delete if quantity, 0
            products.splice(index, 1);
        }
        else {
            // update quanity
            const product = products[index];
            products[index] = { ...product, quantity };
        }
        // setLocalState('cart', products);
        setLocalState(cartLocalType, products);
        setProducts([...products]);
        if (!products.length) {
            setLocalState('coupon', {
                id: 0,
                code: 'DEFAULT_COUPON',
                discountInPercent: 0,
            });
            setLocalState('discount', 0);
            setDiscount(0);
            setCoupon({
                id: 0,
                code: 'DEFAULT_COUPON',
                discountInPercent: 0,
            });
        }
        setPrice();
    };
    const clearCart = () => {
        // setLocalState('cart', []);
        setLocalState(cartLocalType, []);
        setProducts([]);
        setLocalState('discount', 0);
        setDiscount(0);
        setCoupon({
            id: 0,
            code: 'DEFAULT_COUPON',
            discountInPercent: 0,
        });
        setLocalState('coupon', {
            id: 0,
            code: 'DEFAULT_COUPON',
            discountInPercent: 0,
        });
        // setPrice();
        // setLocalState('totalPrice', 0);
        setLocalState(totalPriceLocalType, 0);
        setTotalPrice(0);
        setLocalState('subTotalPrice', 0);
        setSubTotalPrice(0);
    };
    return (<CartContext.Provider value={{
        cartState,
        dispatch,
        products,
        add,
        update,
        totalPrice,
        addCoupon,
        coupon,
        discount,
        removeCoupon,
        subtotalPrice,
        clearCart,
        initialCartValue
    }}>
      {props.children}
    </CartContext.Provider>);
};

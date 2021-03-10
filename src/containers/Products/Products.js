import React, { useEffect, useState, useContext }  from 'react';
import dynamic from 'next/dynamic';
import { openModal, closeModal } from '@redq/reuse-modal';
import ProductCard from '../../components/ProductCard/ProductCard';
import { ProductsRow, ProductsCol, ButtonWrapper, LoaderWrapper, LoaderItem, ProductCardWrapper, } from './Products.style';
import { CURRENCY } from '../../helper/constant';
import Placeholder from '../../components/Placeholder/Placeholder';
import Fade from 'react-reveal/Fade';
import axios from "axios";
import NoResultFound from '../../components/NoResult/NoResult';
import { createGlobalStyle } from 'styled-components';
import InfiniteScroll from 'react-infinite-scroller';
import ProductsContext from '../../contexts/products/products.context';
import {getProductList} from '../../API';
import store from "store";

const QuickView = dynamic(() => import('../QuickView/QuickView'));

const QuickViewStyle = createGlobalStyle `

.reuseModalHolder {
	max-width: 418px;
    max-height: 607px;
    width: 900px;
    height: auto;
    left: 20px;
    top: 0;
    transform: scale(1);
    position: fixed;
    overflow: auto;
}


`;

export const Products = ({match, deviceType, type, fetchLimit = 8, loadMore = true, isSearchProp} ) => {


    const user = store.get("user");

    const error = undefined;
    const fetchMore = false;

    //const [loading, setLoading] = useState(true);
    
    //const [startItems, setStartItems] = useState(0);

    const [isSearching, setIsSearching] = useState(false);

    
    const { searchValue, data, newData, loading, addData, startItems} = useContext(ProductsContext);

    /*
    const { data, error, loading, fetchMore } = useQuery(GET_PRODUCTS, {
        variables: {
            type: type,
            text: "AAA",
            category: "BBB",
            offset: 0,
            limit: fetchLimit,
        },
    });*/

     {
      // You can await here
    }

    async function setData(){
      let url=`https://i-sabuy.xyz/warehouse/ajax/product.php?token=67jok8ynapac6l121440312&start=`+startItems;
      //match.params.redirectParam
      //console.log("url : " + url);
      //console.log(match.params.productOwner);
      let result = await newData(match.params.productOwner, "");
      
      //console.log("result", result);
      //setLoading(false);
    }

    useEffect(() => {
      setData();

    }, []);



    // Quick View Modal
    const handleModalClose = () => {
        /*const href = `${router.pathname}`;
        const as = '/';
        router.push(href, as, { shallow: true });*/
        closeModal();
    };
    const handleQuickViewModal = React.useCallback((modalProps, deviceType, onModalClose, PID) => {
        /*if (router.pathname === '/product/[slug]') {
            const as = `/product/${modalProps.slug}`;
            router.push(router.pathname, as);
            return;
        }*/
        openModal({
            show: true,
            overlayClassName: 'quick-view-overlay',
            closeOnClickOutside: true,
            component: QuickView,
            componentProps: { modalProps, deviceType, onModalClose, match, PID,  },
            closeComponent: 'div',
            config: {
                enableResizing: false,
                disableDragging: true,
                className: 'quick-view-modal',
                width: 900,
                y: 30,
                height: 'auto',
                transition: {
                    mass: 1,
                    tension: 0,
                    friction: 0,
                },
            },
        });
        /*const href = `${router.pathname}?${modalProps.slug}`;
        const as = `/product/${modalProps.slug}`;
        router.push(href, as, { shallow: true });*/
    }, []);

    if (loading) {
        return (<LoaderWrapper>
        <LoaderItem>
          <Placeholder />
        </LoaderItem>
        <LoaderItem>
          <Placeholder />
        </LoaderItem>
        <LoaderItem>
          <Placeholder />
        </LoaderItem>
      </LoaderWrapper>);
    }
    if (error)
        return <div>{error.message}</div>;
    if (!data || !data.products || data.products.items.length === 0) {
        return <NoResultFound />;
    }
    /*
    const handleLoadMore = () => {
        fetchMore({
            variables: {
                offset: Number(data.products.items.length),
                limit: fetchLimit,
            },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) {
                    return prev;
                }
                return {
                    products: {
                        __typename: prev.products.__typename,
                        items: [...prev.products.items, ...fetchMoreResult.products.items],
                        hasMore: fetchMoreResult.products.hasMore,
                    },
                };
            },
        });
    };*/

    async function loadFunc (){
      let url= '';

      let params = '';
      if(searchValue != '' && searchValue != undefined){
        params=`?start=`+startItems+`&keyword=`+searchValue;
      }
      else{
        params=`?start=`+startItems;
      }

      //await newData(match.params.productOwner);
      //await addData(url);
      let result = await addData(match.params.productOwner, params);
      //console.log(result);
      //updateData();
    }

    // console.log("data------");
    // console.log(data);

    return (<>
    <InfiniteScroll
    pageStart={0}
    loadMore={loadFunc}
    hasMore={data.hasMore}
    loader={<div className="loader" key={0}></div>}
    >
      <ProductsRow>
        {data.products.items.map((item, index) => (
        <ProductsCol key={index}>
          <QuickViewStyle />
            <ProductCardWrapper>
              <Fade duration={800} delay={index * 10} style={{ height: '100%' }}>
                <ProductCard 
                  title={item.title} 
                  description={item.description} 
                  image={item.image} 
                  weight={item.unit} 
                  currency={CURRENCY} 
                  price={item.price} 
                  salePrice={parseInt(item.salePrice)} 
                  discountInPercent={item.discountInPercent} 
                  data={item} 
                  productOwner={match.params.productOwner}
                  deviceType={deviceType} 
                  onClick={() => handleQuickViewModal(item, deviceType, handleModalClose, item.id)}
                  PID={item.id}
                  isAdmin={user && user.amrole === "Admin"}
                  isOwner={user && user.amrole === "Owner"}
                />
              </Fade>
            </ProductCardWrapper>
          </ProductsCol>))}
      </ProductsRow>
      </InfiniteScroll>
      {/*loadMore && data.products.hasMore && (<ButtonWrapper>
          <Button onClick={handleLoadMore} title='Load More' intlButtonId='loadMoreBtn' size='small' isLoading={loadingMore} loader={<Loader color='#009E7F'/>} style={{
        minWidth: 135,
        backgroundColor: '#ffffff',
        border: '1px solid #f1f1f1',
        color: '#009E7F',
    }}/>
  </ButtonWrapper>)*/}
    </>);
};
export default Products;

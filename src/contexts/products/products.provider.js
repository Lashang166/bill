import React, { useEffect, useState } from 'react';
import ProductsContext from './products.context';
import axios from "axios";
import { getLocalState, setLocalState } from '../../helper/localStorage';
import { getProductList, apiServerImg } from '../../API';
import { AlertDotIcon } from '../../components/AllSvgIcon';



const getData = () => {
  const data = getLocalState('data');
  return data ? data : [];
};

const getUrl = () => {
  const url = getLocalState('url');
  return url ? url : [];
};


const getSwitchEnableProduct = () => {
  const enable = getLocalState('switchEnableProduct');
  return enable !== undefined ? enable : false;
};



export const ProductsProvider = (props) => {

    // const [data, setData] = useState(getData());
    const [data, setData] = useState([]);
    const [searchValue, setSearchValue] = useState();
    const [startItems, setStartItems] = useState(0);
    const [loading, setLoading] = useState(true);
    const [url, setUrl] = useState(getUrl());
    const [isMore, setIsMore] = useState(true);



    const user = getLocalState('user');

    const [ isShowAll, setIsShowAll ] = useState(user && (user.amrole !== 'Admin' && user.amrole !== 'Owner') ? false : getSwitchEnableProduct());




    async function newData(name, param, isShowInput = null){

      //setUrl(url);
      // if(startItems === 0 ) {setStartItems(0);}
      setStartItems(0);

      let tempNewData = {};

      let params = {
        amcode : name
      }

      //const result = await axios.get(url).then( result => {

      let tempIsShow = isShowInput !== null ? isShowInput : isShowAll;

      setLocalState('switchEnableProduct', tempIsShow);

      const result = await getProductList(params, param).then( result => {
        console.log("result--------getProductList");
        console.log(result);

        let items = {};

        let count = 0;

        let hasMore = true;

        if(result.data.data.length < 20){ hasMore = false}

        const resultFilter = result.data.data.filter((row) => ( tempIsShow || parseInt(row.Enable) === 1));

        
        const newData = resultFilter.map((row) => {

          count=count+1;
          let imageList = row.ProductImageUrl.ImgOriginal.map((image) => {
            
            
            return {url : apiServerImg+image};
          })
  
          items = {
              id: row.PID,
              title: row.Title,
              slug: "banana",
              unit: row.InStock,
              SKU: row.SKU,
              price: row.MRSP,
              salePrice: row.PricePerUnit,
              description: row.ProdDesc,
              //discountInPercent: 0,
              type: "grocery",
              image: apiServerImg+"/"+row.ProductImageUrl.image,
              discountInPercent: parseFloat(row.DiscountPercent) !== 0 ? row.DiscountPercent : undefined,
              //discountInPercent: row.PricePercet,
              /*gallery : [{
                url : apiServerImg+"/"+row.ProductImageUrl.image,
                url : apiServerImg+"/"+"img/sc_prod/5432/5433-1.jpg"
              }]*/
              gallery : imageList
          }
  
        return {...items}
        })

        tempNewData = {
          products : {
            items : newData,
            length : count
          },
          hasMore : hasMore
        }


        setData({...tempNewData});
        setLoading(false);
        setLocalState('data', data);
        setStartItems(20);

      });

    }

    const addData = async (name, param) => {
      
      let tempNewData = {};

      let callURL=url+startItems;

      let params = {
        amcode : name
      }


      //const result = await axios.get(url).then( result => {
      console.log("getProductList--------------param");
      console.log(param);
      if(startItems === 0) return;
      
      if(data.hasMore){

      
      const result = await getProductList(params, param).then( result => {

        //const result = axios.get(params, param).then( result => {


        if(result.data.data.length === 0) {
          setIsMore(false)  


          tempNewData = {
            /*products : {
              items : newData,
              length : count
            },*/
            ...data,
            hasMore : false
          }
  
          setData(tempNewData);
          setLoading(false);
          setLocalState('data', data);
          return ;
        }
        let items = {};

        let count = 0;

        count=data.products.length;
        
        console.log(result);
        setLocalState('switchEnableProduct', isShowAll);
        const resultFilter = result.data.data.filter((row) => (isShowAll || parseInt(row.Enable) === 1));
  
        const newData = resultFilter.map((row) => {
          count=count+1;

          /*let imageList = row.ProductImageUrl.map((image) => {
            return image.image;
          })*/

          
          let imageList = row.ProductImageUrl.ImgOriginal.map((image) => {
            //console.log(image)
            return {url : apiServerImg+image};
          })

  
          //let imageList = [];
          items = {
            id: row.PID,
            title: row.Title,
            slug: "banana",
            unit: row.InStock,
            SKU: row.SKU,
            price: row.MRSP,
            salePrice: row.PricePerUnit,
            description: row.ProdDesc,
            //discountInPercent: 0,
            type: "grocery",
            image: apiServerImg+"/"+row.ProductImageUrl.image,
            discountInPercent: parseFloat(row.DiscountPercent) !== 0 ? row.DiscountPercent : undefined,
            //discountInPercent: row.PricePercet,
            /*gallery : [{
              url : apiServerImg+"/"+row.ProductImageUrl.image
            },{
              url : apiServerImg+"/"+"img/sc_prod/5432/5433-1.jpg"
            }]*/
            gallery : imageList
        }

        return {...items}
        })

        tempNewData = {
          products : {
            items : [...data.products.items, ...newData],
            length : count
          },
          hasMore : true
        }

        setData(tempNewData);
        setLoading(false);
        setLocalState('data', data);
        setStartItems(startItems+20);
  
          
      });
    }

    }

    const addSingleProduct = (newData) => {

      // if(isShowAll || parseInt(newData.Enable) === 1){

      //   let tempData = data;

      //   tempData.products.items = [
      //     ...tempData.products.items,
      //     newData
      //   ]
      //   console.log(tempData);

      //   // setData([{...tempData, newData}]);
      // }

    }

    const setDataWithAmount = (inputData) => {

      console.log(inputData);
      //let tempData = inputData.filter();;

      
    }
    
    return (<ProductsContext.Provider value={{
        data,
        searchValue,
        setSearchValue,
        newData,
        addData,
        loading,
        startItems,
        isShowAll,
        setIsShowAll,
        addSingleProduct,
    }}>
      {props.children}
    </ProductsContext.Provider>);
};

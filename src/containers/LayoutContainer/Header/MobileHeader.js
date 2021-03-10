import React, { useState, useContext, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { openModal, closeModal } from '@redq/reuse-modal';
import store from "store";
//import { DrawerProvider } from '../../../contexts/drawer/drawer.provider';
import Popover from '../../../components/Popover/Popover';
//import MobileDrawer from '../../../MobileDrawer';
import {SearchViewStyle, MobileHeaderWrapper, MobileHeaderInnerWrapper, DrawerWrapper, LogoWrapper, SearchWrapper, SearchModalWrapper, SearchModalClose, Logo, SelectedLang, LanguageItem, LangSwithcer, Flag, } from './Header.style';
import { FormattedMessage } from 'react-intl';
import SearchBox from '../../../components/SearchBox/SearchBox';
import { SearchContext } from '../../../contexts/search/search.context';
import { DrawerContext } from '../../../contexts/drawer/drawer.context';
//import Logoimage from 'image/logo.svg';
//import { HOME_PAGE, GROCERY_PAGE, MAKEUP_PAGE, CLOTHING, BAGS_PAGE, FURNITURE_PAGE, BOOK_PAGE, } from '../../../constants/navigation';
import LanguageContext from '../../../contexts/language/language.context';
import ProductsContext from '../../../contexts/products/products.context';
import { SearchIcon, LongArrowLeft, DEFlag, CNFlag, USFlag, ILFlag, ESFlag, SAFlag, AlertDotIcon, } from '../../../components/AllSvgIcon';
import {Redirect} from 'react-router-dom';
import MobileDrawer from '../../../containers/LayoutContainer/Header/MobileDrawer';
import { useDrawerDispatch } from '../../../contexts/drawerProduct/DrawerContext';
// import Drawer, { ANCHOR } from '../../../components/DrawerProducts/DrawerProduct';
import { Drawer, SIZE, ANCHOR } from 'baseui/drawer';


const LanguageArray = [
    { id: 'ar', label: 'Arabic', intlLangName: 'intlArabic', icon: <SAFlag /> },
    { id: 'zh', label: 'Chinese', intlLangName: 'intlChinese', icon: <CNFlag /> },
    { id: 'en', label: 'English', intlLangName: 'intlEnglish', icon: <USFlag /> },
    { id: 'de', label: 'German', intlLangName: 'intlGerman', icon: <DEFlag /> },
    { id: 'he', label: 'Hebrew', intlLangName: 'intlHebrew', icon: <ILFlag /> },
    { id: 'es', label: 'Spanish', intlLangName: 'intlSpanish', icon: <ESFlag /> },
];
const SearchModal = ({ state, pathname, handleSearch, }) => {

    //const text = 'AAAA';
  
    const router = useRouter();
    const [text, setText] = useState(state.text || '');

    const handleSearchInput = (text) => {
        setText(text);
    };
    //const { page, ...urlState } = state;
    const handleClickSearchButton = () => {
        handleSearch(text);
        /*router.push({
            pathname: '/productList?search='+ text,
            query: {
                ...urlState,
                text,
            },
        });*/
        
        closeModal();
    };
    return (<SearchModalWrapper>
      <SearchModalClose type='submit' onClick={() => closeModal()}>
        <LongArrowLeft />
      </SearchModalClose>
      <SearchBox 
        className='header-modal-search' 
        bordered={false} 
        inputStyle={{ height: 35 }} 
        buttonText='' 
        placeholder='Search' 
        handleSearch={handleSearchInput}
        value={text} 
        onClick={handleClickSearchButton}
      />
    </SearchModalWrapper>);
    
};

const MobileHeader = props => {
    //const { state: { lang }, toggleLanguage, } = useContext(LanguageContext);
    const lang = 'th';
    const { state, dispatch } = useContext(SearchContext);
    const { className, pathname, closeSearch } = props;
    const selectedLangindex = LanguageArray.findIndex(x => x.id === lang);
    const [ isClickSearch, setIsClickSearch ] = useState(false);
    //const [ searchValue, setSearchValue ] = useState();

    //const [ headerName, setHeaderName ] = useState();
    const { data, searchValue, setSearchValue, newData, setUr } = useContext(ProductsContext);
    const { getHeaderName, headerName } = useContext(DrawerContext);
    

    const [ tempIsOpen, setTempIsOpen ] = useState(false);
    
    const dispatchAddProduct = useDrawerDispatch();
    const openDrawer = useCallback(
      () => {
        // console.log("dispatchAddProduct-----");
        // console.log(dispatchAddProduct);
        dispatchAddProduct({ 
          type: 'OPEN_DRAWER', 
          drawerComponent: 'PRODUCT_FORM', 
          data : { 
            productOwner : props.match.params.productOwner
          }
        })
        // alert('sss');
      }, [dispatch]
    );


    const user = store.get("user");
    let value = '';

    useEffect(() => {
      getHeaderName(props.match.params.productOwner);
    }, []); 

    async function handleSearch (text){

      //console.log("text", text);
      value = text;

      let url=`https://i-sabuy.xyz/warehouse/ajax/product.php?token=67jok8ynapac6l121440312&start=0&keyword=`+text;

      //newData(url);
      let result = await newData(props.match.params.productOwner, `?start=0&keyword=`+text);
      setSearchValue(text);

      //etSearchValue(text);
      //renderProductListWithSearchValue(text);
      //setIsClickSearch(true);
        /*dispatch({
            type: 'UPDATE',
            payload: {
                ...state,
                text,
            },
        });*/
    };
    const handleSearchModal = () => {
      //console.log(openModal);
        openModal({
            show: true,
            config: {
                enableResizing: false,
                disableDragging: true,
                className: 'search-modal-mobile',
                width: '100%',
                height: '15%',
                y: 30,
            },
            
            closeOnClickOutside: true,
            component: SearchModal,
            componentProps: { state, pathname, handleSearch },
            closeComponent: () => <div />,
        });
    };
    
    /*
    const handleToggleLanguage = e => {
        toggleLanguage(e.target.value);
        console.log(e.target.value, 'switcher');
    };
    const LanguageMenu = (item) => {
        return (<LanguageItem onClick={handleToggleLanguage} key={item.id} value={item.id}>
        <span>{item.icon}</span>
        <FormattedMessage id={item.intlLangName} defaultMessage={item.label}/>
      </LanguageItem>);
    };*/
    const isHomePage = true;

    const onClickHeader = () => {
      newData(props.match.params.productOwner, "");
      setSearchValue("");
      window.scrollTo(0, 0);
    }


    if(isClickSearch){

      return(
        <Redirect 
          to={`/productList/${searchValue}`}
        />
      )
      
    }

    return (
    <>
    {/*<DrawerProvider>*/}
        <MobileHeaderInnerWrapper className={className}>
          <DrawerWrapper>
            {/* {user && user.amcode === props.match.params.productOwner ?  */}
            {user && (user.amrole === 'Admin' || user.amrole === 'Owner') ?
              <MobileDrawer 
                productOwner={props.match.params.productOwner}
              />
            : null
            }
          </DrawerWrapper>

          <LogoWrapper>
            <Logo onClick={onClickHeader}>
              {/*<Link >
                <a>
                  <img src={Logoimage} alt='pickbazar-admin'/>
                </a>
              </Link>*/}
              {//getHeaderName(props.match.params.productOwner)}
              }
              {headerName}
            </Logo>
          </LogoWrapper>
{/*
          <LangSwithcer>
            <Popover className='right' handler={<SelectedLang>
                  <Flag style={{ margin: 0 }}>
                    {LanguageArray[selectedLangindex].icon}
                  </Flag>
                </SelectedLang>} content={<>{LanguageArray.map(LanguageMenu)}</>}/>
          </LangSwithcer>
*/}

          {user && (user.amrole === 'Admin' || user.amrole === 'Owner') ?
            // <Button onClick={openDrawer}>Add Products</Button>
              <button
                className="button is-primary is-margin"
                onClick={openDrawer}
                // onClick={() => {setTempIsOpen(true)}}
                // style={{ 'margin-top': '10px'}}
              >เพิ่มสินค้า</button>
          : null}
          <SearchWrapper onClick={handleSearchModal} className='searchIconWrapper'>
              <SearchIcon />
            </SearchWrapper>
        </MobileHeaderInnerWrapper>
    {/* </DrawerProvider> */}
    </>
    );
};
export default MobileHeader;

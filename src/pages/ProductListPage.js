/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { IntlProvider } from 'react-intl';
import { Modal, openModal, closeModal } from '@redq/reuse-modal';
import Products from '../containers/Products/Products';
import CartPopUp from '../containers/Cart/CartPopUp';
import { withApollo } from '../helper/apollo';
import {
  MainContentArea,
  ContentSection,
} from '../styled/pages.style';
// Static Data Import Here
import dynamic from 'next/dynamic';
import {NotificationContainer} from 'react-notifications';

import {CartProvider} from "../contexts/cart/cart.provider";
import { useStickyState } from '../contexts/app/app.provider';
import Sticky from 'react-stickynode';
import { SearchProvider } from "../contexts/search/search.provider";
import { ProductsProvider } from "../contexts/products/products.provider";
import { DrawerProvider } from '../contexts/drawer/drawer.provider';
import { loadGetInitialProps } from "next/dist/next-server/lib/utils";
import MobileHeader from '../containers/LayoutContainer/Header/MobileHeader';
import DrawerItems from '../containers/DrawerProduct/DrawerItems';

const PAGE_TYPE = 'grocery';
const deviceType = {
  mobile: true, tablet: false, desktop: false
};

/*const MobileHeader = dynamic(() => import('../containers/LayoutContainer/Header/MobileHeader'), {
  ssr: true,
});*/

function ProductListPage({match}) {

  const isSticky = true;
  const isHomePage = true;
  return (
    <div className="container">
    <DrawerProvider>
    <CartProvider>
    <SearchProvider>
    <ProductsProvider>
    <IntlProvider locale="en">
      <Modal>
          <MobileHeader
                className={`${isSticky ? 'sticky' : 'unSticky'} ${isHomePage ? 'home' : ''}`}
                match={match}
          />
          <MainContentArea>
          
            <ContentSection style={{ width: '100%' }}>
              
              <Products
                type={PAGE_TYPE}
                deviceType={deviceType}
                fetchLimit={16}
                match={match}
              />
            </ContentSection>
          </MainContentArea>
          
        <CartPopUp deviceType={deviceType} owner={match.params.productOwner}
          localVariable={{ cart : 'cart', totalPrice : 'totalPrice'}}
        />

        <DrawerItems />
      </Modal>
    </IntlProvider>
    </ProductsProvider>
    </SearchProvider>
    </CartProvider>
    </DrawerProvider>
    </div>
  );
}

export default withApollo(ProductListPage);
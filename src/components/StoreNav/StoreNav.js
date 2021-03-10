import React from 'react';
import NavLink from '../NavLink/NavLink';
import StoreNavWrapper, { StoreNavLinks } from './StoreNav.style';
const StoreNav = ({ className, items = [], }) => {

    console.log(items);

    return (<StoreNavWrapper className={className}>
      <StoreNavLinks>
        {/*items.map((item, index) => (<NavLink className='store-nav-link' href={item.link} label={item.label} icon={item.icon} key={index}/>))*/}
        
      </StoreNavLinks>
    </StoreNavWrapper>);
};
export default StoreNav;

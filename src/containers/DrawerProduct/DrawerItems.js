import React, { useCallback, useContext, useState } from "react";
import { styled } from "baseui";
import Drawer from "../../components/DrawerProducts/DrawerProduct";
// import { CloseIcon } from 'assets/icons/CloseIcon';
import {
  useDrawerState,
  useDrawerDispatch,
} from "../../contexts/drawerProduct/DrawerContext"; //'../context/DrawerContext';
/** Drawer Components */
import ProductForm from "../../containers/ProductForm/ProductForms";
import { AlertDotIcon } from "../../components/AllSvgIcon";
import ProductsContext from "../../contexts/products/products.context";
// import ProductUpdateForm from '../ProductForm/ProductUpdateForm';
// import CampaingForm from '../CampaingForm/CampaingForm';
// import CategoryForm from '../CategoryForm/CategoryForm';
// import StaffMemberForm from '../StaffMemberForm/StaffMemberForm';
// import Sidebar from '../Layout/Sidebar/Sidebar';
/** Components Name Constants */
const DRAWER_COMPONENTS = {
  PRODUCT_FORM: ProductForm,
  // PRODUCT_UPDATE_FORM: ProductUpdateForm,
  // CAMPAING_FORM: CampaingForm,
  // CATEGORY_FORM: CategoryForm,
  // STAFF_MEMBER_FORM: StaffMemberForm,
  // SIDEBAR: Sidebar,
};

const CloseButton = styled("button", ({ $theme }) => ({
  ...$theme.typography.fontBold14,
  color: $theme.colors.textNormal,
  lineHeight: 1.2,
  outline: "0",
  border: "none",
  padding: "0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "absolute",
  top: "10px",
  left: "-30px",
  right: "auto",
  cursor: "pointer",
  backgroundColor: "#ffffff",
  width: "20px",
  height: "20px",
  borderRadius: "50%",

  "@media only screen and (max-width: 767px)": {
    left: "auto",
    right: "30px",
    top: "29px",
  },
}));

export default function DrawerItems() {
  const isOpen = useDrawerState("isOpen");
  const drawerComponent = useDrawerState("drawerComponent");
  const data = useDrawerState("data");
  const dispatch = useDrawerDispatch();
  const closeDrawer = useCallback(() => dispatch({ type: "CLOSE_DRAWER" }), [
    dispatch,
  ]);
  if (!drawerComponent) {
    return null;
  }
  const SpecificContent = DRAWER_COMPONENTS[drawerComponent];
  // const { newData } = useContext(ProductsContext);

  const onClose = () => {
    if (data.mode && data.mode === "update") {
    }
    closeDrawer();
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      overrides={{
        Root: {
          style: {
            // zIndex: DRAWER_COMPONENTS[drawerComponent] ===
            //     DRAWER_COMPONENTS.STAFF_MEMBER_FORM
            //     ? 0
            //     : 2,
            zIndex: 999,
            // 'position' : 'fixed',
          },
        },
        DrawerBody: {
          style: {
            marginTop: "80px",
            marginLeft: "60px",
            marginRight: "60px",
            marginBottom: "30px",
            "@media only screen and (max-width: 767px)": {
              marginTop: "80px",
              marginLeft: "30px",
              marginRight: "30px",
              marginBottom: "30px",
            },
          },
        },
        DrawerContainer: {
          style: {
            width: "80%",
            // backgroundColor: '#f7f7f7',
            "@media only screen and (max-width: 767px)": {
              width: "100%",
            },
          },
        },
        Close: {
          component: () => (
            <CloseButton onClick={onClose}>
              {/* <CloseIcon width="6px" height="6px"/> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 10.003 10"
                width="6px"
                height="6px"
              >
                <path
                  data-name="_ionicons_svg_ios-close (5)"
                  d="M166.686,165.55l3.573-3.573a.837.837,0,0,0-1.184-1.184l-3.573,3.573-3.573-3.573a.837.837,0,1,0-1.184,1.184l3.573,3.573-3.573,3.573a.837.837,0,0,0,1.184,1.184l3.573-3.573,3.573,3.573a.837.837,0,0,0,1.184-1.184Z"
                  transform="translate(-160.5 -160.55)"
                  fill="currentColor"
                />
              </svg>
            </CloseButton>
          ),
        },
      }}
    >
      <SpecificContent onClose={onClose} data={data} />
    </Drawer>
  );
}

import React, { Component } from "react";
// import logo from "./logo.svg";
// import "./App.css";
import Routes from "./routes";
import { theme } from './theme';
import {NotificationContainer} from 'react-notifications';
import { BillInfoProvider }  from "./contexts/billInfo/billInfo.provider";
import { SelectedProductEditProvider } from "./contexts/selectedProductEdit/SelectedProductEdit.provider";
import { BaseProvider } from 'baseui';
import { DrawerProvider } from './contexts/drawerProduct/DrawerContext';
// import { DrawerProvider } from './contexts/drawerProduct/DrawerContext';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';

class App extends Component {
  render() {
    // console.log(Routes);
    const engine = new Styletron();
    return (
      <SelectedProductEditProvider>
      <BillInfoProvider>
      <StyletronProvider value={engine}>
      <BaseProvider theme={theme}>
      {/* <DrawerProvider> */}
        <Routes />
        <NotificationContainer/>
      {/* </DrawerProvider> */}
      </BaseProvider>
      </StyletronProvider>
      </BillInfoProvider>
      </SelectedProductEditProvider>
    );
  }
}

export default App;

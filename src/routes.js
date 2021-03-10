import React, { Component } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Loadable from "react-loadable";
import Loading from "./components/Loading";

// import BillPage from "./pages/BillPage";
import ErrorPage from "./pages/ErrorPage";
import TestPage from './pages/TestPage';
import LoginPage from './pages/LoginPage';
import LogoutPage from './pages/LogoutPage';




const BillPage = Loadable({
  loader: () => import("./pages/BillPage"),
  loading: Loading
});
const BillPageEdit = Loadable({
  loader: () => import("./pages/BillPageEdit"),
  loading: Loading
});
const BillsListPage = Loadable({
  loader: () => import("./pages/BillsListPage"),
  loading: Loading
});
const ProductListPage = Loadable({
  loader: () => import("./pages/ProductListPage"),
  loading: Loading
});
const BillPageSelect = Loadable({
  loader: () => import("./pages/BillPageSelect"),
  loading: Loading
});

const SaleProductPage = Loadable({
  loader: () => import("./pages/SaleProductPage"),
  loading: Loading
});

const EditSalePage = Loadable({
  loader: () => import("./pages/EditSalePage"),
  loading: Loading
});


export default class Routes extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/testpage" component={TestPage} />
          <Route path="/billList" component={BillsListPage} />
          {/*<Route path="/bill/:billId" component={BillPa} />
          <Route path="/billedit/:billId" component={BillPageEdit} />*/}
          
          <Route path="/bill/:billId" component={BillPageSelect} />
          <Route path="/billedit/:billId" component={BillPageSelect} />
          <Route path="/productList/editsalepage/:PID" component={EditSalePage} />
          <Route path="/productList/editsalepage" component={EditSalePage} />
          <Route path="/productList/:amcode/:PID" component={SaleProductPage} />
          <Route path="/productList/:productOwner" component={ProductListPage} />
          {/*<Route path="/:billType/:billId" component={BillPageSelect} />*/}
          
          
          <Route path="/login" component={LoginPage} />
          <Route path="/logout" component={LogoutPage} />
          {/*<Route component={ErrorPage} />*/}
          <Route component={BillsListPage} />
        </Switch>
      </Router>
    );
  }
}

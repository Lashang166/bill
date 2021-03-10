import axios from "axios";
import store from "store";

export const apiServer = "https://bill.i-sabuy.com/Bill";
export const apiServer2 = "https://i-sabuy.com/warehouse/api";
export const apiServer3 = "https://i-sabuy.xyz/warehouse/api";
// https://i-sabuy.xyz/warehouse/api/product/get?pid=7643
export const apiServerImg = "https://www.i-sabuy.com";

axios.defaults.headers.common["Content-Type"] = "application/json";
// axios.defaults.headers["Cache-Control"] = "no-cache";
//axios.defaults.headers.common["Accept"] = "*/*";
//axios.defaults.headers.common["Accept-Encoding"] = "gzip, deflate, br";
//axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
//axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    const token = store.get("user");

    if (token && token.amtk != null) {
      config.headers = { "x-access-token": token.amtk };
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export const getUser1 = async (params) => {
  return await axios.post(`${apiServer}/ci-api/bills/getUser`, params);
};

export const loadRecord = async (params) => {
  return await axios.get(`${apiServer}/ci-api/bills/loadRecord`, params);
};

export const getbill1 = async (billId) => {
  return await axios.get(`${apiServer}/ci-api/bills/getBill/${billId}`);
};

export const update1 = async (params) => {
  return await axios.post(`${apiServer}/ci-api/bills/update`, params);
};

export const updateStatus1 = async (params) => {
  return await axios.post(`${apiServer}/ci-api/Bills/updateStatus`, params);
};

export const createBill1 = async (params) => {
  return await axios.post(`${apiServer}/ci-api/bills/createBill`, params);
};

export const upload1 = async (params) => {
  return await axios.post(`${apiServer}/ci-api/fileman/upload`, params);
};

export const lineNotifCheckOut = async (params) => {
  return await axios.post(`${apiServer}/ci-api/Bills/LineNotifyCart`, params);
  //return await axios.post(`${apiServer}/ci-api/Bills/LineNotifyCart`, params);
};

export const lineNotifConfirmPayment = async (params) => {
  return await axios.post(
    `${apiServer}/ci-api/Bills/LineNotifyPayment`,
    params
  );
  //return await axios.post(`${apiServer}/ci-api/Bills/LineNotifyCart`, params);
};

export const getbill2 = async (params) => {
  return await axios.get(`${apiServer2}/bill/getbill`, params);
};
/*
export const getbill2 = async () => {
    return await axios.get(`${apiServer2}/bill/getbill`);
}*/

export const createbill2 = async (params) => {
  return await axios.post(`${apiServer2}/bill/createbill2`, params);
};

export const cancelbill2 = async (params) => {
  return await axios.post(`${apiServer2}/bill/cancelbill`, params);
};

export const searchProduct2 = async (searchdata) => {
  return await axios.get(
    `${apiServer2}/product/search?keyword=${searchdata}&timestamp=${new Date().getTime()}`
  );
};

export const searchOldCustomer = async (params) => {
  return await axios.post(`${apiServer2}/customer/oldcust`, params);
};

export const getProductList = async (params, url) => {
  return await axios.post(`${apiServer2}/page/product` + url, params);
};

export const getbillProductList = async (params) => {
  return await axios.post(`${apiServer2}/page/getbill`, params);
};

//mock API
export const updateSelectProduct_temp = async (params) => {
  const mockServer = "http://localhost:8000";
  return await axios.put(`${mockServer}/products2/1`, { data: params });
};

export const getSelectProduct_temp = async (params) => {
  const mockServer = "http://localhost:8000";
  return await axios.get(`${mockServer}/products2/1`, params);
};

export const getSelectProduct = async (params) => {
  console.log(
    "url",
    `${apiServer2}/product/get?amcode=${params.amcode}&pid=${
      params.PID
    }&timestamp=${new Date().getTime()}`
  );
  return await axios.get(
    `${apiServer2}/product/get?amcode=${params.amcode}&pid=${
      params.PID
    }&timestamp=${new Date().getTime()}`
  );
};

export const updateSelectProduct = async (params) => {
  return await axios.post(`${apiServer2}/product/salepage`, params);
};

export const AddProductData = async (params) => {
  return await axios.post(`${apiServer2}/product/add `, params);
};

export const editSelectProduct = async (params) => {
  return await axios.post(`${apiServer2}/product/edit`, params);
};

export const deleteSelectProduct = async (params) => {
  return await axios.post(`${apiServer2}/product/delete`, params);
};

export const uploadProductImage = async (params) => {
  return await axios.post(`${apiServer2}/product/upload`, params);
};

export const deleteSelectedCProductImage = async (params) => {
  console.log(params);
  return await axios.post(`${apiServer2}/product/imagedelete`, params);
};

export const setProductCoverImage = async (params) => {
  console.log(params);
  return await axios.post(`${apiServer2}/product/imagecover`, params);
};

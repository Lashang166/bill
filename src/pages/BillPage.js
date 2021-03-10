import React, { useState, useEffect, Fragment } from "react";
// import { Redirect } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";
import BillDisplay from "../components/BillDisplay";

// const apiServer = "http://localhost:8080"; // "."
//const apiServer = '.'
const apiServer = "https://bill.i-sabuy.xyz/Bill";



export default function BillPage(props) {
  const [hasData, setHasData] = useState(false);
  const [billData, setBillData] = useState({});
  const { billId } = props.match.params;
  
  const [COD, setCOD] = useState(-1);

  useEffect(() => {
    axios
      .get(`${apiServer}/ci-api/bills/getBill/${billId}`)
      .then(result => {
        //console.log("axios get", JSON.stringify(result.data[0]));
        if (result.data.length > 0) {
          result.data[0].Data = JSON.parse(result.data[0].Data);
        }
        setBillData(result.data[0]);
        setHasData(true);
      })
      .catch(e => {
        console.log("error", e.toString());
        setHasData(false);
        setBillData([]);
      });
  }, []);

  const SaveBillData = billData => {

    const postData = { ...billData, Data: JSON.stringify(billData.Data) };
  
    
      axios
      .post(`${apiServer}/ci-api/bills/update`, postData)
      .then(result => {
        //console.log("Saved");
      })
      .catch(e => {
        //console.log("Error updating", e);
        alert("Save error please try again");
        // window.location.reload();
      });
    
  };

  //console.log("billData", billData);
  return (
    <Fragment>
      <Helmet title={`Bill #${billId}`} />
      {/* {BillDisplay(hasData || billData.length > 0 ? billData[0] : null)} */}
      {hasData ? (
        <BillDisplay
        COD={COD}
        setCOD={setCOD}
          billData={billData}
          updateBillData={b => {
            // console.log("updateBillData", b);
            console.log(b);
            setBillData({ ...b });
            SaveBillData(b);
          }}
        />
      ) : null}
    </Fragment>
  );
}

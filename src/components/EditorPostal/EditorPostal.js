import React, { useState, useContext, useEffect } from "react";
import {getbill1, getbillProductList, getbill2} from '../../API';


const EditorPostal = ({ shipTypes, deleteShipType, resetShipTypes }) => {

    //const [ shipTypes, setShipTypes] = useState([]);

    // console.log("shipTypes------");
    // console.log(shipTypes);

    return(
        <div class="field is-horizontal">
            <div class="field-label is-normal ">
                <label class="label is-inline">ตั้งค่าขนส่ง</label>
                <a
                    //href=""
                    onClick={() => {resetShipTypes()}}
                >
                    <i className="fas fa-redo-alt" style={{marginLeft:'6px'}} 
                    />
                </a> 
            </div>
            <div class="field-body">
            <div class="field">
                <div class="control" style={{
					    border: "1px dashed #1791f2",
				}}>
                    {//<textarea class="textarea" type="text" placeholder="API components here" />
                    }
                    {shipTypes.map((ShipType, idx) => {
                        //console.log(ShipType.id+"-"+idx);
                        return (
                        <div
                            key={idx}
                            style={{ cursor: "pointer", marginTop: "10px" }}
                            
                        >
                            
                            {ShipType.description}
                            <span className="is-pulled-right">
                            {" "}
                            {ShipType.rate} บาท 
                                <a
                                    style={{"margin": "5px"}}
                                    //isSuccess={(e) => {return delteItem(ShipType, idx)}}
                                    //billStatus={1.0}
                                    onClick={() => {
                                        deleteShipType(idx);
                                    }}
                                    class="delete is-small"
                                />
                            </span>
                            
                        </div>
                        );
                    })}
                </div>
            </div>
            </div>
        </div>
    )
}

export default EditorPostal;
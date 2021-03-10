import React, { useState, useContext, useEffect } from "react";
import SelectedProductEditContext from '../../contexts/selectedProductEdit/SelectedProductEdit.context';

const InputSelectedProduct = ({
    option, 
    onChangeSelectedProduct,
    onClickAddSelectedProduct,
    onClickRemoveInputSelectedProduct,
    productName,
    setProductName,
    products,
    SKUOption
}) => {

    switch (option) {
        
    case 1:
    return (
        <>
        <div class="field is-horizontal">
            <div class="field-label is-normal">
            <label class="label">ตัวเลือก {option} </label>
            </div>
            <div class="field-body">
            <div class="field">
                <div class="field has-addons">
                    <div class="control">
                        <a class="button is-static">
                            ชื่อ
                        </a>
                    </div>
                    <div class="control  is-expanded">
                    
                        <input 
                            class="input" 
                            type="text" 
                            placeholder="ใส่ชื่อตัวเลือกสินค้า เช่น สี ไซค์ ชุด" 
                            value={products.length > 0 ? products[0].ParentName : ""}
                            onChange={(e) => setProductName(e)}
                        />
                    
                    </div>
                    <hr />
                </div>
            {products.map((product, index) => {
                return (
                <div class="field has-addons">
                    <div class="control">
                        <a class="button is-static">
                            ตัวเลือก
                        </a>
                    </div>
                    <div class="control  is-expanded">
                    
                        <input class="input" type="text" placeholder="ใส่ชื่อตัวเลือกสินค้า เช่น สี ไซค์ ชุด" value={product.selectProductName1} onChange={(e) => onChangeSelectedProduct(e, index)}/>
                    
                    </div>
                    <div class="control" onClick={(e) => {onClickRemoveInputSelectedProduct(e, index)}}>
                        <a class="button is-static">
                            -
                        </a>
                    </div>
                    <hr />
                </div>
                )
            })
            }
            </div>
            </div>
        </div>
        <div class="field is-horizontal">
            <div class="field-label is-normal">
            <label class="label"></label>
            </div>
            <div class="field-body">
            <div class="field">
                <div class="control">
                {/*<input  class="input" type="text" placeholder="ใส่ข้อมูลตัวเลือกสินค้า เช่น สีแดง XL 3ฟรี1"/>*/}
                <button class="button is-outlined is-fullwidth is-rounded" style={{
                        border: "1px dashed #1791f2",
                        color: "#1791f2",
                            }}
                    onClick={() => {onClickAddSelectedProduct();}}><i class="fas fa-plus-circle fas fa-lg"></i>  เพิ่มตัวเลือก {option}</button>
                </div>
            </div>
            </div>
        </div>
        </>
    )

    case 2:

    return (
        <>
        <div class="field is-horizontal">
            <div class="field-label is-normal">
            <label class="label">ตัวเลือก {option} </label>
            </div>
            {SKUOption === 1 ?
            <div class="field-body">
            <div class="field">
                <div class="field has-addons">
                    <div class="control">
                        <a class="button is-static">
                            ชื่อ
                        </a>
                    </div>
                    <div class="control  is-expanded">
                    
                        <input 
                            class="input" 
                            type="text" 
                            placeholder="ใส่ชื่อตัวเลือกสินค้า เช่น สี ไซค์ ชุด" 
                            value={productName}
                            onChange={(e) => setProductName(e)}
                        />
                    
                    </div>
                    <hr />
                </div>

                {/* <div class="field has-addons">
                        <div class="control">
                            <a class="button is-static">
                                ตัวเลือก 
                            </a>
                        </div>
                        <div class="control  is-expanded">
                        
                            <input class="input" type="text" placeholder="ใส่ชื่อตัวเลือกสินค้า เช่น สี ไซค์ ชุด" value={products[0].selectProduct2} onChange={(e) => onChangeSelectedProduct(e, 0)}/>
                        
                        </div>
                        <div class="control" onClick={(e) => {onClickRemoveInputSelectedProduct(e, 0)}}>
                            <a class="button is-static">
                                -
                            </a>
                        </div>
                        <hr />
                    </div> */}
                {products.map((product, index) => {
                    console.log("loop-------2");
                    console.log(product);
                    return (
                    <div class="field has-addons">
                        <div class="control">
                            <a class="button is-static">
                                ตัวเลือก 
                            </a>
                        </div>
                        <div class="control  is-expanded">
                        
                            <input class="input" type="text" placeholder="ใส่ชื่อตัวเลือกสินค้า เช่น สี ไซค์ ชุด" value={product.selectProduct2} onChange={(e) => onChangeSelectedProduct(e, index)}/>
                        
                        </div>
                        <div class="control" onClick={(e) => {onClickRemoveInputSelectedProduct(e, index)}}>
                            <a class="button is-static">
                                -
                            </a>
                        </div>
                        <hr />
                    </div>
                    )
                })
                }
            </div>
            </div>
            : <div class="field-body"></div>}
        </div>
        <div class="field is-horizontal">
            <div class="field-label is-normal">
            <label class="label"></label>
            </div>
            <div class="field-body">
            <div class="field">
                <div class="control">
                {/*<input  class="input" type="text" placeholder="ใส่ข้อมูลตัวเลือกสินค้า เช่น สีแดง XL 3ฟรี1"/>*/}
                <button class="button is-outlined is-fullwidth is-rounded" style={{
                        border: "1px dashed #1791f2",
                        color: "#1791f2",
                            }}
                            onClick={() => {onClickAddSelectedProduct();}}><i class="fas fa-plus-circle fas fa-lg"></i> เพิ่มตัวเลือก {option}</button>
                </div>
            </div>
            </div>
        </div>
        </>
    )

    default:
      return null;
    }
    /*
    return (
        <>
        <div class="field is-horizontal">
            <div class="field-label is-normal">
            <label class="label">ตัวเลือก {option} </label>
            </div>
            <div class="field-body">
            <div class="field">
                <div class="field has-addons">
                    <div class="control">
                        <a class="button is-static">
                            ชื่อ
                        </a>
                    </div>
                    <div class="control  is-expanded">
                    
                        <input 
                            class="input" 
                            type="text" 
                            placeholder="ใส่ชื่อตัวเลือกสินค้า เช่น สี ไซค์ ชุด" 
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                        />
                    
                    </div>
                    <hr />
                </div>
            {ListProduct.map((product, index) => {
                return (
                <div class="field has-addons">
                    <div class="control">
                        <a class="button is-static">
                            ชื่อ
                        </a>
                    </div>
                    <div class="control  is-expanded">
                    
                        <input class="input" type="text" placeholder="ใส่ชื่อตัวเลือกสินค้า เช่น สี ไซค์ ชุด" value={product.name} onChange={(e) => onChangeSelectedProduct(e, index)}/>
                    
                    </div>
                    <div class="control" onClick={(e) => {onClickRemoveInputSelectedProduct(e, index)}}>
                        <a class="button is-static">
                            -
                        </a>
                    </div>
                    <hr />
                </div>
                )
            })
            }
            </div>
            </div>
        </div>
        <div class="field is-horizontal">
            <div class="field-label is-normal">
            <label class="label"></label>
            </div>
            <div class="field-body">
            <div class="field">
                <div class="control">
                {/*<input  class="input" type="text" placeholder="ใส่ข้อมูลตัวเลือกสินค้า เช่น สีแดง XL 3ฟรี1"/>}
                <button class="button is-outlined is-fullwidth" onClick={() => {onClickAddSelectedProduct();}}>เพิ่มตัวเลือก {option} (20)</button>
                </div>
            </div>
            </div>
        </div>
        </>
    )*/
}

export default InputSelectedProduct;
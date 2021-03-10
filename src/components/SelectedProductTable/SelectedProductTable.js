import React, { useEffect, useState } from 'react';

const SelectedProductTable = ({
    updatePriceByindex,
    updateStockByindex,
    updateSKUByindex,
    products
}) => {

    if(products.length === 0){
        return (
            <div></div>
        )
    }
    return (
        <div class="field is-horizontal">
            <div class="field-label is-normal">
                <label class="label">รายการตัวเลือก</label>
            </div>
            <div class="field-body">
                <div class="field">
                <div class="control">
                    <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                    <tbody>
                        <tr>
                        <td>{products[0].ParentName}</td>
                        {products[0].ChildSKU === 1 ? <td>{products[0].ChildName}</td> : null}
                        <td>ราคา</td>
                        <td>สต๊อก</td>
                        <td>รหัสสินค้า</td>
                        </tr>
                        {products.map((product1, index1) => {
                            
                            return (
                            <>
                                <tr>
                                    <td rowSpan={product1.selectProductName2.length !== 0 ? product1.selectProductName2.length : ""}>
                                        <p>{product1.selectProductName1}</p>
                                    </td>
                                    {products[0].ChildSKU === 1 ?
                                        <td>
                                            <p>{product1.selectProductName2[0].selectProduct2}</p>
                                        </td>
                                    : null }
                                    <td>
                                    <p>
                                        <input 
                                            class="input" 
                                            type="number" 
                                            placeholder="ราคา"
                                            value={product1.ParentPrice}
                                            onChange={e => {updatePriceByindex(e, index1, 0)}}
                                        />
                                    </p>
                                    </td>
                                    <td>
                                        <input 
                                            class="input" 
                                            type="number" 
                                            placeholder="สต๊อก"
                                            value={product1.ParentStock}
                                            onChange={e => {updateStockByindex(e, index1, 0)}}
                                        />
                                    </td>
                                    <td>
                                    <p><input 
                                            class="input" 
                                            type="text" 
                                            placeholder="รหัสสินค้า"
                                            value={product1.ParentSKU}
                                            onChange={e => {updateSKUByindex(e, index1, 0)}}
                                        />
                                    </p>
                                    </td>
                                </tr>
                                {product1.selectProductName2.length > 1 ?
                                <>
                                    {product1.selectProductName2.map((product2, index2) => {
                                    //currentIndex++;
                                    let index = index1+index2;
                                    if(index !== 0 && index2 !== 0){
                                        return (
                                        <tr>
                                            
                                            {products[0].ChildSKU === 1 ?
                                            <td>
                                                <p>{product2.selectProduct2}</p>
                                            </td>
                                            : null
                                            }
                                            <td>
                                                <p>
                                                    <input 
                                                        class="input" 
                                                        type="number" 
                                                        placeholder="ราคา"
                                                        value={product2.ChildPrice}
                                                        onChange={e => {updatePriceByindex(e, index1, index2)}}
                                                    />
                                                </p>
                                            </td>
                                            <td>
                                                <input 
                                                    class="input" 
                                                    type="number" 
                                                    placeholder="สต๊อก"
                                                    value={product2.ChildStock}
                                                    onChange={e => {updateStockByindex(e, index1, index2)}}
                                                />
                                            </td>
                                            <td>
                                                <p>
                                                    <input 
                                                        class="input" 
                                                        type="text" 
                                                        placeholder="รหัสสินค้า"
                                                        value={product2.ChildSKU}
                                                        onChange={e => {updateSKUByindex(e, index1, index2)}}
                                                    />
                                                </p>
                                            </td>
                                        </tr>
                                        );
                                    }
                                    })
                                }
                                </>
                                : null}
                            
                            </>
                            );
                        })
                        }
                        
                    </tbody>
                    </table>
                </div>
                </div>
            </div>
        </div>
    )
    /*
    return (
        <div class="field is-horizontal">
            <div class="field-label is-normal">
                <label class="label">รายการตัวเลือก</label>
            </div>
            <div class="field-body">
                <div class="field">
                <div class="control">
                    <table border="1" width="100%">
                    <tbody>
                        <tr>
                        <td>{productName1}</td>
                        <td>{productName2}</td>
                        <td>ราคา</td>
                        <td>สต๊อก</td>
                        <td>รหัสสินค้า</td>
                        </tr>
                        {listProduct1 ?
                        <>
                        {listProduct1.map((product1, index1) => {
                            return (
                            <>
                                <tr>
                                    <td rowSpan={listProduct2.length}>
                                        <p>{product1.name}</p>
                                    </td>
                                    <td>
                                        <p>{listProduct2[0].name}</p>
                                    </td>
                                    <td>
                                    <p>
                                        <input 
                                            class="input" 
                                            type="text" 
                                            placeholder="ราคา"
                                            value={productDetails[indexArray[index1][0]].price}
                                            onChange={e => {updatePriceByindex(e, indexArray[index1][0])}}
                                        />
                                    </p>
                                    </td>
                                    <td>
                                        <input 
                                            class="input" 
                                            type="text" 
                                            placeholder="สต๊อก"
                                            value={productDetails[indexArray[index1][0]].stock}
                                            onChange={e => {updateStockByindex(e, indexArray[index1][0])}}
                                        />
                                    </td>
                                    <td>
                                    <p><input 
                                            class="input" 
                                            type="text" 
                                            placeholder="รหัสสินค้า"
                                            value={productDetails[indexArray[index1][0]].SKU}
                                            onChange={e => {updateSKUByindex(e, indexArray[index1][0])}}
                                        />
                                    </p>
                                    </td>
                                </tr>
                                {listProduct2.length > 1 ?
                                <>
                                    {listProduct2.map((product2, index2) => {
                                    //currentIndex++;
                                    let index = index1+index2;
                                    if(index !== 0 && index2 !== 0){
                                        return (
                                        <tr>
                                            <td>
                                                <p>{product2.name}</p>
                                            </td>
                                            <td>
                                                <p>
                                                    <input 
                                                        class="input" 
                                                        type="text" 
                                                        placeholder="ราคา"
                                                        value={productDetails[indexArray[index1][index2]].price}
                                                        onChange={e => {updatePriceByindex(e, indexArray[index1][index2])}}
                                                    />
                                                </p>
                                            </td>
                                            <td>
                                                <input 
                                                    class="input" 
                                                    type="text" 
                                                    placeholder="สต๊อก"
                                                    value={productDetails[indexArray[index1][index2]].stock}
                                                    onChange={e => {updateStockByindex(e, indexArray[index1][index2])}}
                                                />
                                            </td>
                                            <td>
                                                <p>
                                                    <input 
                                                        class="input" 
                                                        type="text" 
                                                        placeholder="รหัสสินค้า"
                                                        value={productDetails[indexArray[index1][index2]].SKU}
                                                        onChange={e => {updateSKUByindex(e, indexArray[index1][index2])}}
                                                    />
                                                </p>
                                            </td>
                                        </tr>
                                        );
                                    }
                                    })
                                }
                                </>
                                : null}
                            
                            </>
                            );
                        })
                        }
                        </>
                        :
                        null
                        }
                    </tbody>
                    </table>
                </div>
                </div>
            </div>
        </div>
    )
    */
}

export default SelectedProductTable;
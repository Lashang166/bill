import React, { useState, useContext, useMemo } from "react";
import { useHistory } from "react-router-dom";
import store from "store";
import Editor from '../components/Editor';
import InputSelectedProduct from '../components/InputSelectedProduct/InputSelectedProduct';
import SelectedImage from '../components/SelectedImage/SelectedImage';
import ItemSearchInput from '../components/ItemSearchInput/ItemSearchInput';
import SelectedProductTable from '../components/SelectedProductTable/SelectedProductTable';
import SelectedProductEditContext from '../contexts/selectedProductEdit/SelectedProductEdit.context';
import EditorInput from '../components/EditorInput/EditorInput';
import EditorMultiInput from '../components/EditorMultiInput/EditorMultiInput';
import EditorPostal from '../components/EditorPostal/EditorPostal';
import EditorCheckBox from '../components/EditorCheckBox/EditorCheckBox';
import Switch from '../components/Switch/Switch';
import { ProductName } from "../components/ProductCard/ProductCard.style";
import EditorJS from '@editorjs/editorjs';


const EditSalePage = ({match}) => {

  const history = useHistory();


  const user = store.get("user");

  const { initialProducts,
    addSelectedProduct1,
    removeSelectedProduct1,
    updateSelectedProduct1ByIndex1,
    addSelectedProduct2,
    removeSelectedProduct2,
    updateSelectedProduct1ByIndex2,
    updatePriceByindex,
    updateStockByindex,
    updateSKUByindex,
    products,
    updateParentName,
    updateChildName,
    updateImage,
    updateProductName,
    updateSalePrice,
    updateFullPrice,
    updateDiscountPercent,
    updateCountDownTime,
    addDescriptionLine,
    updateDescriptionByIndex,
    removeDescriptionLineByIndex,
    updateSlideImage,
    updateLine,
    updateFacebook,
    updatePhone,
    updateEditorData,
    setShipTypes,
    deleteShipTypeByIndex,
    resetShipTypes,
    deleteSlideImage,
    deleteSelectedImage,
    updateSaledAmount,
    selectPaymentMethod,
    updateLineButtonText,
    updateFacebookButtonText,
    updatePhoneButtonText,
    updateGoogleTagCode,
    updateLineToken,
    updateActive,
    PID,
    setPID
  } = useContext(SelectedProductEditContext);


  const [selectedItem, setSelectItem] = useState();
  


  useMemo(() => {
    // 
    if(match.params.PID) setPID(match.params.PID);

  }, []);

  return (

    <section class="hero">
      <div class="hero-body">
        <div class="container">

          <section class="">


            <ItemSearchInput
              setSelectItem={setSelectItem}
              initialProducts={initialProducts}
              setPID={setPID}
              PID={match.params.PID}
              // amcode={match.params.productOwner}
            />

            {products ? 
            <>
            <EditorInput
              fieldName="ตั้งชื่อสินค้า"
              value={products.productName}
              setValue={updateProductName}
              inputType="text"
              placeholder="ชื่อสินค้าความยาวไม่ควรเกิน 250 ตัวอักษร"
            />


            <SelectedImage
              fieldName="เพิ่มรูปสไลด์ (สูงสุด 8 ภาพ)"
              products={products.imageSlide ? products.imageSlide : []}
              //products={products}
              updateImage={updateSlideImage}
              isDisplayProductName={true}
              deleteImage={deleteSlideImage}
              productName={products.productName}
              imageName={"slide"}
              PID={match.params.PID}
            />

            <EditorInput
              fieldName="ราคาขาย"
              value={products.sale ? products.sale.salePrice : null}
              setValue={updateSalePrice}
              // inputType="number"
              placeholder="ราคาขาย ตัวอย่าง: 100"
            />

            <EditorInput
              fieldName="ราคาเต็ม (MRSP)"
              value={products.sale ? products.sale.fullPrice : null}
              setValue={updateFullPrice}
              inputType="number"
              placeholder="ราคาเต็ม ตัวอย่าง: 200"
            />

            <EditorInput
              fieldName="ส่วนลด (%)"
              value={products.sale ? products.sale.discountPercent : null}
              setValue={updateDiscountPercent}
              inputType="number"
              placeholder="ส่วนลด (%) ตัวอย่าง: 50"
            />

            <EditorInput
              fieldName="Flash Sale (ช.ม.)"
              value={products.flashSale ? products.flashSale.countDownTime : null}
              setValue={updateCountDownTime}
              inputType="number"
              placeholder="Flash Sale (เป็นชั่วโมง) ตัวอย่าง: 1"
            />
			
            <EditorInput
              fieldName="ขายแล้ว"
              value={products.sale ? products.sale.saledAmount : null}
              setValue={updateSaledAmount}
              inputType="number"
              placeholder="จำนวนขายแล้ว ตัวอย่าง : 999"
            />
			<hr/>
            <EditorMultiInput
              fieldName="คำอธิบายสินค้า"
              valueList={products.description ? products.description : []}
              setValueByIndex={updateDescriptionByIndex}
              inputType="text"
              placeholder="คำอธิบายเกี่ยวกับสินค้า"
              addButtonName="เพิ่มคำอธิบาย (5)"
              onClickAddButton={addDescriptionLine}
              onClickRemoveButton={removeDescriptionLineByIndex}
            />
            <hr/>
            <EditorCheckBox
              paymentMethod={products.payment && products.payment.length > 0 ? products.payment : []}
              selectPaymentMethod={selectPaymentMethod}
              //setShipTypes={setShipTypes}
              //deleteShipType={deleteShipTypeByIndex}
              //resetShipTypes={resetShipTypes}
            />
			<hr/>
            <EditorPostal
              shipTypes={products.shipTypes && products.shipTypes.length > 0 ? products.shipTypes : []}
              setShipTypes={setShipTypes}
              deleteShipType={deleteShipTypeByIndex}
              resetShipTypes={resetShipTypes}
            />
            </>
            : null}
          </section>
		  <hr/>

            {products ?
          <section class="">
            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label">รายละเอียดสินค้า</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <div class="control">
                    {products.editor ?
                    <Editor 
                      onClickSave={updateEditorData}
                      editorData={products.editor}
                      PID={match.params.PID}
                    />
                    : null}
                  </div>
                </div>
              </div>
            </div>
          </section>

          : null}

        {products ?

          <section class="">
		  <hr/>
		  <label class="label">กำหนดตัวเลือกสินค้า</label>
            <InputSelectedProduct
              option={1}
              onClickAddSelectedProduct={addSelectedProduct1}
              onChangeSelectedProduct={updateSelectedProduct1ByIndex1}
              onClickRemoveInputSelectedProduct={removeSelectedProduct1}
              setProductName={updateParentName}
              products={products.chooseProduct ? products.chooseProduct : []}
            //products={products}
            />

            <InputSelectedProduct
              option={2}
              //ListProduct={selectedProduct2}
              onClickAddSelectedProduct={addSelectedProduct2}
              onChangeSelectedProduct={updateSelectedProduct1ByIndex2}
              onClickRemoveInputSelectedProduct={removeSelectedProduct2}

              productName={products.chooseProduct && products.chooseProduct.length > 0 ? products.chooseProduct[0].ChildName : ""}
              SKUOption={products.chooseProduct && products.chooseProduct.length > 0 ? products.chooseProduct[0].ChildSKU : ""}
              setProductName={updateChildName}
              products={products.chooseProduct && products.chooseProduct.length > 0 ? products.chooseProduct[0].selectProductName2 : []}

            />

            <SelectedProductTable
              updatePriceByindex={updatePriceByindex}
              updateStockByindex={updateStockByindex}
              updateSKUByindex={updateSKUByindex}
              products={products.chooseProduct ? products.chooseProduct : []}
            />

            <SelectedImage
              fieldName="เพิ่มรูปสินค้า"
              products={products.chooseProduct ? products.chooseProduct : []}
              //products={products}
              updateImage={updateImage}
              deleteImage={deleteSelectedImage}
              imageName={"productselect"}
              productName={"SS"}
              isDisplayProductName={true}
              PID={match.params.PID}
            />

          </section>
          : null }

          {products ?
          <>
		  <hr/>
          {/* <EditorInput
            fieldName="เพิ่มปุ่ม Line"
            value={products.productName}
            setValue={updateProductName}
            inputType="text"
            placeholder="URL Line Chat Add Friend"
          /> */}

          <EditorInput
            fieldName="Url Line"
            value={products.social ? products.social.line.link : null}
            setValue={updateLine}
            inputType="text"
            placeholder="ตัวอย่าง: https://line.me/R/ti/p/%40hty5622j"
          />
          <EditorInput
            fieldName="ข้อความปุ่ม Line"
            value={products.social ? products.social.line.buttonText : null}
            setValue={updateLineButtonText}
            inputType="text"
            placeholder="ตัวอย่าง : สั่งซื้อผ่านช่องทาง Line"
          />
		 <hr/>
          

          <EditorInput
            fieldName="Url FB Messager"
            value={products.social ? products.social.facebook.link : null}
            setValue={updateFacebook}
            inputType="text"
            placeholder="ตัวอย่าง :  https://m.me/Goodfie"
          />

          <EditorInput
            fieldName="ข้อความปุ่ม FB"
            value={products.social ? products.social.facebook.buttonText : null}
            setValue={updateFacebookButtonText}
            inputType="text"
            placeholder="ตัวอย่าง : สั่งซื้อผ่านช่องทาง FB Messager"
          />
		  <hr/>


          <EditorInput
            fieldName="เพิ่มปุ่ม Phone Number"
            value={products.social ? products.social.phone.link : null}
            setValue={updatePhone}
            inputType="text"
            placeholder="ตัวอย่าง : tel:0880118825"
          />

          <EditorInput
            fieldName="ข้อความปุ่ม Phone Number"
            value={products.social ? products.social.phone.buttonText : null}
            setValue={updatePhoneButtonText}
            inputType="text"
            placeholder="ตัวอย่าง : สายด่วนโทรหาเราเลย"
          />
		  <hr/>


          <EditorInput
            fieldName="Google Tag Code"
            value={products.googleTagCode ? products.googleTagCode : null}
            setValue={updateGoogleTagCode}
            inputType="text"
            placeholder="ตัวอย่าง :  GTM-KQC4xxx"
          />

          <EditorInput
            fieldName="Line Token"
            value={products.lineToken ? products.lineToken : null}
            setValue={updateLineToken}
            inputType="text"
            placeholder="ตัวอย่าง : 8zH7u77FjpjrUZxv28qIybQr7CB0PqwMrfx8yLnZjjl "
          />

          <Switch 
            id={"productActive"} 
            name={"เปิด/ปิด ใช้งาน Salepage"}
            value={products.active} 
            onClickButton={(e) => {updateActive(e, products.active)}} 
            // isChecked={products.active === 1 ? true : false}
            isChecked={products.active}
          />
		  <hr/>

          <button class="my-4 button is-primary is-outlined is-fullwidth"
            onClick={() => {
              window.open(`#/productlist/${user.amcode}/${match.params.PID}`, '_blank');

            }}
          >
            Go to Salepage
          </button >
		  <br/>
          <button class="my-4 button is-link is-outlined is-fullwidth"
            onClick={() => {
              window.open(`#/productlist/${user.amcode}`, '_blank');
            }}
          >
            Back to Productlist
          </button>
    
          </>
          : null}
        </div>
      </div>
    </section>
  );
}

export default EditSalePage;
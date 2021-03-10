import React from 'react';
import UploadImage from '../UploadImage/UploadImage';


const SelectedImage = ({
    products, 
    updateImage, 
    fieldName, 
    isDisplayProductName, 
    deleteImage,
    productName,
    selectedItem,
    imageName,
    PID
}) => {

    return (
    <div class="field is-horizontal"> 
        <div class="field-label is-normal">
            <label class="label">{fieldName}</label>
        </div>
        <div class="field-body">
            <div class="field">
                <div class="columns is-multiline is-mobile">
        {products.map((product, index) => {

            return (
                <UploadImage
                    image={product.image}
                    //image={"uploads/1143-5432.png?t=1589028077"}
                    updateImage={updateImage}
                    index={index}
                    isDisplayProductName={isDisplayProductName}
                    productName={product.selectProductName1}
                    deleteImage={deleteImage}
                    PID={PID}
                    imageName={imageName}
                />
            )
            })
        }
                 </div>   
            </div>
        </div>
        
    </div>);
};

export default SelectedImage;
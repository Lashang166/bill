import React, { useState, useCallback, useEffect } from "react";

import { useDropzone } from "react-dropzone";
import {upload1, apiServer} from "../../API";
import NotifButton from "../NotifButton/NotifButton";
import { AlertDotIcon } from "../AllSvgIcon";
//mport UploadImageStyled from './UploadImage.style';
const UploadImage = ({
    image, 
    updateImage, 
    index, 
    isDisplayProductName, 
    productName, 
    deleteImage,
    PID,
    imageName,
}) => {

    const [isUploading, setIsUploading] = useState(false);
    const [isImageChange, setImageChange] = useState(false);
    const [file2upload, setFile2Upload] = useState([]);
    const [imgDataUrl, setImgDataUrl] = useState(image ? `${apiServer}/ci-api/${image}` : "");

    useEffect(() => {
        setImgDataUrl(image ? `${apiServer}/ci-api/${image}` : "");
        //alert('test');
        //console.log(index+"-----")
        //console.log(image ? `${apiServer}/ci-api/${image}` : "");
    }, [image])
    // Upload function
    const onDrop = useCallback(acceptedFiles => {
        setFile2Upload(acceptedFiles);
        setImageChange(true);

        const reader = new FileReader();
        reader.onload = () => {
            setImgDataUrl(reader.result);
            
        };

        acceptedFiles.forEach(file => {
            reader.readAsDataURL(file);
        });
        doUpload(acceptedFiles);
    }, []);


    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: "image/*",
        multiple: false
    });


    const doUpload = async (imgData) => {


        //setBillCOD();
        //alert("TEST");
        //return {message : "เพิ่มที่อยู่สำเร็จ", isSuccess : true};
       // if (isImageChange) {
          setIsUploading(true);
          // console.log(file2upload);
          imgData.forEach(file => {

            let formData = new FormData();
            formData.append("img", file);
            formData.append("billNo", PID + "-"+ imageName + index);
            
            //axios.post(`${apiServer}/ci-api/fileman/upload`, formData)
            upload1(formData)
              .then(result => {

                setIsUploading(false);
                
                setImageChange(false);
                updateImage(result.data.fileurl, index);
                return true;
                // console.log(typeof result.data, result.data);
              })
              .catch(e => {
                console.log("Upload error", e);
                //setImgDataUrl("");
                setIsUploading(false);
                //setImageChange(false);
                return false;
              });
          });
        /*} else {
          
          return true;
          // setBillStatus("2");
        }*/
        
      };

    return (
        
        <div class="column  is-narrow">
            
                <div
                    //{...getRootProps()}
                    className={`has-text-centered has-round-border`}
                    style={{
                        height: "111px",
                        width: "111px",
                        border: "1px dashed #1791f2",
                        position: "relative"
                    }}
                >
                    {imgDataUrl !== "" ? 
                    <button
                        className="delete is-small"
                        onClick={() => {
                            deleteImage(index);
                        }}
                        style={{ position : 'absolute', zIndex : 99999, right : '0px' }}
                    /> 
                    : null}
                    <div {...getRootProps()}>
                    {imgDataUrl !== "" ? 
                    <></>
                    : null}
                    {isDragActive ? (
                        <p className="has-text-centered">
                            แนบรูปสินค้า 
                        </p>
                        ) : imgDataUrl === "" ? (
                        <table
                        style={{
                            width: "100%",
                            margin: "5px auto auto auto",
                            padding: 0,
                            border: 0
                        }}
                        >
                        <tr>
                            <td
                            style={{ verticalAlign: "middle", textAlign: "center" }}
                            >
                            <img
                                src="./assets/upload-background.png"
                                style={{
                                opacity: ".2",
                                width: "40%",
                                heght: "40%"
                                }}
                                alt=""
                            />
                            <br />
                            <font style={{ size: "1.5em" }} className="has-text-grey">
                                OR
                            </font>
                            <br />
                            <font
                                style={{ size: "1.5em" }}
                                className="has-text-grey-darker"
                            >
                                Click
                            </font>
                            </td>
                        </tr>
                        </table>
                        ) : (
                        <>
                        
                        <figure
                        className="has-text-centered"
                        style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)"
                        }}
                        >
                            <p className="image">
                                
                            <img
                                src={imgDataUrl}
                                style={{
                                    maxWidth: "105px",
                                    maxHeight: "105px",
                                    width: "auto",
                                    height: "auto"
                                }}
                                //alt={BillNo}
                                />
                            </p>
                        </figure>
                        </>
                    )}
                    <input {...getInputProps()} />
                    </div>
                </div>
                {isDisplayProductName ? 
                <div
                    style={{ size: "1em" }}
                    className="has-text-grey-darker has-text-centered is-fullwidth "
                >
                    {productName}
                </div>
                : null}
        </div>
    );
};

export default UploadImage;
import React, { useState, useCallback, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { Scrollbars } from "react-custom-scrollbars";
// import { useMutation, gql } from '@apollo/client';
import { useDrawerDispatch } from "../../contexts/drawerProduct/DrawerContext";
import Uploader from "../../components/Uploader/Uploader";
import Button, { KIND } from "../../components/Button/ButtonProductForm";
import DrawerBox from "../../components/DrawerBox/DrawerBox";
// import { Row, Col } from '../../components/FlexBox/FlexBox';
import Input from "../../components/Input/InputProductForm";
import CardImage from "../../components/Card/CardImage";
import { Textarea } from "../../components/Textarea/Textarea";
import Select from "../../components/Select/Select";
import { FormFields, FormLabel } from "../../components/FormFields/FormFields";
import Switch from "../../components/Switch/Switch";
import ProductsContext from "../../contexts/products/products.context";

import {
  getSelectProduct,
  apiServerImg,
  AddProductData,
  editSelectProduct,
  deleteSelectProduct,
  uploadProductImage,
  setProductCoverImage,
  deleteSelectedCProductImage,
} from "../../API";
import NotifButton from "../../components/NotifButton/NotifButton";

import {
  Form,
  DrawerTitleWrapper,
  DrawerTitle,
  FieldDetails,
  ButtonGroup,
} from "../DrawerProduct/DrawerItems.style";
import { AlertDotIcon } from "../../components/AllSvgIcon";
import _ from "lodash";
//import { map, tail, times, uniq } from 'lodash';

const options = [
  { value: "Fruits & Vegetables", name: "Fruits & Vegetables", id: "1" },
  { value: "Meat & Fish", name: "Meat & Fish", id: "2" },
  { value: "Purse", name: "Purse", id: "3" },
  { value: "Hand bags", name: "Hand bags", id: "4" },
  { value: "Shoulder bags", name: "Shoulder bags", id: "5" },
  { value: "Wallet", name: "Wallet", id: "6" },
  { value: "Laptop bags", name: "Laptop bags", id: "7" },
  { value: "Women Dress", name: "Women Dress", id: "8" },
  { value: "Outer Wear", name: "Outer Wear", id: "9" },
  { value: "Pants", name: "Pants", id: "10" },
];
const typeOptions = [
  { value: "grocery", name: "Grocery", id: "1" },
  { value: "women-cloths", name: "Women Cloths", id: "2" },
  { value: "bags", name: "Bags", id: "3" },
  { value: "makeup", name: "Makeup", id: "4" },
];

const AddProduct = (props) => {
  const dispatch = useDrawerDispatch();
  const closeDrawer = useCallback(() => dispatch({ type: "CLOSE_DRAWER" }), [
    dispatch,
  ]);

  console.log("props------");
  console.log(props);

  const { register, handleSubmit, setValue } = useForm();
  const [type, setType] = useState([]);
  const [tag, setTag] = useState([]);
  const [description, setDescription] = useState(
    props.data.description ? props.data.description : ""
  );
  const [name, setName] = useState(props.data.name ? props.data.name : "");
  const [SKU, setSKU] = useState(props.data.SKU ? props.data.SKU : "");
  const [price, setPrice] = useState(props.data.price ? props.data.price : "");
  const [cost, setCost] = useState(props.data.cost ? props.data.cost : "");
  const [POcost, setPOcost] = useState(
    props.data.POcost ? props.data.POcost : ""
  );
  const [isShow, setIsShow] = useState(parseInt(props.data.prCat) === 1);
  const [uploadImageList, setUploadImageList] = useState(
    props.data.imageList ? [apiServerImg + props.data.imageList.image] : null
  );
  const [isReRender, setIsReRender] = useState(false);
  // alert("props.data.prCat : " + (parseInt(props.data.prCat) === 1))
  // const [ isShow, setIsShow ] = useState(props.data.prCat);

  const { newData } = useContext(ProductsContext);
  // React.useEffect(() => {
  //     register({ name: 'type' });
  //     register({ name: 'categories' });
  //     register({ name: 'image', required: true });
  //     register({ name: 'description' });
  // }, [register]);

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    // setValue('description', value);
    setDescription(value);
  };

  const handleMultiChange = ({ value }) => {
    // setValue('categories', value);
    setTag(value);
  };
  const handleTypeChange = ({ value }) => {
    // setValue('type', value);
    setType(value);
  };
  const handleUploader = (files) => {
    // setValue('image', files[0].path);
    // alert("---");
    setUploadImageList([files[0]]);
  };

  const handleSetProductCoverImage = (imgid) => {
    setProductCoverImage({ imgid }).then(async (res) => {
      let data = props.data;
      let params = {
        amcode: data.productOwner,
        PID: data.PID,
      };
      let result = await getSelectProduct(params).then((result) => {
        return result.data.data[0];
      });

      dispatch({
        type: "OPEN_DRAWER",
        drawerComponent: "PRODUCT_FORM",
        data: {
          productOwner: data.productOwner,
          description: result.pr_desc,
          name: result.pr_title,
          SKU: result.prod_sku,
          price: result.retail,
          cost: result.Cost,
          POcost: result.POcost,
          PID: data.PID,
          mode: "update",
          prCat: result.pr_cat,
          newDataFunc: newData,
          isAbleDelete: data.isAbleDelete,
          imageList: result.images,
        },
      });
      await newData(props.data.productOwner, "");
      alert("เปลี่ยนรูปปกสินค้าสำเร็จ");
    });
  };

  const handleDeleteSelectedCProductImage = (imgid) => {
    const confirm = window.confirm("ยืนยันการลบรูปภาพสินค้า");
    if (confirm)
      deleteSelectedCProductImage({ imgid, pid: props.data.PID }).then(
        async (res) => {
          let data = props.data;
          let params = {
            amcode: data.productOwner,
            PID: data.PID,
          };
          let result = await getSelectProduct(params).then((result) => {
            return result.data.data[0];
          });

          dispatch({
            type: "OPEN_DRAWER",
            drawerComponent: "PRODUCT_FORM",
            data: {
              productOwner: data.productOwner,
              description: result.pr_desc,
              name: result.pr_title,
              SKU: result.prod_sku,
              price: result.retail,
              cost: result.Cost,
              POcost: result.POcost,
              PID: data.PID,
              mode: "update",
              prCat: result.pr_cat,
              newDataFunc: newData,
              isAbleDelete: data.isAbleDelete,
              imageList: result.images,
            },
          });
          await newData(props.data.productOwner, "");
          alert("ลบรูปภาพสินค้าสำเร็จ");
        }
      );
  };

  const onRemoveProduct = async () => {
    closeDrawer();
    if (props.data.isAbleDelete) {
      return {
        message: "ไม่สามารถลบสินค้าได้ เนื่องจากมีสินค้าอยู่ในคลัง",
        isSuccess: false,
      };
    } else {
      const params = {
        pid: props.data.PID,
        prod_sku: SKU,
      };
      console.log("params-------");
      console.log(params);
      await deleteSelectProduct(params).then(async (result) => {
        await newData(props.data.productOwner, "");
        // return {message : "", isSuccess : false}
        closeDrawer();
      });

      return { message: "ลบสินค้าสำเร็จ", isSuccess: true };
    }
  };

  const onSubmit = (data) => {
    const newProduct = {
      pgrpid: 14,
      retail: data.price,
      prod_sku: data.SKU,
      pr_desc: description,
      pr_title: data.name,
      stk_org: 0,
      Cost: data.cost,
      POcost: data.POcost,
      pid: props.data.PID,
      pr_cat: isShow ? 1 : 0,
      // "pr_longdesc":{}
    };

    console.log(newProduct, "newProduct data");

    if (props.data.mode === "update") {
      editSelectProduct(newProduct).then((result) => {
        // console.log("result---------");
        // console.log(result);
        console.log("props.data.PID----");
        console.log(props.data.PID);

        onUploadProductImage(props.data.PID);
        newData(props.data.productOwner, "");
      });
      // closeDrawer();
    } else {
      AddProductData(newProduct).then((result) => {
        console.log("result------------+++++++++++");
        console.log(result);
        onUploadProductImage(result.data.pid);
        newData(props.data.productOwner, "");
      });
    }
    closeDrawer();
  };

  const onUploadProductImage = (pid) => {
    var bodyFormData = new FormData();
    bodyFormData.append("photos", uploadImageList[0]);
    bodyFormData.append("pid", pid);
    console.log(uploadImageList);
    uploadProductImage(bodyFormData).then((result) => {});
  };

  const genImageLists = () => {
    // console.log(props.data.imageList);
    return (
      <div className="is-flex">
        {_.map(props.data.imageList.ImgThumb, (image) => (
          <div
            className=""
            style={{
              margin: "4px",
              position: "relative",
              borderRadius: "3px",
            }}
          >
            <CardImage
              imageURL={apiServerImg + image.img_url}
              imageName={image.img_id}
            />
            <svg
              style={{
                background: "rgb(255 255 255 / 70%)",
                borderRadius: "3px",
              }}
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#d0021b"
              strokeWidth="3"
              strokeLinecap="butt"
              strokeLinejoin="bevel"
              className="close-icon"
              onClick={() => {
                handleDeleteSelectedCProductImage(image.imid);
                setIsReRender(!isReRender);
              }}
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>

            <svg
              style={{
                background: "rgb(255 255 255 / 70%)",
                borderRadius: "5px",
              }}
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgb(0, 197, 141)"
              strokeWidth="2"
              strokeLinecap="butt"
              strokeLinejoin="bevel"
              className="cover-image"
              onClick={() => {
                handleSetProductCoverImage(image.imid);
              }}
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <DrawerTitleWrapper>
        <DrawerTitle>รายการสินค้า</DrawerTitle>
      </DrawerTitleWrapper>

      <Form
        onSubmit={handleSubmit(onSubmit)}
        style={{ height: "100%", "background-color": "transparent" }}
      >
        <Scrollbars
          autoHide
          renderView={(props) => (
            <div {...props} style={{ ...props.style, overflowX: "hidden" }} />
          )}
          renderTrackHorizontal={(props) => (
            <div
              {...props}
              style={{ display: "none" }}
              className="track-horizontal"
            />
          )}
        >
          <FieldDetails>อัพโหลดรูปสินค้า</FieldDetails>
          <DrawerBox
            overrides={{
              Block: {
                style: {
                  width: "100%",
                  height: "auto",
                  padding: "30px",
                  borderRadius: "3px",
                  backgroundColor: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                },
              },
            }}
          >
            <Uploader onChange={handleUploader} imageURL={uploadImageList} />
          </DrawerBox>

          {props.data.imageList && (
            <>
              {" "}
              <FieldDetails>รายการรูปสินค้า</FieldDetails>
              <DrawerBox>{genImageLists()}</DrawerBox>
            </>
          )}

          <FieldDetails>กรุณาใส่ข้อมูลสินค้า</FieldDetails>

          <DrawerBox>
            <FormFields>
              <FormLabel>ชื่อสินค้า</FormLabel>
              <Input
                inputRef={register({ required: true })}
                name="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                placeholder="ตัวอย่าง: อาหารเสริมเพื่อสุขภาพขนาด 30 กรัม"
              />
            </FormFields>

            <FormFields>
              <FormLabel>รหัสสินค้า</FormLabel>
              <Input
                inputRef={register({ required: true })}
                name="SKU"
                value={SKU}
                onChange={(e) => {
                  setSKU(e.target.value);
                }}
                placeholder="ตัวอย่าง: exe030g"
              />
            </FormFields>

            <FormFields>
              <FormLabel>รายละเอียดสินค้า</FormLabel>
              <Textarea
                value={description}
                // inputRef={register({ required: true })}
                name="description"
                onChange={handleDescriptionChange}
                placeholder="ตัวอย่าง: อาหารเสริมเพื่อสุขภาพ"
              />
            </FormFields>

            <FormFields>
              <FormLabel>ราคา</FormLabel>
              <Input
                type="number"
                inputRef={register({ required: true })}
                name="price"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
                placeholder="100"
              />
            </FormFields>

            <FormFields>
              <FormLabel>ราคาเต็ม (สร้างส่วนลด)</FormLabel>
              <Input
                type="number"
                inputRef={register({ required: true })}
                name="cost"
                value={cost}
                onChange={(e) => {
                  setCost(e.target.value);
                }}
                placeholder="200"
              />
            </FormFields>

            <FormFields>
              <FormLabel>ส่วนลด (เปอร์เซ็นต์)</FormLabel>
              <Input
                type="number"
                inputRef={register({ required: true })}
                name="POcost"
                value={POcost}
                onChange={(e) => {
                  setPOcost(e.target.value);
                }}
                placeholder="50"
              />
            </FormFields>

            <Switch
              id={"productActive"}
              name={"แสดงผลบน E-Commerce"}
              value={isShow}
              onClickButton={(e) => {
                setIsShow(!isShow);
              }}
              // isChecked={products.active === 1 ? true : false}
              isChecked={isShow}
            />
          </DrawerBox>
        </Scrollbars>

        <ButtonGroup>
          {props.data.mode === "update" ? (
            <>
              <Button
                kind={KIND.minimal}
                onClick={() => {
                  if (props.data.mode === "update") {
                    newData(props.data.productOwner, "");
                  }

                  closeDrawer();
                }}
                overrides={{
                  BaseButton: {
                    style: ({ $theme }) => ({
                      width: "25%",
                      borderTopLeftRadius: "3px",
                      borderTopRightRadius: "3px",
                      borderBottomRightRadius: "3px",
                      borderBottomLeftRadius: "3px",
                      color: $theme.colors.back400,
                    }),
                  },
                }}
              >
                ยกเลิก
              </Button>
              <NotifButton
                style={{
                  width: "50%",
                }}
                isSuccess={true}
                type={"warning"}
                isSuccess={onRemoveProduct}
                // name={"ลบสินค้า"}
              >
                <Button
                  kind={KIND.minimal}
                  // onClick={}
                  overrides={{
                    BaseButton: {
                      style: ({ $theme }) => ({
                        width: "100%",
                        borderTopLeftRadius: "3px",
                        borderTopRightRadius: "3px",
                        borderBottomRightRadius: "3px",
                        borderBottomLeftRadius: "3px",
                        color: $theme.colors.red400,
                      }),
                    },
                  }}
                >
                  ลบสินค้า
                </Button>
              </NotifButton>
              <Button
                type="submit"
                onClick={() => {}}
                overrides={{
                  BaseButton: {
                    style: ({ $theme }) => ({
                      width: "50%",
                      borderTopLeftRadius: "3px",
                      borderTopRightRadius: "3px",
                      borderBottomRightRadius: "3px",
                      borderBottomLeftRadius: "3px",
                    }),
                  },
                }}
              >
                ยืนยัน
              </Button>
            </>
          ) : (
            <>
              <Button
                kind={KIND.minimal}
                onClick={closeDrawer}
                overrides={{
                  BaseButton: {
                    style: ({ $theme }) => ({
                      width: "50%",
                      borderTopLeftRadius: "3px",
                      borderTopRightRadius: "3px",
                      borderBottomRightRadius: "3px",
                      borderBottomLeftRadius: "3px",
                      marginRight: "15px",
                      color: $theme.colors.red400,
                    }),
                  },
                }}
              >
                ยกเลิก
              </Button>

              <Button
                type="submit"
                overrides={{
                  BaseButton: {
                    style: ({ $theme }) => ({
                      width: "50%",
                      borderTopLeftRadius: "3px",
                      borderTopRightRadius: "3px",
                      borderBottomRightRadius: "3px",
                      borderBottomLeftRadius: "3px",
                    }),
                  },
                }}
              >
                สร้างสินค้า
              </Button>
            </>
          )}
        </ButtonGroup>
      </Form>
      {/* <div 
            style={{
                // 'background-color' : 'red', 
                // width : '500px', 
                // height : '500px',
                // zIndex : 9999,
                // position : 'fixed',
                // float: 'left',
                // overflow: 'auto',
                // right: '0px',
                // bottom: '0px',
                // top: '0px',
                // left: '0px',
            }}
        >
          
      </div> */}
    </>
  );
};
export default AddProduct;

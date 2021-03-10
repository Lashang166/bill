import React from "react";
let iconTypes = {};
const CategoryIcon = ({ name, iconArray, ...props }) => {
    const hasIcon = iconArray
        ? iconArray.hasOwnProperty(name)
        : iconTypes.hasOwnProperty(name);
    let Icon = hasIcon ? iconArray[name] : "span";
    return <Icon {...props}/>;
};
export default CategoryIcon;

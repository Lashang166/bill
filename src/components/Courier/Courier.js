import React from "react";
import { CourierWrapper } from "./Courier.style";

const CourierDisplay = ({ couriers }) => {

  console.log(couriers)
  return (
    <CourierWrapper>
      {couriers.map((courier, key) => {
        return (
          <p id={key}> 
            {courier.description}{' '}
            {/*<CourierDisplay courier={courier}/>*/}
          </p>
        );
      })
      }
    </CourierWrapper>
  );
};
export default CourierDisplay;

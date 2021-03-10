import React, {useState, useEffect} from "react";
import { FlashSaleWrapper, CountDown, FlashSaleText } from "./FlashSale.style";

const FlashSale = ({ flashSale }) => {
  const [hour, setHour] = useState(flashSale);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      if (second > 0) {
        setSecond(second - 1);
      }
      if (second === 0) {
        if (minute !== 0) {
          //clearInterval(myInterval)
          setSecond( 59 );
          setMinute( minute - 1);
        }
      } 
      if (second === 0) {
        if (minute === 0) {
          if (hour !== 0) {
            setSecond( 59 );
            setMinute( 59 );
            setHour( hour - 1);
          }
        }
      } 
    }, 1000);
  });


  return (
    <FlashSaleWrapper>
      <FlashSaleText>Flash <i class="fas fa-bolt has-text-warning is-size-5"></i> Sale</FlashSaleText>
      <CountDown> หมดใน <hbadge class="tag is-dark">0{hour}</hbadge> <mbadge class="tag is-dark">{ minute }</mbadge> <sbadge class="tag is-dark">{ second }</sbadge></CountDown>
    </FlashSaleWrapper>
  );
};
export default FlashSale;

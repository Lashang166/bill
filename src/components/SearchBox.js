import React, { useState, createRef } from "react";
import {DelayInput} from 'react-delay-input';

export default function SearchBox({
  label,
  name,
  value,
  placeholder,
  type,
  onInputChange,
  searchFunction,
  FormatResult,
  className,
  isNotSort,
  delay
}) {

  const [searchResult, setSearchResult] = useState([]);
  const [isFocus, setIsFocus] = useState(false);
  let delayTime = delay ? delay : 0;
  let thisTime = new Date().getTime();
  let timer = null;
  
  //const [refScroll, setRefScroll] = createRef();
  let refScroll = createRef();

  const sortZipCodeAsc = async (address) =>{
    let sortZipCode = [];

    const resultSearch = await searchFunction(address, 17);
    
    if(resultSearch.length !== 0 && !isNotSort){


    sortZipCode= resultSearch.sort((a,b)=>{

      return parseInt(a.zipcode) - parseInt(b.zipcode);
    })
    

    /*if(windowHeight === 0){
      setWindowHeight(window.scrollY);
      window.scrollBy(0,100);
    }
    else{
      if(windowHeight - 500 < window.scrollY ){
        setWindowHeight(window.scrollY - 100);
        window.scrollBy(0,100);
      }
    }*/
    setSearchResult(sortZipCode);
    //window.scrollTo(0, 2000);

    setSearchResult(sortZipCode);
    var element = document.getElementById("searchbox-postcode");
    element.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});

    }
    else{
      setSearchResult(resultSearch);
    }

    //sortZipCode = resultSearch.sort((a, b) => parseInt(a.zicode)  - parseInt(b.zicode)).reverse();

    //console.log(resultSearch);
  }


  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className="control" >
        <DelayInput
          delayTimeout={delayTime}
          onFocus={() => {
            setIsFocus(true);
          }}
          /*onBlur={() => {
            setTimeout(() => {
              setIsFocus(false);
            }, 250);
          }}*/
          className={`input ${className}`}
          id={`searchbox-${name}`}
          value={value}
          type={type}
          onChange={e => {
            onInputChange(e);
            //setSearchResult(searchFunction(e.target.value, 4));
            let txt = e.target.value;
            clearTimeout(timer);
            
            setTimeout(() => {
              sortZipCodeAsc(txt);
            }, 1000);

            //setSearchResult(searchFunction(e.target.value, 15));
          }}
          placeholder={placeholder}
        />
        <div
          id={`searchboxresult-${name}`}
          className={`${isFocus ? "" : "is-hidden"}`}
          style={{zIndex:999}}
          onClick={() => { 
            setTimeout(() => {
              setIsFocus(false);
            }, 250);
          }}
        >
          {searchResult.map((s, idx) => {
            
            //console.log(data);
            
            thisTime++;
            return (
              <div className="content" key={thisTime}>
                {FormatResult(s)}
              </div>
            );
          })}
          
        </div>
      </div>
    </div>
  );
}

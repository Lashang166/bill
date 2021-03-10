import React from 'react';
import { HTMLVirtual } from './EditorReadOnly.style'
import { Output } from 'editorjs-react-renderer';

const EditorReadOnly = ({
    editorData
}) => {


    const readOnly = ( block ) => {

        let result = "";

        const data = block.data;
        const type = block.type;

        console.log("block-----");
        console.log(block);
        console.log("data-----");
        console.log(data);
        console.log("typep------");
        console.log(type);

        let content = ""
        let element = ""
      switch (type) {
        case "header":
          element =  React.createElement(
            `h${data.level}`,
            {
              className: '',
            },
            data.text
          )  
          content = (<div style={{height: "fit-content"}}>
              {element}
            </div>)
        break;
        case "paragraph":
          element =  React.createElement(
            `p`,
            {
              className: '',
            },
            data.text
          )  
          // console.log(element);
          content = (<div style={{height: "fit-content"}}>
              {element}
            </div>)
        break;
        case "list":
          content = (<ul className={`"cdx-block" "cdx-list" "cdx-list--${data.style}"`}>
            {data.items.map((item, key) =>  <li class="cdx-list__item" style={{marginLeft : 20}}>{data.style === 'unordered' ? '•' : key+1+"."} {item}</li>)}
          </ul>)
        break;
        case "embed":
            content = (<div className="cdx-block embed-tool">
            <iframe className="embed-tool__content" style={{width: "fit-100%",margin: "0px 0px -10px 0px", height : '421px'}} height="560" frameborder="0" width="780"
              allowfullscreen src={data.embed}></iframe>
            <div style={{'text-align': "center", 'margin-top': "0px"}}>{data.caption}</div>
            </div> )
        break;
        case "code":
          content = (<div class="cdx-block ce-code">
              <span style={{'text-align': "right", 'margin-bottom': "5px"}}>{data.language}</span>
              <pre className="ce-code__textarea cdx-input prettyprint"><code className="lang-js">{data.code+""}</code></pre>
            </div>)
        break;
        case "image":
            content = (
              <>
              {/* // <div className="cdx-block image-tool image-tool--filled"> */}
                {/* <div className="image-tool__image"> */}
                  <img className="image-tool__image-picture" style={{'display': "block",'margin': "auto"}}src={data.file.url}></img>
                  <span style={{'text-align': "right", 'margin-bottom': "0px"}}>{data.caption}</span>
                {/* // </div> */}
              {/* // </div> */}
              </>
            )
        break;
        case "table":
            content = (
                <table border="1" style={{"width": "-webkit-fill-available"}}>
                    {data.content.map((data2, index) => (
                        <tr>
                            {data2.map((data3) => (
                                <td style={{padding : '10px'}}>{data3}</td>
                            ))}
                        </tr>
                    ))
                    }
                </table>
            )
        break;
        case "link":
            content = (
                <a href={data.link}>{data.link}</a>
            )
        break;
        case "delimiter":
            content = (
                <div style={{
                  "line-height": "1.6em",
                  "width": "100%",
                  "text-align": "center",
                  "transition": "background-color .15s ease",
                  "font-size": "1rem",
                }}>* * *</div>
            )
        break;
        default:
          content = (<div className="ce-paragraph cdx-block"> {`${data.text}`} </div>)
          break;
      }

    //   console.log("content---");
    //   console.log(content);
      // return (<div className="ce-block">
      {/* <div className="ce-block__content"> */}
        return (
          <>
            {content}
          </>
          )
        // </div>
        // </div>)

        // if(block.type === "paragraph"){
        //     result = <p>{block.data.text}</p>
        // }
        // else if(block.type === "image"){
        //     result = <img src={block.data.file.url}/>
        //     result += <p>{block.data.caption}</p>
        //     console.log(result);
        // }


        // return result
    }


    const style = {
      header: {
        textAlign: 'left',
      },
      image: {
        img: {
          maxHeight: '400px',
        },
        figure: {
          backgroundColor: 'aliceblue',
        },
        figcaption: {
          borderRadius: '5px',
        }
      },
      embed: {
        video: {
          maxHeight: '400px',
        },
        figure: {
          justifyContent: 'center',
        },
        figcaption: {
          borderRadius: '5px',
        }
      },
      paragraph: {
        textAlign: 'left',
        cursor: 'default',
      },
      list: {
        textAlign: 'left',
      },
      checklist: {
        container: {},
        item: {},
        checkbox: {},
        label: {},
      },
      table: {
        table: {},
        tr: {},
        th: {},
        td: {},
      },
      quote: {
        container: {},
        content: {},
        author: {
          fontWeight: 'bold',
        },
        message: {
          textAlign: 'left',
        }
      },
      codeBox: {
        container: {
          width: '100%',
        },
        code: {
          boxSizing: 'border-box',
        },
      },
      warning: {
        fontWeight: 400,
      },
      delimiter: {
        container: {},
        svg: {},
        path: {
          fill: '#231F20'
        }
      },
    };


    return (
        <div>
            {/* <p>----------------Editor Read Only-------------------</p> */}
            <HTMLVirtual>
              {editorData.blocks.map((block) => {

                  return(
                      <>
                          {readOnly(block)}
                      </>
                  )
              })}
            </HTMLVirtual>
            {/* <p>-----------/-----------------------------------------</p> */}
            {/* <p>----------------Editor Read Only-------------------</p> */}
              {/* <Output data={ editorData.blocks } style={ style } /> */}
            {/* <p>----------------------------------------------------</p> */}
        </div>
    )
}

export default EditorReadOnly;
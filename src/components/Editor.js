import React, { useEffect, useState, useReducer } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header'; 
import List from '@editorjs/list'; 
import Delimiter from '@editorjs/delimiter'
import Embed from '@editorjs/embed'
import Table from '@editorjs/table'
import Link from '@editorjs/link'
import Image from '@editorjs/image';
import Paragraph from '@editorjs/paragraph';
import Marker from '@editorjs/marker';
import Attaches from '@editorjs/attaches';
import Personality from '@editorjs/personality';
import InlineCode from '@editorjs/inline-code';

import parser from 'html-react-parser';
import {apiServer, upload1} from '../API';
import { AlertDotIcon } from './AllSvgIcon';



const Editor = ({onClickSave, editorData, PID}) => {

    const [editor, setEditor] = useState();


    useEffect(() => {

      // console.log(editor);
      setEditor(new EditorJS({ 
        /** 
         * Id of Element that should contain the Editor 
         */ 
        holderId: 'editor', 
         /**
          * onChange callback
          */
        onChange: (API) => {
          //console.log(API);
          console.log("savedData-------");
          console.log(API);
          API.saver.save().then((savedData) => {
            console.log(savedData);
            
            onClickSave(savedData);
          })
          //console.log("TEST");
        },
        /**
         * Tools list
         * */
        tools: {
          /**
           * Each Tool is a Plugin. Pass them via 'class' option with necessary settings {@link docs/tools.md}
           */
          header: {
            class: Header,
            config: {
              placeholder: 'Header',
              levels: [1, 2, 3, 4, 5, 6],
              defaultLevel: 3
 
            },
            shortcut: 'CMD+SHIFT+H'
          },

          list: {
            class: List,
            // inlineToolbar: true,
            shortcut: 'CMD+SHIFT+L'
          },

          // link: {
          //   class: Link,
          //   config: {
          //     endpoint: '', // Your backend endpoint for url data fetching
          //   }
          // },

          image: {
            class: Image,
            config: {
              additionalRequestHeaders : {
                headers: {
                  'authorization': 'Bearer eyJhbGciJ9...TJVA95OrM7h7HgQ',
                },
              },
              /*endpoints: {
                //byFile: 'http://localhost:8008/uploadFile', // Your backend file uploader endpoint
                //byUrl: 'http://localhost:8008/fetchUrl', // Your endpoint that provides uploading by Url
                byFile: `${apiServer}/ci-api/fileman/upload`,
                byUrl: `${apiServer}/ci-api/fileman/upload`,
              },*/
              uploader: {
                /**
                * Upload file to the server and return an uploaded image data
                * @param {File} file - file selected from the device or pasted by drag-n-drop
                * @return {Promise.<{success, file: {url}}>}
                */
                async uploadByFile(file){
                // your own uploading logic here
                let formData = new FormData();
                formData.append("img", file);
                formData.append("billNo", PID+"-"+Date.now());
                // formData.append("billNo", "Test-Editor");
                return await upload1(formData).then(async result => {
                  return {
                    success: 1,
                    file: {
                      url: `${apiServer}/ci-api/${result.data.fileurl}`,
                      // any other image data you want to store, such as width, height, color, extension, etc
                    }
                  };
                  // console.log(typeof result.data, result.data);
                })
                .catch(e => {
                  console.log("Upload error", e);
                  return false;
                });

                }
              },
            }
          },


          // embed: {
          //   class: Embed,
          //   config: {
          //     services: {
          //       youtube: true,
          //       coub: true
          //     }
          //   }
          // },
          // embed: Embed,

          table: {
            class: Table,
          },

          // inlineCode: {
          //   class: InlineCode,
          //   shortcut: 'CMD+SHIFT+M',
          // },

          attaches: {
            class: Attaches,
            config: {
              endpoint: 'http://localhost:8008/uploadFile'
            },
          },
          
          // Marker: {
          //   class: Marker,
          //   shortcut: 'CMD+SHIFT+M',
          // },
          

          paragraph: {
            class: Paragraph,
            inlineToolbar: false,
          },

          // personality: {
          //   class: Personality,
          //   config: {
          //     endpoint: 'http://localhost:8008/uploadFile'  // Your backend file uploader endpoint
          //   }
          // },


          delimiter: Delimiter,

          embed: {
            class: Embed,
            inlineToolbar: true,
            config: {
              services: {
                youtube: true,
                coub: true,
                codepen: {
                  height: 800,
                  width: 600,
                }
              }
            }
          },
          
          // embed: {
          //   class: Embed,
          //   inlineToolbar: true,
          //   config: {
          //     services: {
          //       youtube: true,
          //       coub: true,
          //       codepen: {
          //         // regex: /https?:\/\/codepen.io\/([^\/\?\&]*)\/pen\/([^\/\?\&]*)/,
          //         // embedUrl: 'https://codepen.io/<%= remote_id %>?height=300&theme-id=0&default-tab=css,result&embed-version=2',
          //         // html: "<iframe height='421px' scrolling='no' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%; height : 421px'></iframe>",
          //         height: 421,
          //         width: 600,
          //         // id: (groups) => groups.join('/embed/')
          //       }
          //     }
          //   }
          // },

          table: {
            class: Table,
            inlineToolbar: true,
            shortcut: 'CMD+ALT+T'
          },

        },

        data : {blocks : editorData.blocks},
      })
      )
    }, []);

    return (
        <>
          {editor ? 
          <>
            <div id="editor">
            </div>
            
          </>
          : null}
        </>
    )
}

export default Editor;
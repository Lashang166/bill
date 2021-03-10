import React from 'react';

import EditorReadOnly from '../EditorReadOnly/EditorReadOnly';

const SaleBody = ({
    productDesc,
    editor
}) => {

    return (
        <>
		<h3>รายละเอียดสินค้า</h3>
            {productDesc.filter(desc => desc.line !== "").map((desc, index) => {
                return(
				
                    <div class="content">
						<ul>
							<li>{desc.line}</li>
						</ul>
                    </div>
                )
            })}
            <EditorReadOnly 
                editorData={editor}
            />
        </>
    )
}

export default SaleBody;
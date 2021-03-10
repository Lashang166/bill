import React, { Fragment } from 'react';
import { Drawer, SIZE, ANCHOR } from 'baseui/drawer';

const BWDrawer = ({ children, ...props }) => {

  return (
    <Fragment>
      <Drawer {...props}>{children}</Drawer>
    </Fragment>
  );
};

export { SIZE, ANCHOR };
export default BWDrawer;

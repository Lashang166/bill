import React from 'react';
import { Button as BaseButton, SIZE, SHAPE, KIND } from 'baseui/button';
import { getPaddingStyles, getBorderRadiiStyles } from './ButtonProductForm.style';

const Button = ({ children, overrides, ...props }) => {
  return (
    <BaseButton
      {...props}
      overrides={{
        BaseButton: {
          style: ({ $theme, $size, $shape }) => {
            return {
              ...getPaddingStyles({ $theme, $size }),
              ...getBorderRadiiStyles({ $theme, $size, $shape }),
            };
          },
        },
        ...overrides,
      }}
    >
      {children}
    </BaseButton>
  );
};

export { SIZE, SHAPE, KIND };
export default Button;

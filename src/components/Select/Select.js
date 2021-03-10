import * as React from 'react';
import { Select } from 'baseui/select';
// import { CaretDownIcon } from 'assets/icons/CaretDownIcon';

export const getContainerFontStyle = ({ $theme }) => {
  return $theme.typography.fontBold14;
};

export default ({ ...props }) => {
  return (
    <Select
      overrides={{
        SelectArrow: () => {
          // return <CaretDownIcon />;
          return (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='10'
              height='5'
              viewBox='0 0 10 5'
            >
              <path
                data-name='_ionicons_svg_md-arrow-dropdown (2)'
                d='M128,192l5,5,5-5Z'
                transform='translate(-128 -192)'
                fill='currentColor'
              />
            </svg>);
        },
        Popover: {
          props: {
            overrides: {
              Body: {
                style: { zIndex: 1 },
              },
            },
          },
        },
        Placeholder: {
          style: ({ $theme }) => ({
            color: $theme.colors.textDark,
            ...getContainerFontStyle({ $theme }),
          }),
        },
        SingleValue: {
          style: ({ $theme }) => ({
            ...getContainerFontStyle({ $theme }),
            color: $theme.colors.textDark,
            lineHeight: '1.5',
          }),
        },
        DropdownListItem: {
          style: ({ $theme }) => ({
            fontSize: '14px',
            fontWeight: '700',
            color: $theme.colors.textDark,
          }),
        },
        OptionContent: {
          style: ({ $theme, $selected }) => {
            return {
              ...$theme.typography.fontBold14,
              color: $selected
                ? $theme.colors.textDark
                : $theme.colors.textNormal,
            };
          },
        },
        DropdownOption: {
          style: ({ $theme }) => ({
            fontSize: '14px',
            fontWeight: '700',
            color: $theme.colors.textDark,
          }),
        },
      }}
      {...props}
    />
  );
};

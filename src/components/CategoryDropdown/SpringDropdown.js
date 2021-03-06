import React, { memo } from 'react';
import { useSpring, animated } from 'react-spring';
import { useMeasure, usePrevious } from '../../helper/hooks';
import { DropdownWrapper, Dropdown, Title, Content, IconWrapper, } from './CategoryDropdown.style';
import CategoryIcon from './CategoryIcon';
const DropdownSubItem = ({ title, activeClass, onClick, }) => {
    return (<Title className={activeClass} onClick={onClick}>
      {title}
    </Title>);
};
const DropdownItem = memo(({ activeClass, title, onClick, isOpen, children, categoryIcon, iconArrays, }) => {
    const previous = usePrevious(isOpen);
    const [bind, { height: viewHeight }] = useMeasure();
    const { height, opacity, transform } = useSpring({
        from: { height: 0, opacity: 0, transform: 'translate3d(25px,0,0)' },
        to: {
            height: isOpen ? viewHeight : 0,
            opacity: isOpen ? 1 : 0,
            transform: `translate3d(${isOpen ? 0 : 25}px,0,0)`,
        },
    });
    return (<Dropdown className={isOpen ? 'open' : ''} isOpen={isOpen}>
        <Title className={activeClass} onClick={onClick}>
          {categoryIcon ? (<IconWrapper>
              <CategoryIcon name={categoryIcon} iconArray={iconArrays}/>
            </IconWrapper>) : null}
          <span>{title}</span>
        </Title>

        <Content style={{
        opacity,
        height: isOpen && previous === !isOpen ? 'auto' : height,
    }}>
          <animated.div style={{ transform }} {...bind}>
            {children}
          </animated.div>
        </Content>
      </Dropdown>);
});
const CategoryDropdown = ({ className, items = [], handleCategorySelection, selectedQueries, iconList, }) => {
    const addAllClasses = ['category-dropdown'];
    if (className) {
        addAllClasses.push(className);
    }
    return (<DropdownWrapper className={className}>
      {items.length !== 0 &&
        items.map(dropdown => {
            return (<DropdownItem key={dropdown.slug} title={dropdown.title} iconArrays={iconList} categoryIcon={dropdown.icon} activeClass={selectedQueries && selectedQueries.includes(dropdown.slug)
                ? 'active'
                : ''} isOpen={selectedQueries &&
                (selectedQueries.includes(dropdown.slug) ||
                    dropdown.children.find(children => selectedQueries.includes(children.slug)))} onClick={() => {
                handleCategorySelection(dropdown.slug);
            }}>
              {dropdown.children.map((item) => {
                return (<DropdownSubItem key={item.slug} title={item.title} onClick={() => {
                    handleCategorySelection(item.slug);
                }} activeClass={selectedQueries && selectedQueries.includes(item.slug)
                    ? 'active'
                    : ''}/>);
            })}
            </DropdownItem>);
        })}
    </DropdownWrapper>);
};
export default CategoryDropdown;

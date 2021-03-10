import React, { useState, Fragment } from 'react';
import InputWrapper, { VerifiedLabel, VerifictionButton } from './Input.style';
import { FormattedMessage } from 'react-intl';
const Input = ({ type, value, label, name, style, disabled, className, onUpdate, placeholder, intlPlaceholderId, intlInputLabelId, onBlur, onFocus, verification, verified, handleVerification, secondaryComponent, searchIcon, iconPosition, containerStyle, ...rest }) => {
    const [state, setState] = useState({
        value: value,
    });
    const addAllClasses = ['field-wrapper'];
    if (className) {
        addAllClasses.push(className);
    }
    if (disabled) {
        addAllClasses.push('disabled');
    }
    if (searchIcon) {
        addAllClasses.push('with-search-icon');
    }
    if (verification) {
        verified
            ? addAllClasses.push('number-verified')
            : addAllClasses.push('send-verification');
    }
    const handleOnChange = (e) => {
        let currentValue = e.target.value;
        setState({
            ...state,
            value: currentValue,
        });
        onUpdate(currentValue);
    };
    let htmlFor, inputElement;
    if (label) {
        htmlFor = label.replace(/\s+/g, '_').toLowerCase();
    }
    const position = iconPosition || 'left';
    const SearchIcon = searchIcon && (<span className={`${position === 'right' ? 'right' : 'left'} search-icon`}>
      {searchIcon}
    </span>);
    const withSearchIconClass = searchIcon && position === 'right'
        ? 'icon-right'
        : position === 'left'
            ? 'icon-left'
            : '';
    const LabelField = label && (<label htmlFor={htmlFor}>
      <FormattedMessage id={intlInputLabelId ? intlInputLabelId : 'defaultIntlInputLabelId'} defaultMessage={label}/>
    </label>);
    switch (type) {
        case 'textarea':
            inputElement = (<div className="inner-wrap">
          <FormattedMessage id={intlPlaceholderId ? intlPlaceholderId : 'defaultIntlId'} defaultMessage="&nbsp;">
            {placeholder => (<textarea id={htmlFor} name={name} disabled={disabled} value={value ? value : state.value} onChange={handleOnChange} placeholder={placeholder} onBlur={onBlur} onFocus={onFocus} style={style} {...rest}/>)}
          </FormattedMessage>
        </div>);
            break;
        case 'number':
            inputElement = (<div className="inner-wrap">
          <FormattedMessage id={intlPlaceholderId ? intlPlaceholderId : 'defaultIntlId'} defaultMessage="&nbsp;">
            {placeholder => (<input type="number" id={htmlFor} name={name} disabled={disabled} value={value ? value : state.value} onChange={handleOnChange} placeholder={placeholder} onBlur={onBlur} onFocus={onFocus} style={style} {...rest}/>)}
          </FormattedMessage>
          {verification && (<Fragment>
              {verified ? (<VerifiedLabel>
                  <FormattedMessage id="inputVerified" defaultMessage="Verified"/>
                </VerifiedLabel>) : (<VerifictionButton onClick={handleVerification}>
                  <FormattedMessage id="inputSendVerification" defaultMessage="Send Verification"/>
                </VerifictionButton>)}
            </Fragment>)}
        </div>);
            break;
        case 'password':
            inputElement = (<div className="inner-wrap">
          <FormattedMessage id={intlPlaceholderId ? intlPlaceholderId : 'defaultIntlId'} defaultMessage="&nbsp;">
            {placeholder => (<input type="password" id={htmlFor} name={name} disabled={disabled} value={value ? value : state.value} onChange={handleOnChange} onBlur={onBlur} onFocus={onFocus} style={style}/>)}
          </FormattedMessage>
        </div>);
            break;
        case 'email':
            inputElement = (<div className="inner-wrap">
          <FormattedMessage id={intlPlaceholderId ? intlPlaceholderId : 'defaultIntlId'} defaultMessage="&nbsp;">
            {placeholder => (<input type="email" id={htmlFor} name={name} disabled={disabled} value={value ? value : state.value} onChange={handleOnChange} placeholder={placeholder} onBlur={onBlur} onFocus={onFocus} style={style} {...rest}/>)}
          </FormattedMessage>
        </div>);
            break;
        default:
            inputElement = (<div className="inner-wrap">
          {position === 'left' && SearchIcon}
          <FormattedMessage id={intlPlaceholderId ? intlPlaceholderId : 'defaultIntlId'} defaultMessage="&nbsp;">
            {placeholder => (<input type="text" id={htmlFor} name={name} value={value ? value : state.value} onChange={handleOnChange} placeholder={placeholder} onBlur={onBlur} onFocus={onFocus} style={style} className={withSearchIconClass} {...rest}/>)}
          </FormattedMessage>
          {position === 'right' && SearchIcon}
        </div>);
            break;
    }
    return (<InputWrapper className={addAllClasses.join(' ')} style={containerStyle}>
      {LabelField || secondaryComponent ? (<div>
          {LabelField} {secondaryComponent}
        </div>) : ('')}
      {inputElement}
    </InputWrapper>);
};
export default Input;

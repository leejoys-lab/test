import React from "react";
import styled from "styled-components";

const Input = (props) => {
  return (
    <StInput
      textAlign={props.textAlign}
      disabled={props.disabled}
      name={props.name}
      value={props.value}
      defaultValue={props.defaultValue}
      onInput={props.onInput}
      backgroundColor={props.backgroundColor}
      background={props.background}
      color={props.color}
      hoverBacground={props.hoverBacground}
      hoverColor={props.hoverColor}
      type={props.type || "input"}
      onClick={props.onClick}
      fontSize={props.fontSize}
      margin={props.margin}
      width={props.width}
      fontFamily={props.fontFamily}
      padding={props.padding}
      height={props.height}
      onChange={props.onChange}
      maxLength={props.maxLength}
      placeholder={props.placeholder}
      marginTop={props.marginTop}
    >
      {props.children}
    </StInput>
  );
};

export default Input;
const StInput = styled.input`
  text-align: ${({ textAlign }) => textAlign};
  border-radius: 12px;
  padding: ${({ padding }) => padding || "19px 16px 19px 16px"};
  //cursor: pointer;
  margin: ${({ margin }) => margin || "8px 0px 8px 0px"};
  background-color: ${({ backgroundColor }) => backgroundColor || "#FFFDFA"};
  color: ${({ color }) => color || "#525355"};
  border: ${({ border }) => border || "1px solid #dcdcdc"};
  font-size: ${({ fontSize }) => fontSize || "1.6rem"};
  font-weight: ${({ fontWeight }) => fontWeight || "700"};
  font-family: ${({ fontFamily }) => fontFamily || "Pretendard-Regular"};
  width: ${({ width }) => width || "319px"};
  height: ${({ height }) => height || "59px"};
  border: ${({ border }) => border || "1px solid #F1E5D2"};
  color: ${({ color }) => color || "#595550"};

  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  :disabled {
    background: #f9f3ea;
  }
`;

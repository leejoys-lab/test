import React from "react";
import styled from "styled-components";

const ButtonS = (props) => {
  return (
    <StButton
      className={props.className}
      backgroundColor={props.backgroundColor}
      background={props.background}
      color={props.color}
      hoverBacground={props.hoverBacground}
      hoverColor={props.hoverColor}
      type={props.type || "button"}
      onClick={props.onClick}
      fontSize={props.fontSize}
      fontWeight={props.fontWeight}
      margin={props.margin}
      marginTop={props.marginTop}
      width={props.width}
      fontFamily={props.fontFamily}
      padding={props.padding}
      height={props.height}
      display={props.display}
      justifyContent={props.justifyContent}
      paddingLeft={props.paddingLeft}
      gap={props.gap}
      filter={props.filter}
      disabled={props.disabled}
      textDecoration={props.textDecoration}
      fontStyle={props.fontStyle}
      animation={props.animation}
      underlinePosition={props.underlinePosition}
    >
      {props.children}
    </StButton>
  );
};

export default ButtonS;
const StButton = styled.button`
  margin-top: ${({ marginTop }) => marginTop};
  border-radius: 12px;
  padding: ${({ padding }) => padding || "10px"};
  cursor: pointer;
  //margin: ${({ margin }) => margin || "0 5px 0 0"};
  background-color: ${({ backgroundColor }) => backgroundColor || "#F27808"};
  color: ${({ color }) => color || "#F9F3EA"};
  border: ${({ border }) => border};
  font-size: ${({ fontSize }) => fontSize || "1.6rem"};
  font-weight: ${({ fontWeight }) => fontWeight || "700"};
  font-family: ${({ fontFamily }) => fontFamily || "MaplestoryOTFBold"};
  font-style: ${({ fontStyle }) => fontStyle};
  width: ${({ width }) => width || "101px"};
  height: ${({ height }) => height || "43px"};
  text-decoration: ${({ textDecoration }) => textDecoration};
  text-underline-position: ${({ underlinePosition }) => underlinePosition};
  animation: ${({ animation }) => animation};
  filter: ${({ filter }) =>
    filter || "drop-shadow(0px 4px 0px rgba(0, 0, 0, 0.25))"};
  /* &.disabled {
    background-color: ${({ backgroundColor }) =>
    backgroundColor || "rgba(88, 132, 224, 0.7)"};
    color: ${({ color }) => color || "#fff"};
  }
  &.active {
    background-color: ${({ backgroundColor }) =>
    backgroundColor || "var(--color-point-blue)"};
    color: ${({ color }) => color || "#fff"};
  } */
  &.reverse {
    background-color: ${({ backgroundColor }) => backgroundColor || "#F9F3EA"};
    color: ${({ color }) => color || "#F27808"};
    border: ${({ border }) => border || "1px solid #F27808"};
  }
`;

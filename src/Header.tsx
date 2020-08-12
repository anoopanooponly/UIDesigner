import styled from 'styled-components';
import React, { Component } from 'react';

const Header1 = styled.div`
color: #444;
  width: 100%;
  height: 50px;
  background-color: white;
  border-bottom: 1px solid #e1e1e1;
  display: flex;
   justify-content: space-between;
  `;

const HeaderLogo = styled.div`
width: 80px;
    /* padding: 0 10px; */
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    border-right: 1px solid #e1e1e1;
    transition: visibility 0s linear 0s, opacity 300ms;
`

const MiddleHeader = styled.div`
width: calc(100% - 51px);
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    `

   const MiddleHeaderLeft = styled.div`
   display: flex;
    align-items: center;
    height: 100%;
    width: 100%;
    justify-content: flex-start;
    ` 

const MiddleHeadercenter = styled.div`
display: flex;
    justify-content: center;
    align-content: center;
 ` 

const MiddleHeaderright = styled.div`
display: flex;
height: 100%;
    justify-content: flex-end;
    align-content: center;
    width: 100%;
 ` 

// Create a Title component that'll render an <h1> tag with some styles
const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const Header = () => {
  return (
  
    <Header1>
      <HeaderLogo>New App</HeaderLogo>
      <MiddleHeader>
        <MiddleHeaderLeft>Left</MiddleHeaderLeft>
        <MiddleHeadercenter>center</MiddleHeadercenter>
        <MiddleHeaderright>Right</MiddleHeaderright>
        </MiddleHeader> 
       
    </Header1>
  
 );
}

export default Header;
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import styled from 'styled-components';
import Header from './Header';
import MainPanel from './MainSection';

const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;

const Container =styled.div`
  background: #dcdcdc;
  `;


const App = () => {
  return (
   <Container>
    <Header /> 
    <MainPanel/>
  </Container>
 );
}

export default App;

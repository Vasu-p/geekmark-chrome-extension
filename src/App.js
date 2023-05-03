/*global chrome*/
import React from 'react';
import './App.css';
// components
import {
  Navbar,
  Container,
  Toast,
  ToastContainer,
  Tabs,
  Tab,
  Form,
} from 'react-bootstrap';

import ReactJson from 'react-json-view';

// custom compos
import { useShowToast } from './utils/hooks/useShowToast';
import { RulesTab } from './components/RulesTab';

function App() {
  const {
    show: isSuccesfulSaveToastVisible,
    showToast: showSuccesfulSaveToast,
  } = useShowToast(false, 3000);

  return (
    <div className="App">
      <Navbar bg={'light'}>
        <Container>
          <Navbar.Brand href="#home">
            <img src="/icon.png" className="App-icon" />
            Geekmark
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Tabs className="mt-1">
        <Tab title={'Rules'} eventKey={'custom'}>
          <RulesTab onRulesSave={showSuccesfulSaveToast} />
        </Tab>
      </Tabs>
      <ToastContainer position="bottom-center" className="mb-3">
        <Toast show={isSuccesfulSaveToastVisible}>
          <Toast.Body>Rules Saved Succesfully</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

export default App;

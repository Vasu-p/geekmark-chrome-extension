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
} from 'react-bootstrap';
import { QuestionCircle } from 'react-bootstrap-icons';

// custom compos
import { useShowToast } from './utils/hooks/useShowToast';
import { RulesTab } from './components/RulesTab';
import { DatasetsTab } from './components/DatasetsTab';

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
          <QuestionCircle className="ms-auto App-icon" size={32} />
        </Container>
      </Navbar>
      <Tabs className="mt-1">
        <Tab title={'Rules'} eventKey={'custom'}>
          <RulesTab onRulesSave={showSuccesfulSaveToast} />
        </Tab>
        <Tab title={'Datasets'} eventKey={'datasets'}>
          <DatasetsTab onDatasetsSave={showSuccesfulSaveToast} />
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

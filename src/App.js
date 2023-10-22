/*global chrome*/
import React, { useState } from 'react';
import './App.css';
// components
import {
  Navbar,
  Container,
  Toast,
  ToastContainer,
  Tabs,
  Tab,
  Dropdown,
} from 'react-bootstrap';
import { QuestionCircle, List } from 'react-bootstrap-icons';

// custom compos
import { useShowToast } from './utils/hooks/useShowToast';
import { RulesTab } from './components/RulesTab';
import { DatasetsTab } from './components/DatasetsTab';
import { HelpModal } from './components/HelpModal';
import { AppOptions } from './components/AppOptions';

function App() {
  const {
    show: isSuccesfulSaveToastVisible,
    showToast: showSuccesfulSaveToast,
  } = useShowToast(false, 3000);
  const [showHelpModal, setShowHelpModal] = useState(false);

  return (
    <div className="App">
      <Navbar bg={'light'}>
        <Container>
          <Navbar.Brand href="#home">
            <img src="/icon.png" className="App-icon" />
            Geekmark
          </Navbar.Brand>
          <QuestionCircle
            className="ms-auto App-icon"
            size={24}
            onClick={() => setShowHelpModal(true)}
            style={{ cursor: 'pointer' }}
          />
          <AppOptions />
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
      <HelpModal show={showHelpModal} onClose={() => setShowHelpModal(false)} />
      <ToastContainer position="bottom-center" className="mb-3">
        <Toast show={isSuccesfulSaveToastVisible}>
          <Toast.Body>Rules Saved Succesfully</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

export default App;

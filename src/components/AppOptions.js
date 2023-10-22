import { useCallback, useRef } from 'react';
import { Dropdown, ToastContainer, Toast } from 'react-bootstrap';
import { List } from 'react-bootstrap-icons';
import { useLocalStorage } from '../utils/hooks/useLocalStorage';
import { useShowToast } from '../utils/hooks/useShowToast';

export const AppOptions = () => {
  const importFileRef = useRef(null);
  const { setData: setRules } = useLocalStorage('rules', 'array');
  const { show: isShowSuccessToast, showToast: showSuccessToast } =
    useShowToast();

  const handleImportFileUpload = useCallback(() => {
    importFileRef.current?.click();
  }, []);

  const handleImport = useCallback(() => {
    const file = importFileRef.current?.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const importContents = JSON.parse(reader.result);
        // filter out the rules from import contents
        const importedRules = importContents
          .filter((content) => content.type === 'rule')
          .map((rule) => rule.data);
        setRules(importedRules);
        showSuccessToast();
      };
      reader.readAsText(file);
    }
  }, [setRules, showSuccessToast]);

  return (
    <>
      <input
        type="file"
        ref={importFileRef}
        className="d-none"
        onChange={handleImport}
      />
      <Dropdown>
        <Dropdown.Toggle variant="light" id="dropdown-basic">
          <List size={24} />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={handleImportFileUpload}>Import</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <ToastContainer position="bottom-center" className="mb-3">
        <Toast show={isShowSuccessToast}>
          <Toast.Body>Operation Succesful</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

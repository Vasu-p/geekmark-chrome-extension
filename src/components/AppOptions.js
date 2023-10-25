/*global chrome*/
import { useCallback, useRef } from 'react';
import { Dropdown } from 'react-bootstrap';
import { List } from 'react-bootstrap-icons';
import { useChromeStorageLocal } from 'use-chrome-storage';

export const AppOptions = () => {
  const importFileRef = useRef(null);
  const [rules, setRules] = useChromeStorageLocal('rules');
  const [datasets, setDatasets] = useChromeStorageLocal('datasets');

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
        const importedDatasets = importContents
          .filter((content) => content.type === 'dataset')
          .map((dataset) => dataset.data);
        setRules([...rules, ...importedRules]);
        setDatasets([...datasets, ...importedDatasets]);
        chrome.tabs.reload();
      };
      reader.readAsText(file);
    }
  }, [rules, datasets, setRules, setDatasets]);

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
    </>
  );
};

/**
 * Transform dataset to format as in mock/datasets
 * @param {*} dataset
 */
export const transformDataset = (dataset) => {
  dataset.values = dataset.values.map((value) => ({ name: value }));
  return dataset;
};

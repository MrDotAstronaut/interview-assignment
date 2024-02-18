import { test } from '../utils/fixture.util';
import { data } from '../data/test-data';

test('Part 1 : Data Verification', async ({
  assert,
  loginPage,
  dashboardPage,
  historyByStore
}) => {
  await loginPage.launchURL(data.url);
  await loginPage.login(data.testUser.username, data.testUser.password);
  await dashboardPage.clearModal();
  await dashboardPage.selectChargeBackDropdownOption(data.optionChargeBackDropdown.historyByStore);
  const actual: string[] = await historyByStore.calculateTableColumnSum();
  const expected: string[] = await historyByStore.retrieveTotalValues();
  for(let i = 0; i < actual.length; i++){
    assert.toEqual(actual[i], `Column ${i + 1} Total`, expected[i]);
  }
});

test.only('Part 2 : Data Extraction and Validation', async ({
  assert,
  loginPage,
  dashboardPage,
  transactions
}) => {
  await loginPage.launchURL(data.url);
  await loginPage.login(data.testUser.username, data.testUser.password);
  await dashboardPage.clearModal();
  await dashboardPage.selectChargeBackDropdownOption(data.optionChargeBackDropdown.transactions);
  await transactions.selectDropdownOption(data.optionTransactionDropdown.locations, [
    data.optionLocationCheckbox.artisanAlchemy,
    data.optionLocationCheckbox.blissfulBuffet
  ]);
  await transactions.selectDropdownOption(data.optionTransactionDropdown.marketplaces, [
    data.optionMarketplaceCheckbox.grubhub
  ]);
  await transactions.createCSVFromTransactionTable();
  await transactions.downloadTransactionCSV();
  const rows = await transactions.getCSVTransactionValues(['./src/data/table-ui-data.csv','./src/data/table-csv-data.csv'],[0,0]);
  const columnIndices = [[0,0],[1,3],[3,6],[4,10],[5,9],[6,7],[7,8]]
  for(const columnIndex of columnIndices) {
    const diffArray = await transactions.compareCSVTransactionColumnValues(rows, columnIndex);
    assert.toBeTruthy(diffArray, `Column Values ${columnIndex[0]}`);
  }
});
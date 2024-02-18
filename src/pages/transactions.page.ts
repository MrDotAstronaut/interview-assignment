import { Page } from "@playwright/test";
import { Perform } from "../utils/perform.util";
import { Get } from "../utils/get.util";
import { Check } from "../utils/check.util";
import { Wait } from "../utils/wait.util";

import { compareCSVColumnValues, writeCSV } from "../utils/file.util";

export class TransactionsPage {
  private selector = {
    dropdownsOption: (option: string) =>
      `[data-testid='selectBtn'] span >> text=${option}`,
    checkboxSelectAll: "[data-testid='selectAllCheckbox'] input",
    checkboxOption: (option: string) => `li [aria-label='${option}'] input`,
    buttonApply: "[data-testid='applyBtn']",
    buttonDownloadCSV: "[aria-label='Export as CSV'] button",
    tableHeader: '//th//h6',
    tableRowText: (index: number) => `//tr[${index}]/td//h6`,
    tableRoxType: (index: number) => `//tr[${index}]/td//span`,
    rowValues: (index: number) => `//tr[${index}]/td`,
    rowValuesFirstThreeColumns: (index: number) => `//tr[${index}]/td[position() > 0 and position() < 4]`,
    columnValues: (index: number) => `//tr/td[${index}]/h6`,
    chartCanvas: '.apexcharts-canvas',
    buttonNextPage: "[data-testid='pagination-next']",
    buttonNextPageDisabled: "[data-testid='pagination-next'].Mui-disabled"
  };

  private page: Page;
  private perform: Perform;
  private get: Get;
  private check: Check;
  private wait: Wait;

  constructor(page: Page) {
    this.page = page;
    this.perform = new Perform(page);
    this.get = new Get(page);
    this.check = new Check(page);
    this.wait = new Wait(page);
  }

  async selectDropdownOption(dropdownName: string, dropdownOption: string[]): Promise<void> {
    await this.perform.click(this.selector.dropdownsOption(dropdownName), `${dropdownName} dropdown`);
    await this.perform.click(this.selector.checkboxSelectAll, "Unselect All");
    for (let i = 0; i < dropdownOption.length; i++)
      await this.perform.click(this.selector.checkboxOption(dropdownOption[i]), `${dropdownOption[i]} checkbox`);
    await this.perform.click(this.selector.buttonApply, "Apply");
    await this.wait.forLocator(this.selector.chartCanvas);
  }

  async createCSVFromTransactionTable(): Promise<void> {
    let mapRecord: Map<number, string[]> = new Map();
    let rowCount: number = await this.get.count(this.selector.columnValues(5));
    let index: number = 0;
    let position: number = 0;
    while (true) {
      for (let i = 1; i <= rowCount; i++) {
        if (await this.get.count(this.selector.rowValues(i)) === 8) {
          mapRecord.set(index, await this.get.textAll(this.selector.rowValues(i)));
          position = i;
          index++;
        }
        else {
          let array: string[] = await this.get.textAll(this.selector.rowValuesFirstThreeColumns(position));
          array = array.concat(await this.get.textAll(this.selector.rowValues(i)));
          mapRecord.set(index, array);
          index++;
        }
      }
      if (await this.check.isVisible(this.selector.buttonNextPageDisabled))
        break;
      await this.perform.click(this.selector.buttonNextPage, 'Next Button');
      rowCount = await this.get.count(this.selector.columnValues(5));
    }
    mapRecord.forEach((value) => value[7] = value[7].replace(',',''));
    writeCSV('./src/data/table-ui-data.csv', await this.get.textAll(this.selector.tableHeader), mapRecord);
  }

  async downloadTransactionCSV(): Promise<void> {
    const downloadPromise = this.wait.forEvent('download');
    await this.perform.click(this.selector.buttonDownloadCSV, 'Download CSV Button');
    const download = await downloadPromise;
    await download.saveAs('./src/data/table-csv-data.csv');
  }

  async getCSVTransactionValues(path: string[], index: number[]) {
    const rows = compareCSVColumnValues([path[0],path[1]]);
    return rows;
  }

  async compareCSVTransactionColumnValues(rows: string[][], index: number[]) {
    let rowCount =  rows[0].length - 2;
    let difference = new Array(rowCount).fill(false);
    for (let i = 0; i <= rowCount; i++) {
      const row1 = rows[0][i].split(',');
      const row2 = rows[1][i].split(',');
      let value1 = row1[index[0]];
      let value2 = row2[index[1]];
      if(index[0] === 3) {
        value1 = value1.toUpperCase().replace(' ','_').replace(' / ','_');
      }
      else if(index[0] === 4) {
        value1 = value1.replace('$','').replace('.00','.0');
      }
      else if(index[0] === 5) {
        value1 = value1.replace('$','');
      }
      else if(index[0] === 6) {
        value1 = value1.replace('PENDING','');
      }
      else if(index[0] === 7) {
        value1 = new Date(value1).toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' });
        value2 = new Date(value2).toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' });
      }
      difference[i] = value1.includes(value2);
      if(difference[i] === false)
        return difference[i];
      //console.log(value1 + ' | ' + value2);
      //console.log(difference[i]);
    }
    return difference;
  }

}

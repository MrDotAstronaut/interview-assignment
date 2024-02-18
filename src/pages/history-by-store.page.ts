import { Page } from '@playwright/test';
import { Perform } from '../utils/perform.util';
import { Get } from '../utils/get.util';
import { Check } from '../utils/check.util';
import { Wait } from '../utils/wait.util';

export class HistoryByStorePage {

  private selector = {
    tableHeader: '//th[position() > 1 and position() < 9]',
    columnRecord: (index: number, value: string) => `//tr//td[${index}]/h6[text()='${value}']`,
    columnValues: (index: number) => `//tr/td[${index}]/h6`,
    rowValues: (index: number) => `//tr[${index}]/td[position() >1 and position() < 9]/h6`,
    buttonNextPage: "[data-testid='pagination-next']",
    buttonNextPageDisabled: "[data-testid='pagination-next'].Mui-disabled"
  }

  private perform: Perform;
  private get: Get;
  private check: Check;
  private wait: Wait;

  constructor(page: Page) {
    this.perform = new Perform(page);
    this.get = new Get(page);
    this.check = new Check(page);
    this.wait = new Wait(page);
  }

  async retrieveTotalValues(): Promise<string[]> {
    const totalStr: string[] = await this.get.textAll(this.selector.rowValues(8));
    return totalStr;
  }

  async calculateTableColumnSum(): Promise<string[]> {
    await this.wait.forLocator(this.selector.columnRecord(1, 'Grand Total'));
    let recordMap: Map<number,string[]> = new Map();
    let rowCount: number = await this.get.count(this.selector.columnValues(1));
    let index: number = 0;
    while(true) {
      for(let i = 1; i <= rowCount - 1; i++) {
        recordMap.set(index, await this.get.textAll(this.selector.rowValues(i)));
        index++;
      }
      if(await this.check.isVisible(this.selector.buttonNextPageDisabled))
        break;
      await this.perform.click(this.selector.buttonNextPage, 'Next Button');
      rowCount = await this.get.count(this.selector.columnValues(1));
    }
    let monthCount: number = await this.get.count(this.selector.tableHeader);
    let resultNum: number[] = new Array(monthCount).fill(0);
    let resultStr: string[] = new Array();
    let twoDArray: string[][] = Array.from(recordMap.values());
    for(let i = 0; i < monthCount; i++) {
      for(let j = 0; j < twoDArray.length; j++) {
        twoDArray[j][i] = twoDArray[j][i].replace(/\$/,'').replace(/,/g,'');
        resultNum[i] = resultNum[i] + parseFloat(twoDArray[j][i]);
      }
      resultStr.push(resultNum[i].toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }));
    }
    return resultStr;
  }

}
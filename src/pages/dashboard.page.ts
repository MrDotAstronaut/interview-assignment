import { Page } from '@playwright/test';
import { Perform } from '../utils/perform.util';
import { Get } from '../utils/get.util';
import { Check } from '../utils/check.util';
import { Wait } from '../utils/wait.util';

export class DashboardPage {

    private selector = {
        modalText: "//h3[text()='Please link your email to your phone number']",
        modalLinkSkipForNow: "//button[text()='Skip for now']",
        dropdownChargeBack: ".MuiList-root [data-testid='ExpandMoreIcon']",
        dropdownOptionsChargeBack: (option: string) => `//span[text()='${option}']`
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

	async clearModal(): Promise<void> {
        await this.wait.forLocator(this.selector.modalText);
        await this.perform.click(this.selector.modalLinkSkipForNow, "Skip for now");
    }

    async selectChargeBackDropdownOption(option: string): Promise<void> {
        await this.perform.click(this.selector.dropdownChargeBack, '3P Chargebacks');
        await this.perform.click(this.selector.dropdownOptionsChargeBack(option), option);
    }

}
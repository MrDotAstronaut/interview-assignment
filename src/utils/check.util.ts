import { Page } from "@playwright/test";

export class Check {

    private page: Page;

    constructor(page: Page){
        this.page = page;
    }

    async isVisible(selector: string): Promise<boolean> {
        const isVisible = await this.page.locator(selector).isVisible({ timeout: 5000 });
        return isVisible;
    }

    async isHidden(selector: string): Promise<boolean> {
        const isHidden = await this.page.locator(selector).isHidden();
        return isHidden;
    }

    async isEnabled(selector: string): Promise<boolean> {
        const isEnabled = await this.page.locator(selector).isEnabled();
        return isEnabled;
    }

    async isDisabled(selector: string): Promise<boolean> {
        const isDisabled = await this.page.locator(selector).isDisabled();
        return isDisabled;
    }

    async isChecked(selector: string): Promise<boolean> {
        const isChecked = await this.page.locator(selector).isChecked();
        return isChecked;
    }

    async isEditable(selector: string): Promise<boolean> {
        const isEditable = await this.page.locator(selector).isEditable();
        return isEditable;
    }

}
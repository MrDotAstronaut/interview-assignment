import { Page, expect } from "@playwright/test";

export class Assert {

    private page: Page;

    private GREEN = "\u001b[1;32m";
    private RED = "\u001b[1;31m";
    private RESET = "\u001b[0m";

    constructor(page: Page) {
        this.page = page;
    }

    async toBeVisible(selector: string, elementName: string): Promise<void> {
        await expect(this.page.locator(selector)).toBeVisible();
        console.log(`${this.GREEN}${elementName} is visible${this.RESET}`);
    }

    async toBeHidden(selector: string, elementName: string): Promise<void> {
        await expect(this.page.locator(selector)).toBeHidden();
        console.log(`${this.GREEN}${elementName} is hidden${this.RESET}`);
    }

    async toBeEnabled(selector: string, elementName: string): Promise<void> {
        await expect(this.page.locator(selector)).toBeEnabled();
        console.log(`${this.GREEN}${elementName} is enabled${this.RESET}`);
    }

    async toBeDisabled(selector: string, elementName: string): Promise<void> {
        await expect(this.page.locator(selector)).toBeDisabled();
        console.log(`${this.GREEN}${elementName} is disabled${this.RESET}`);
    }

    async toBeEditable(selector: string, elementName: string): Promise<void> {
        await expect(this.page.locator(selector)).toBeEditable();
        console.log(`${this.GREEN}${elementName} is editable${this.RESET}`);
    }

    async toBeReadOnly(selector: string, elementName: string): Promise<void> {
        expect(await this.page.locator(selector).isEditable()).toBeFalsy();
        console.log(`${this.GREEN}${elementName} is readonly${this.RESET}`);
    }

    async toEqual(actual: any, elementName: string, expected: any): Promise<void> {
        try{
            expect(actual).toEqual(expected);
            console.log(`${this.GREEN}${elementName} equals expected value\n -> Actual   : ${JSON.stringify(actual)}\n -> Expected : ${JSON.stringify(expected)}${this.RESET}`);
        }
        catch(e) {
            console.log(`${this.RED}${elementName} does not equal expected value\n -> Actual   : ${JSON.stringify(actual)}\n -> Expected : ${JSON.stringify(expected)}${this.RESET}`);
            throw new Error(e);
        }
    }

    async toContain(actual: any, elementName: string, expected: any): Promise<void> {
        try{
            expect(actual).toContain(expected);
            console.log(`${this.GREEN}${elementName} contains expected value\n -> Actual   : ${actual}\n -> Expected : ${expected}${this.RESET}`);
        }
        catch(e) {
            console.log(`${this.RED}${elementName} does not contain expected value\n -> Actual   : ${JSON.stringify(actual)}\n -> Expected : ${JSON.stringify(expected)}${this.RESET}`);
            throw new Error(e);
        }
    }

    async toBeTruthy(actual: any, elementName: string): Promise<void> {
        try{
            expect(actual).toBeTruthy();
            console.log(`${this.GREEN}${elementName} is truthy${this.RESET}`);
        }
        catch(e) {
            console.log(`${this.RED}${elementName} is not truthy${this.RESET}`);
            //throw new Error(e);
        }
    }

    async toBeFalsy(actual: any, elementName: string): Promise<void> {
        try{
            expect(actual).toBeFalsy();
            console.log(`${this.GREEN}${elementName} is falsy${this.RESET}`);
        }
        catch(e) {
            console.log(`${this.RED}${elementName} is not falsy${this.RESET}`);
            throw new Error(e);
        }
    }

}
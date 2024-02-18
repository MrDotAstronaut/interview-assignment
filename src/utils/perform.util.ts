import { Page } from "@playwright/test";

export class Perform {

    private page: Page;

    private BLUE = "\u001b[1;34m";
    private RESET = "\u001b[0m";

    constructor(page: Page){
        this.page = page;
    }

    async goto(url: string): Promise<void> {
        await this.page.goto(url);
        console.log(`Launched ${url}`);
    }

    async click(selector: string, elementName: string, optional?: { delay: number }): Promise<void> {
        if (optional != undefined) {
            await this.page.locator(selector).click({ delay: optional.delay });
            console.log(`Clicked ${elementName}`);
        }
        else {
            await this.page.locator(selector).click();
            console.log(`Clicked ${elementName}`);
        }
    }

    async check(selector: string, elementName: string, optional?: { delay: number }): Promise<void> {
        await this.page.locator(selector).check();
        console.log(`Clicked ${elementName}`);
    }

    async fill(selector: string, elementName: string, text: string): Promise<void> {
        await this.page.locator(selector).fill(text);
        console.log(`Filled ${this.BLUE}${text}${this.RESET} into ${elementName}`);
    }

    async type(selector: string, elementName: string, text: string): Promise<void> {
        await this.page.locator(selector).type(text);
        console.log(`Typed ${this.BLUE}${text}${this.RESET} into ${elementName}`);
    }

    async press(selector: string, elementName: string, key: string): Promise<void> {
        await this.page.locator(selector).press(key);
        console.log(`Pressed ${key} on ${elementName}`);
    }

    async clear(selector: string, elementName: string): Promise<void> {
        await this.page.locator(selector).clear();
        console.log(`Cleared ${elementName}`);
    }

    async selectSingle(selector: string, elementName: string, optional: { value?: string, label?: string, index?: number }): Promise<void> {
        if(optional.value){
            await this.page.locator(selector).selectOption({ value: optional.value });
            console.log(`Selected ${elementName} -> Value : ${optional.value}`);
        }
        else if(optional.label){
            await this.page.locator(selector).selectOption({ label: optional.label });
            console.log(`Selected ${elementName} -> Label : ${optional.label}`);
        }
        else if(optional.index){
            await this.page.locator(selector).selectOption({ index: optional.index });
            console.log(`Selected ${elementName} -> Index : ${optional.index}`);
        }
    }

    async selectMultiple(selector: string, elementName: string, optional: { values?: string[], labels?: string[] }): Promise<void> {
        if(optional.values){
            await this.page.locator(selector).selectOption(optional.values);
            console.log(`Selected ${elementName} -> Values : ${JSON.stringify(optional.values)}`);
        }
        else if(optional.labels){
            await this.page.locator(selector).selectOption(optional.labels);
            console.log(`Selected ${elementName} -> Labels : ${JSON.stringify(optional.labels)}`);
        }
    }

}
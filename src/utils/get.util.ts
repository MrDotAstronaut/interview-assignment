import { Page } from "@playwright/test";

export class Get {

    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async input(selector: string): Promise<string> {
        const input = await this.page.locator(selector).inputValue();
        return input;
    }

    async size(selector: string): Promise<{ x: number | undefined, y: number | undefined}> {
        const boundingBox = await this.page.locator(selector).boundingBox();
        const size = {
            x: boundingBox?.x,
            y: boundingBox?.y
        }
        return size;
    }

    async position(selector: string): Promise<{ height: number | undefined, width: number | undefined}> {
        const boundingBox = await this.page.locator(selector).boundingBox();
        const position = {
            height: boundingBox?.height,
            width: boundingBox?.width
        }
        return position;
    }

    async color(selector: string): Promise<string> {
        const color = await this.page.locator(selector).evaluate((element) => {
            return window.getComputedStyle(element).getPropertyValue("background-color");
        });
        return color;
    }

    async text(selector: string): Promise<string | null> {
        const text = await this.page.locator(selector).textContent();
        return text;
    }

    async textAll(selector: string): Promise<string[]> {
        const texts = await this.page.locator(selector).allTextContents();
        return texts;
    }

    async count(selector: string): Promise<number> {
        const count = await this.page.locator(selector).count();
        return count;
    }

}
import { Page } from "@playwright/test";

export class Wait {

    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async forLocator(selector: string): Promise<void> {
        await this.page.locator(selector).waitFor();
    }

    async forTimeout(optional?: { timeout: number }): Promise<void> {
        if (optional != undefined) {
            await this.page.waitForTimeout(optional.timeout);
            console.log(`Waited for ${optional.timeout / 1000}s`);
        }
        else {
            const timeout = 1000;
            await this.page.waitForTimeout(timeout);
            console.log(`Waited for ${timeout / 1000}s`);
        }
    }

    async forLoadState(optional?: { state: "load" | "domcontentloaded" | "networkidle", timeout?: number }): Promise<void> {
        if (optional != undefined) {
            if (optional.timeout != undefined) {
                await this.page.waitForLoadState(optional.state, { timeout: optional.timeout });
                console.log(`Waited for ${optional.state} state and ${optional.timeout / 1000}s`);
            }
            else {
                await this.page.waitForLoadState(optional.state);
                console.log(`Waited for ${optional.state} state`);
            }
        }
        else {
            await this.page.waitForLoadState();
            console.log(`Waited for load state`);
        }
    }

    async forEvent(event: string) {
        let promise;
        switch (event) {
            case "popup": {
                promise = this.page.waitForEvent(event);
                console.log(`Waited for ${event} event`);
                return promise;
            }
            case "dialog": {
                promise = this.page.waitForEvent(event);
                console.log(`Waited for ${event} event`);
                return promise;
            }
            case "download": {
                promise = this.page.waitForEvent(event);
                console.log(`Waited for ${event} event`);
                return promise;
            }
            case "filechooser": {
                promise = this.page.waitForEvent(event);
                console.log(`Waited for ${event} event`);
                return promise;
            }
            default: throw new Error(`Please provide a valid argument -> "popup" | "dialog" | "download" | "filechooser"`)
        }
    }

    async forRequest(endpoint: string, optional?: { method?: string, timeout?: number }): Promise<void> {
        if (optional != undefined) {
            if (optional.method) {
                await this.page.waitForRequest(request => request.url() === endpoint && request.method() === optional.method);
                console.log(`Waited for ${endpoint} request with ${optional.method} method`);
            }
            else if (optional.timeout) {
                await this.page.waitForRequest(endpoint, { timeout: optional.timeout });
                console.log(`Waited for ${endpoint} request and ${optional.timeout / 1000}s`);
            }
            else {
                await this.page.waitForRequest(endpoint);
                console.log(`Waited for ${endpoint} request`);
            }
        }
    }

    async forResponse(endpoint: string, optional?: { status?: number, timeout?: number }): Promise<void> {
        if (optional != undefined) {
            if (optional.status) {
                await this.page.waitForResponse(response => response.url() === endpoint && response.status() === optional.status);
                console.log(`Waited for ${endpoint} request with ${optional.status} status`);
            }
            else if (optional.timeout) {
                await this.page.waitForResponse(endpoint, { timeout: optional.timeout });
                console.log(`Waited for ${endpoint} request and ${optional.timeout / 1000}s`);
            }
            else {
                await this.page.waitForResponse(endpoint);
                console.log(`Waited for ${endpoint} request`);
            }
        }
    }

    async forURL(url: string, optional?: { timeout?: number, waitUntil?: "load" | "domcontentloaded" | "commit" }): Promise<void> {
        if (optional != undefined) {
            if (optional.timeout) {
                if (optional.waitUntil) {
                    await this.page.waitForURL(url, { timeout: optional.timeout, waitUntil: optional.waitUntil });
                    console.log(`Waited for ${url} url and ${optional.timeout / 1000}s and ${optional.waitUntil} state`);
                }
                await this.page.waitForURL(url, { timeout: optional.timeout });
                console.log(`Waited for ${url} url and ${optional.timeout / 1000}s`);
            }
            else if (optional.waitUntil) {
                await this.page.waitForURL(url, { waitUntil: optional.waitUntil });
                console.log(`Waited for ${url} url and ${optional.waitUntil} state`);
            }
            else {
                await this.page.waitForURL(url);
                console.log(`Waited for ${url} url`);
            }
        }
        await this.page.waitForURL(url);
        console.log(`Waited for ${url} url`);
    }

}
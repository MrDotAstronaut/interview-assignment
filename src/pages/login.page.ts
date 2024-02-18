import { Page } from '@playwright/test';
import { Perform } from '../utils/perform.util';
import { Get } from '../utils/get.util';
import { Check } from '../utils/check.util';
import { Wait } from '../utils/wait.util';

export class LoginPage {

    private selector = {
        fieldEmail: "[data-testid='login-email'] input",
        fieldPassword: "[data-testid='login-password'] input",
        buttonLogin: "[data-testid='login-button']"
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

    async launchURL(url): Promise<void> {
        await this.perform.goto(url);
    }

    async login(username: string, password: string): Promise<void> {
        await this.perform.fill(this.selector.fieldEmail, "Email Field", username);
        await this.perform.fill(this.selector.fieldPassword, "Password Field", password);
        await this.perform.click(this.selector.buttonLogin, "Login Button");
    }

}
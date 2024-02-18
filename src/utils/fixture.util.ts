import { test as manager } from '@playwright/test';

import { Assert } from '../utils/assert.util';

import { LoginPage } from '../pages/login.page';
import { DashboardPage } from '../pages/dashboard.page';
import { HistoryByStorePage } from '../pages/history-by-store.page';
import { TransactionsPage } from '../pages/transactions.page';

type fixtures = {
    assert: Assert;
    loginPage: LoginPage;
    dashboardPage: DashboardPage;
    historyByStore: HistoryByStorePage;
    transactions: TransactionsPage;
};

export const test = manager.extend<fixtures>({
    assert: async({ page }, use) => {
        await use(new Assert(page));
    },
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    dashboardPage: async ({ page }, use) => {
        await use(new DashboardPage(page));
    },
    historyByStore: async ({ page }, use) => {
        await use(new HistoryByStorePage(page));
    },
    transactions: async ({ page }, use) => {
        await use(new TransactionsPage(page));
    }
});
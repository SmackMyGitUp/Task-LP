import { Locator, Page } from "@playwright/test";

export class RepoPage {

    readonly page: Page;
    readonly repoTitle: Locator;
    readonly settingsTab: Locator;

    readonly createRepoBtn: Locator;
    readonly repoNameField: Locator;
    readonly renameBtn: Locator;
    readonly isAvailableNotif: Locator;

    readonly autoMergeCheckbox: Locator;

    readonly deleteRepoBtn: Locator;
    readonly popupWantToDeleteBtn: Locator;
    readonly popupHaveReadUnderstandBtn: Locator;
    readonly popupInputNameDelete: Locator;
    readonly popupDeleteRepoBtn: Locator;

    constructor (page: Page){
        this.page = page;
        this.repoTitle = page.locator('#repo-title-component');
        this.settingsTab = page.getByRole('link', { name: 'Settings' });

        this.createRepoBtn = page.getByRole('button', { name: 'Create repository' });
        this.repoNameField = page.getByRole('textbox', { name: 'Repository name' });
        this.renameBtn = page.getByRole('button', { name: 'Rename' });
        this.isAvailableNotif = (page.getByText(' is available.').first());

        this.autoMergeCheckbox = page.getByRole('checkbox', { name: 'Allow auto-merge' });

        this.deleteRepoBtn = page.getByRole('button', { name: 'Delete this repository' });
        this.popupWantToDeleteBtn = page.getByRole('button', { name: 'I want to delete this' });
        this.popupHaveReadUnderstandBtn = page.getByRole('button', { name: 'I have read and understand' });
        this.popupInputNameDelete = page.getByRole('textbox', { name: 'To confirm, type ' });

    }

    async goToSettings() {
        await this.settingsTab.click();
    }

    async clickThruDeleteDialog() {
        await this.deleteRepoBtn.click();
        await this.popupWantToDeleteBtn.click();
        await this.popupHaveReadUnderstandBtn.click();
    }
 
}
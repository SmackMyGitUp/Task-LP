import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/loginPage';
import { RepoPage } from '../page-objects/RepoPage';

//Login details are found in /page-objects/LoginPage.ts
test.beforeEach(async({ page }) => {
  const loginPage = new LoginPage (page);
  await loginPage.performGithubLogin();
});

//Test Data
let repoName: string = "AutomationTest-CreateRepo";
let updatedRepoName: string = "AutomationTest-UpdateRepo";

test('Create a repo', async ({ page }) => {
  const repoPage = new RepoPage (page);
  await page.getByRole('link', { name: 'New' }).click();       //Button found on the left hand side, under "Top repositories"
  await repoPage.repoNameField.fill(repoName);
  await expect(repoPage.isAvailableNotif).toBeVisible();
  await repoPage.createRepoBtn.click(); 
  await expect(repoPage.repoTitle.getByRole('link', { name: repoName })).toBeVisible(); //I wanted to check for the page title to contain the repo name,                                                                                    
  await page.close();                                                                   //but it wouldn't load quick enough. Simpler to let it auto-wait for an element.
});

test('Update repo', async ({ page }) => { 
  const repoPage = new RepoPage (page);
  await page.getByRole('link', { name: repoName }).click();    //Button found on the left hand side, under "Top repositories"
  await repoPage.goToSettings();                               //I wanted to compact all these steps into a single 'renameRepo' method in RepoPage.ts
  await repoPage.repoNameField.fill(updatedRepoName);          //but I ran into issues with the availability notification below. 
  await repoPage.renameBtn.click();                                           
  await expect(repoPage.isAvailableNotif).toBeVisible();       //A notification pops up if 'Rename' is hit only once. With this, it's less flaky.
  await repoPage.renameBtn.click();
  await expect(repoPage.repoTitle.getByRole('link', { name: updatedRepoName })).toBeVisible(); //same as in 'Create a repo'
  await page.close();
});

test('Enable auto merge', async ({ page }) => {                //I could easily compress the 2 auto merge tests into one, along with Update repo
  const repoPage = new RepoPage (page);
  await page.getByRole('link', { name: updatedRepoName }).click(); 
  await repoPage.goToSettings(); 
  await repoPage.autoMergeCheckbox.check();
  await expect (repoPage.autoMergeCheckbox).toBeChecked();
  await page.close();
});

test('Disable auto merge', async ({ page }) => {
  const repoPage = new RepoPage (page);
  await page.getByRole('link', { name: updatedRepoName }).click();                   
  await repoPage.goToSettings(); 
  await repoPage.autoMergeCheckbox.uncheck();
  await expect (repoPage.autoMergeCheckbox).not.toBeChecked();
  await page.close();
});

test('Delete repo', async ({ page }) => { 
  const repoPage = new RepoPage (page);
  await page.getByRole('link', { name: updatedRepoName }).click();
  let pageTitle: string = (await page.title()).toString();
  await repoPage.goToSettings();                               //Could be easily compacted into a single deleteRepo method under RepoPage.ts, with a few changes
  await repoPage.clickThruDeleteDialog();
  await repoPage.popupInputNameDelete.fill(pageTitle);
  await page.getByLabel('Delete '+pageTitle).getByRole('button', { name: 'Delete this repository' }).click(); //Could remove pageTitle, but this might be safer long-term
  await expect(page.getByText('Your repository "'+pageTitle+'" was successfully deleted.')).toBeVisible();
  await page.close();
});

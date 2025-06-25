import { Locator, Page } from "@playwright/test";

export class LoginPage {
    
    readonly page: Page;
    readonly loginField: Locator;
    readonly passwordField: Locator;
    readonly signInButton: Locator;

    //GitHub account login details, change them as necessary:
    readonly username: string = "example@gmail.com";
    readonly password: string = "Password123";
    
    constructor(page: Page){
        this.page = page;
        this.loginField = page.getByRole('textbox', { name: 'Username or email address' });
        this.passwordField = page.getByRole('textbox', { name: 'Password' });
        this.signInButton = page.getByRole('button', { name: 'Sign in', exact: true });
    }

    async performGithubLogin(){
        await this.page.goto('https://github.com/login');
        await this.loginField.fill(this.username);
        await this.passwordField.fill(this.password);
        await this.signInButton.click();
    }
}
import { LoginPage, MainPage } from "../page/";

export const verifySidebarMenuButton = () => MainPage.SidebarMenuButton().invoke('text').should('match', /Open Menu/i);

export const login = (username, password) => {
    LoginPage.UserName().type(username).should('have.value', username)
    LoginPage.Password().type(password).should('have.value', password)
    LoginPage.LoginButton().click()
}
export const LoginPage = {
    UserName: () => cy.get('[data-test="username"]'),
    Password: () => cy.get('[data-test="password"]'),
    LoginButton: () => cy.get('[data-test="login-button"]'),
    ErrorMessage: () => cy.get('[data-test="error"]')
};

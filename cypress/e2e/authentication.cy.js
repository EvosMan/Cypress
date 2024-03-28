const { verifySidebarMenuButton, login } = require("../support/helpers")
const { LoginPage, MainPage } = require("../support/page")
const { USERNAME, PASSWORD, ERRORS } = require("../support/constants")

context('Authentication', () => {
  beforeEach(() => cy.visit('/'))

  describe('Verify Existing Login Page', () => {
    it('has user name input', () => LoginPage.UserName().should('have.value', '').and('be.visible'))
    it('has password input', () => LoginPage.Password().should('have.value', '').and('be.visible'))
    it('has login button', () => LoginPage.LoginButton().should('have.value', 'Login').and('be.visible'))
  })

  describe('Login Functionality', () => {
    describe('Data Validation', () => {
      it('cannot login with blank username', () => {
        LoginPage.Password().type(PASSWORD).should('have.value', PASSWORD)
        LoginPage.LoginButton().click()
        LoginPage.ErrorMessage().should('have.text', ERRORS.USERNAME_REQUIRED)
      })

      it('cannot login with blank password', () => {
        LoginPage.UserName().type(USERNAME.STANDARD_USER).should('have.value', USERNAME.STANDARD_USER)
        LoginPage.LoginButton().click()
        LoginPage.ErrorMessage().should('have.text', ERRORS.PASSWORD_REQUIRED)
      })

      it('cannot login with wrong password', () => {
        const wrongPasword = 'wrong_password'
        login(USERNAME.STANDARD_USER, wrongPasword)
        LoginPage.ErrorMessage().should('have.text', ERRORS.WRONG_CREDENTIALS)
      })
    })

    describe('User Credentials', () => {

      describe('Unsuccessful Login', () => {
        it('cannot login due to locked user', () => {
          login(USERNAME.LOCKED_OUT_USER, PASSWORD)
          LoginPage.ErrorMessage().should('have.text', ERRORS.USER_LOCKED)
        })
      })

      describe('Successful Login', () => {
        afterEach(() => verifySidebarMenuButton())
        it('can login with standard user', () => login(USERNAME.STANDARD_USER, PASSWORD))
        it('can login with problem user', () => login(USERNAME.PROBLEM_USER, PASSWORD))
        it('can login with performance glitch user', () => login(USERNAME.PERFORMANCE_GLITCH_USER, PASSWORD))
        it('can login with error user', () => login(USERNAME.ERROR_USER, PASSWORD))
        it('can login with visual user', () => login(USERNAME.VISUAL_USER, PASSWORD))
      })
    })
  })

  describe('Logout Functionality', () => {
    beforeEach(() => login(USERNAME.STANDARD_USER, PASSWORD))

    it('can logout', () => {
      MainPage.SidebarMenuButton().click()
      MainPage.LogoutButton().click()
      LoginPage.UserName().should('have.value', '')
      LoginPage.Password().should('have.value', '')
      LoginPage.LoginButton().should('have.value', 'Login')
    })
  })
})
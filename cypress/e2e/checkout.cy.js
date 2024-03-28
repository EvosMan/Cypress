import { PASSWORD, USERNAME } from "../support/constants"
import { addToCart, login, verifySidebarMenuButton } from "../support/helpers"

const firstName = 'Aryok'
const lastName = 'O'
const postalCode = 2121

context('checkout', () => {
    beforeEach(() => {
        cy.visit('/')
        login(USERNAME.STANDARD_USER, PASSWORD)
        verifySidebarMenuButton()
        addToCart()
    })

    describe('+', () => {
        it('Checkout Form', () => {
            cy.get('[data-test="shopping-cart-link"]').click()
            cy.contains('Remove')
            cy.get('[data-test="checkout"]').click()
            cy.get('[data-test="firstName"]').type(firstName).should('have.value', firstName)
            cy.get('[data-test="lastName"]').type(lastName).should('have.value', lastName)
            cy.get('[data-test="postalCode"]').type(postalCode).should('have.value', postalCode)
            cy.get('[data-test="continue"]').click()
            cy.get('[data-test="title"]').invoke('text').should('match', /Overview/i)
            cy.get('[data-test="finish"]').click()
            cy.get('[data-test="complete-header"]').invoke('text').should('match', /Thank you for your order!/i)
            cy.get('[data-test="back-to-products"]').click()
            cy.url().should('include', '/inventory.html')
        })
    })
})
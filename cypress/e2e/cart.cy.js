import { addToCart, login, verifySidebarMenuButton } from "../support/helpers"
const { USERNAME, PASSWORD } = require("../support/constants")

context('cart', () => {
    beforeEach(() => {
        cy.visit('/')
        login(USERNAME.STANDARD_USER, PASSWORD)
        verifySidebarMenuButton()
    })

    it('can add to cart', () => {
        addToCart()
    })  
})
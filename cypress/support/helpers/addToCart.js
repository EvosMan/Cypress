export const addToCart = () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.contains('Remove')
    cy.get('[data-test="shopping-cart-badge"]').invoke('text').should('match', /1/i)
}
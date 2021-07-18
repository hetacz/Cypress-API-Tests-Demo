/// <reference types="cypress" />

describe('Test log out', () => {

    beforeEach('login to the app', () => {
        cy.loginToApplication()
    })

    it('veryify, user can log out succesfully', () => {
        cy.get('.nav').contains('Settings').click()
        cy.get('button').contains('Or click here to logout').click()
        cy.get('.navbar-nav').should('contain', 'Sign up')
    })
})
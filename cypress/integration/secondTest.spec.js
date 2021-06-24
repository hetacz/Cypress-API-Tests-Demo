describe('Test log out', () => {

    beforeEach('login to the app', () => {
        cy.loginToApplication()
    })

    it('veryify, user can log out succesfully', () => {
        cy.contains('Settings').click()
    })
})
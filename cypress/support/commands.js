Cypress.Commands.add('openHomePage', () => {
    cy.visit('/')
})

Cypress.Commands.add('loginToApplication', () => {
    
    const userCredentials = {
        "user": {
            "email": Cypress.env('username'),
            "password": Cypress.env('password')
        }
    }
    
    cy.request('POST', Cypress.env('apiUrl')+'api/users/login', userCredentials)
        .its('body').then($body => {
            const token = $body.user.token
            cy.wrap(token).as('token')

            cy.visit('/', {
                onBeforeLoad (win){
                    win.localStorage.setItem('jwtToken', token)
                }
            })
        })

    // cy.visit('/login')
    // cy.get('[placeholder="Email"]').type('edzioo@gmail.com')
    // cy.get('[placeholder="Password"]').type('Qwe123!@#')
    // cy.get('form').submit()
})
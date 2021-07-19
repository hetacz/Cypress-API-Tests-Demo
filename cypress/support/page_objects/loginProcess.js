export class User {
    
    randomStub(){
        return Math.random().toString(36).substring(2)
    }

    signUpApi(){
        this.myEmail = this.randomStub() + '@example.com'
        this.myName = 'tUser_' + this.randomStub()
        this.myPwd = this.randomStub()
        cy.log('email:', this.myEmail)
        cy.log('name:', this.myName)
        cy.log('password:', this.myPwd)

        cy.request({
            method: 'POST',
            url: Cypress.env('apiUrl') + 'users/', 
            body: {
                'user': {
                    username: this.myName,
                    email: this.myEmail,
                    password: this.myPwd
                }
            }
        }).then((response) => {
            expect(response.status).to.equal(200)
            cy.wrap(response.body.user.token).as('token')
            cy.log(response.body.user.token)  
            cy.visit('/', {
                onBeforeLoad (win){
                    win.localStorage.setItem('jwtToken', response.body.user.token)
                }
            })
                   
        })
    }

    loginWithToken(){
        cy.request({
            method: 'POST',
            url: Cypress.env('apiUrl') + 'users/login',
            body: {
                'user': {
                    'email': this.myEmail,
                    'password': this.myPwd
                }
            } 
        }).then((response) => {
            expect(response.status).to.equal(200) 
            cy.wrap(response.body.user.token).as('token')
            cy.log(response.body.user.token)

            cy.visit('/', {
                onBeforeLoad (win){
                    win.localStorage.setItem('jwtToken', response.body.user.token)
                }
            })
        })
    }

    logoutManually() {
        cy.visit('/')
        cy.get('.nav').contains('Settings').click()
        cy.get('button').contains('Or click here to logout').click()
    }
}

export const createUser = new User ()
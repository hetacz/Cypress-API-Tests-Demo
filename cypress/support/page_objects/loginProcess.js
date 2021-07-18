export class User {

    randomStub(){
        return Math.random().toString(36).substring(2)
    }

    signUpManual(){
        cy.get('.nav').contains('Sign up').click()
        cy.get('[placeholder="Username"]').type('test_' + this.randomStub())
        cy.get('[placeholder="Email"]').type('test_' + this.randomStub() + '@example.com')  
        cy.get('[placeholder="Password"]').type(this.randomStub())
        cy.get('button').contains('Sign up').click()
    }

    signUpApi(){

    }
}

export const createUser = new User ()
/// <reference types="cypress" />

import { createUser } from "../support/page_objects/loginProcess"

describe('Signup', () => {

    beforeEach('login to the app', () => {
        cy.visit('/')
    })

    it('Test valid signup', () => {
        
        createUser.signUp()

    })
})
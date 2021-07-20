/// <reference types="cypress" />

import { createUser } from "../support/page_objects/loginProcess"

describe('API Tests', () => {

    before('Create Account', () => {
        createUser.signUpApi()
    })

    beforeEach('Be logged in', () => {
        createUser.loginWithToken()
    })

    context('Tests body', () => {

        it('Check if previously created user is logged in', () => {
            cy.get('.nav-item').eq(3).should('contain' , createUser.myName)
        })
    })
})
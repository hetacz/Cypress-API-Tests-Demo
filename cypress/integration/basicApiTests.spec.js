/// <reference types="cypress" />

import { onPublishPage } from "../support/page_objects/publishPage"

describe('Test with backend', () => {

    beforeEach('log to the app', () => {

        cy.intercept({method: 'GET', path: 'tags'}, {fixture:'tags.json'})

        cy.loginToApplication()
    })

    it('verify correct request and response', () => {

        cy.intercept('POST', '**/articles').as('postArticles')

        onPublishPage.publishArticle('This is a title', 'This is a description', 'This is a body')

        cy.wait('@postArticles')
        .then(xhr => { 
            console.log(xhr)
            expect(xhr.response.statusCode).to.equal(200)
            expect(xhr.request.body.article.body).to.equal('This is a body')
            expect(xhr.response.body.article.description).to.equal('This is a description')
        })
    })

    it('intercepting and modifying the request and response', () => {

        cy.intercept('POST', '**/articles', (req) => {
            req.reply(res => {
                expect(res.body.article.description).to.equal('This is a description')
                res.body.article.description = "This is a description 2"
            })
        }).as('postArticles')

        onPublishPage.publishArticle('This is a title', 'This is a description', 'This is a body')

        cy.wait('@postArticles')
        .then(xhr => { 
            console.log(xhr)
            expect(xhr.response.statusCode).to.equal(200)
            expect(xhr.request.body.article.body).to.equal('This is a body')
            expect(xhr.response.body.article.description).to.equal('This is a description 2')
        })

    })
    
    it('should give tags with route objects', () => {
        
        cy.get('.tag-list')
            .should('contain', 'cypress')
            .and('contain', 'automation')
            .and('contain', 'testing')
    })

    it('verify global feed likes count', () => {

        cy.intercept('GET', '**/articles/feed*', {"articles":[],"articlesCount":0})
        cy.intercept('GET', '**/articles*', {fixture: 'articles.json'})
        cy.contains('Global Feed').click()

        cy.get('app-article-list button').then(listOfButtons => {
            expect(listOfButtons[0]).to.contain('1')
            expect(listOfButtons[1]).to.contain('5')
        })

        cy.fixture('articles').then(file => {
            const articleLink = file.articles[0].slug
            cy.intercept('POST', '**/articles/'+articleLink+'favorite', {file})
        })

        cy.get('app-article-list button')
            .eq(0)
            .click()
            .should('contain', '2')
    })

    it('delete new article in global feed', () => {

        const bodyRequest = {
            "tagList": [],
            "title": "Request from API",
            "description": "API testing is easy",
            "body": "Angular is cool"
        }

        cy.get('@token').then(token => {      
            cy.request({
                url: Cypress.env('apiUrl')+'articles/',
                headers: {'Authorization': 'Token ' +token},
                method: 'POST',
                body: bodyRequest 
            }).then(response => {
                expect(response.status).to.equal(200)
            })

            cy.contains('Global Feed').click()
            cy.get('.article-preview').first().click()
            cy.get('.article-actions').contains('Delete Article').click()

            cy.request({
                url: Cypress.env('apiUrl')+'articles?limit=10&offset=0',
                headers: {'Authorization': 'Token ' +token},
                method: 'GET'
            }).its('body').then($body => {
                console.log($body)
                expect($body.articles[0].title).not.to.equal('Request from API')       
            })
        })
    })
})
export class PublishPage {

    publishArticle (articleTitle, articleDescription, articleBody) {

            cy.contains('New Article').click()
            cy.get('[formcontrolname="title"]').type(articleTitle)
            cy.get('[formcontrolname="description"]').type(articleDescription)
            cy.get('[formcontrolname="body"]').type(articleBody)
            cy.contains('Publish Article').click()
    }
}

export const onPublishPage = new PublishPage ()
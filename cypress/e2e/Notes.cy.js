/// <reference types="cypress" />

describe('Test suite for Notes app', () => {
    beforeEach(()=>
    {
        cy.visit("http://localhost:3000/");
        cy.request({
            method: 'GET',
            url:'http://localhost:3000/'
        }).then((response)=>
        {
            expect(response.status).to.eql(200);
        })
    })

    it('The page is loading correctly',()=>
    {
        cy.get('h2').should('have.text','QA Automation Cypress Test')
        cy.get('.list-container ul').should('have.length',1)
        cy.get('#text-input').should('exist')
        cy.get("button[type='submit']").should('exist')
        cy.get("button[type='delete']").should('not.exist')
    })
    it("Add element to the list with empty array using enter", () => {
        cy.get('#text-input').click().type('{enter}')
        cy.get('.note-container').should('exist')
        
    })
    
    it("Add element to the list with empty array using submit button", () => {
        cy.get("button[type='submit']").click()
        cy.get('.note-container').should('exist')
        cy.get('.list-container ul div').should('have.class','note-container')
        
    })

    it("Add element to the list with text using enter", () => {
        cy.get('#text-input').click().type('textDivelement{enter}')
        cy.get('#text-input').click().type('textDivelement2{enter}')
        cy.get('.note-container').should('exist')
        cy.get('.list-container ul div:nth-child(1) li').should('have.have.text',"textDivelement")
        cy.get('.list-container ul div:nth-child(2) li').should('have.have.text',"textDivelement2")
        cy.get("div .note-container button").should('have.length',2)
    })
    it("Add element to the list with text using submit button", () => {
        cy.get('#text-input').click().type('textDivelement')
        cy.get("button[type='submit']").click()
        cy.get('#text-input').click().type('textDivelement2')
        cy.get("button[type='submit']").click()
        cy.get('.note-container').should('exist')
        cy.get('.list-container ul div:nth-child(1) li').should('have.have.text',"textDivelement")
        cy.get('.list-container ul div:nth-child(2) li').should('have.have.text',"textDivelement2")
        cy.get("div .note-container button").should('have.length',2)
    })

    it("Test the delete button with 0 element in the list", () => {
        cy.get('.list-container ul div').should('have.length',0)
        cy.get("button[type='delete']").should('not.exist')
    })
    it("Test the delete button with 1 element in the list", () => {
        cy.get('#text-input').click().type('textDivelement{enter}')
        cy.get('.list-container ul div').should('have.length',1)
        cy.get('.list-container div button').click()
        cy.get('.list-container ul div').should('have.length',0)
        cy.get("button[type='delete']").should('not.exist')

    })

    it("Test the delete button with 2 element in the list", () => {
        cy.get('#text-input').click().type('textDivelement{enter}')
        cy.get('#text-input').click().type('textDivelement2{enter}')
        cy.get('.list-container ul div').should('have.length',2)
        cy.get('.list-container div:nth-child(2) button').click()
        cy.get('.list-container ul div').should('have.length',1)
        
    })
})
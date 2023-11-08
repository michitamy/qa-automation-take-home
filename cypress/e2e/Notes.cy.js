/// <reference types="cypress" />
import noteObjects from '../fixtures/noteObjects.js'
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
        // cy.fixture(noteObjects).then(function (data) {
        //     this.data=data;     
        // })
    })
    it('Test page is loading correctly',()=>
    {
        const notePageObjects = new noteObjects();
        notePageObjects.getMainTitle().should('have.text','QA Automation Cypress Test')
        //notePageObjects.getContinerNotes().should('have.length',1)
        notePageObjects.getContinerNotes().should('not.be.visible')
        notePageObjects.getfieldToInputText().should('be.visible')
        notePageObjects.getSubmitButton().should('be.visible')
        notePageObjects.getDeleteButton().should('not.exist')
    })
    it("Add element to the list with empty array using enter", () => {
        const notePageObjects = new noteObjects();
        notePageObjects.getfieldToInputText().click().type('{enter}')
        notePageObjects.getContinerNotes().should('be.visible')
        notePageObjects.getNotesRow().should('have.length',1)
        
    })
    
    it("Add element to the list with empty array using submit button", () => {
        const notePageObjects = new noteObjects();
        notePageObjects.getSubmitButton().click();
        notePageObjects.getNotesRow().should('have.length',1)
        notePageObjects.getContinerNotes().should('be.visible')
        cy.get('.list-container ul div').should('have.class','note-container')
        
    })

    it("Add element to the list with text using enter", () => {
        const notePageObjects = new noteObjects();
        notePageObjects.getfieldToInputText().click().type('textDivelement{enter}')
        notePageObjects.getfieldToInputText().click().type('textDivelement2{enter}')
        notePageObjects.getContinerNotes().should('exist')
        
        notePageObjects.getNotesRow().first().should('have.text',"textDivelement")
        notePageObjects.getNotesRow().last().should('have.text','textDivelement2')
        notePageObjects.getDeleteButton().should('have.length',2)
        notePageObjects.getNotesRow().should('have.length',2)
    })
    it("Add element to the list with text using submit button", () => {
        const notePageObjects = new noteObjects();

        notePageObjects.getfieldToInputText().click().type('textDivelement')
        cy.get("button[type='submit']").click()
        notePageObjects.getfieldToInputText().click().type('textDivelement2')
        cy.get("button[type='submit']").click()
        notePageObjects.getContinerNotes().should('exist')
        notePageObjects.getNotesRow().first().should('have.text',"textDivelement")
        notePageObjects.getNotesRow().last().should('have.text','textDivelement2')
        notePageObjects.getNotesRow().should('have.length',2)
        notePageObjects.getDeleteButton().should('have.length',2)
        })

    it("Test the delete button with 0 element in the list", () => {
        const notePageObjects = new noteObjects();
        notePageObjects.getContinerNotes().should('not.be.visible')
        notePageObjects.getNotesRow().should('have.length',0)
        notePageObjects.getDeleteButton().should('not.exist')
    })
    it("Test the delete button with 1 element in the list", () => {
        const notePageObjects = new noteObjects();
        notePageObjects.getfieldToInputText().click().type('textDivelement{enter}')
        notePageObjects.getNotesRow().should('have.length',1)
        notePageObjects.getDeleteButton().click()
        notePageObjects.getNotesRow().should('have.length',0)
        notePageObjects.getDeleteButton().should('not.exist')

    })

    it.only("Test the delete button with 2 element in the list", () => {
        const notePageObjects = new noteObjects();
        notePageObjects.getfieldToInputText().click().type('textDivelement{enter}')
        notePageObjects.getfieldToInputText().click().type('textDivelement2{enter}')
        notePageObjects.getNotesRow().should('have.length',2)
        notePageObjects.getDeleteButton().last().click()
        notePageObjects.getNotesRow().should('have.length',1)
        notePageObjects.getNotesRow().should('have.text','textDivelement')
        
    })
})
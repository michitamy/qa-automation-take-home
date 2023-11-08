class mainPageNote
{
    getMainTitle(){
        return cy.get('h2')
    }

    getContinerNotes(){
        return cy.get('.list-container ul')
    }
    
    getfieldToInputText(){
        return cy.get('#text-input')
    }

    getSubmitButton(){
        return cy.get("button[type='submit']")
    }

    getDeleteButton(){
        return cy.get(".list-container ul button")
    }    

    getNotesRow(){
        return cy.get('.note-container li')
    }
}export default mainPageNote;
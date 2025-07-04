describe('form tests', () => {
  beforeEach(() => {
    cy.visit('/forms')
  })

  it('Test subscribe for,', () => {
    cy.contains(/Testing Forms/i)
    //Test getting the form
    cy.getDataTest('subscribe-form').find('input').as('subscribe-input')
    // cy.getDataTest('subscribe-form').find('input').type('test@gmail.com')

    // Test typing in the form a valid email
    cy.get('@subscribe-input').type('test@gmail.com')
    cy.getDataTest('subscribe-button').click()
    cy.contains(/Successfully subbed: test@gmail.com/i).should('exist')
    cy.wait(3000) // wait for the message to disappear
    cy.contains(/Successfully subbed: test@gmail.com/i).should('not.exist')

    // Test invalid email
    cy.get('@subscribe-input').type('test@gmail.io')
    cy.contains(/Invalid email: test@gmail.io/i).should('not.exist')
    cy.getDataTest('subscribe-button').click()
    cy.contains(/Invalid email: test@gmail.io/i).should('exist')
    cy.wait(3000) // waits for the message to disappear
    cy.contains(/Invalid email: test@gmail.io/i).should('not.exist')
    
    // Test empty email
    cy.contains(/fail!/i).should('not.exist')
    cy.getDataTest('subscribe-button').click()
    cy.contains(/fail!/i).should('exist')
    cy.wait(3000) // wait for the message to disappear
    cy.contains(/fail!/i).should('not.exist')
  })
})

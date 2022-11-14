describe ('Atidaromas puslapis', () => {
    var el_pastas = 'loneha7742@invodua.com'
    var slaptazodis = '12345'
    var neteisingas_slaptazodis = '124356'
    var neteisingas_el_pastas = 'texomid17@abudat.com'
    var vardas = 'apelsinas'
    var adresas ='Saltoniskiu gatve 24'
    var miestas = 'Vilnius'
    var tel = '62233456'
    var pasto_kodas= '55222'

Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
})
afterEach(() => {
    cy.storeSessionData();
})
beforeEach(() => {
    cy.viewport(1920, 1080)
})
it('Atveriama svetaine', () => {
    cy.visit('https://bigbox.lt/')
})
it('Prisijungimo mygtukas', () => {
    cy.get('.header-user-info-image').click()
})
it('Prisijungimas naudojant neteisinga el. pasta (expected error)', () => {
    cy.get('#email').type(neteisingas_el_pastas)
    cy.get('#passwd').type(slaptazodis)
    cy.get('.login-button').click()
    cy.get('.alert').should('be.visible')
    cy.get('#email').clear().should('be.empty')
    cy.get('#passwd').clear().should('be.empty')
})
it('Prisijungimas naudojant neteisinga el. slaptazodi (expected error)', () => {
    cy.get('#email').type(el_pastas)
    cy.get('#passwd').type(neteisingas_slaptazodis)
    cy.get('.login-button').click()
    cy.get('.alert').should('be.visible')
    cy.get('#email').clear().should('be.empty')
    cy.get('#passwd').clear().should('be.empty')
})
it('Prisijungimas naudojant neteisingus duomenis (expected error)', () => {
    cy.get('#email').type(neteisingas_el_pastas)
    cy.get('#passwd').type(neteisingas_slaptazodis)
    cy.get('.login-button').click()
    cy.get('.alert').should('be.visible')
    cy.get('#email').clear().should('be.empty')
    cy.get('#passwd').clear().should('be.empty')
})
it('Prisijungimas naudojant teisingus duomenis (expected pass)', () => {
    cy.get('#email').type(el_pastas)
    cy.get('#passwd').type(slaptazodis)
    cy.get('.login-button').click()
    cy.get('.my-account-content-container').should('be.visible')
})
it('Patikrinti asmenine informacija', () => {
    cy.get('.my-account-link-list > :nth-child(4) > a').click()
})
it('Atnaujinti asmenine informacija', () => {
    cy.get('.my-account-menu > ul > :nth-child(2) > a').click({force:true})
    cy.get('.submit-button').click()
    cy.get('#address1').clear().should('be.empty').type(adresas, {force:true})
    cy.get('#city').clear().should('be.empty').type(miestas, {force:true})
    cy.get('#phone_mobile').clear().should('be.empty').type(tel, {force:true})
    cy.get('#postcode').clear().should('be.empty').type(pasto_kodas, {force:true})
    cy.get('#alias').clear().should('be.empty').type('adresiukas')
    cy.get('.submit-button').click()
})
it('Grižimas i pagr. puslapį naudojant BigBox logo', () => {
    cy.get('.vertical').click()
    cy.get('.header-user-info-image-active').should('be.visible')
})
it('Iejimas i akciju skilti', () => {
    cy.get('.akc > a').click()
})
})
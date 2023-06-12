import { defineConfig } from 'cypress'

// example EVN vars can use in spec like the following:
// cy.visit(Cypress.env('proto')+'://'+Cypress.env('host')+'/');`
export default defineConfig({
  projectId: 'ENF EVM Faucet',
  e2e: {
    baseUrl: 'http://10.3.0.1:4173',
  },
  //env: {
  //    proto: 'http',
  //    host: '10.3.0.1:4173',
  //},
  video: false,
})

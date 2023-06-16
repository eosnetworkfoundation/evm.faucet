# `EOS EVM` Faucet

<img width="1223" alt="image" src="https://user-images.githubusercontent.com/550895/229628495-5075dcfa-50b2-4b10-b07e-21c959d68052.png">

## Quickstart

Create an `.env` file with `PRIVATE_KEY` and `PUBLIC_MOCK_HTTP`
```yaml
# .env production
PRIVATE_KEY=1f7f00ee0e0000000f0e00e0e0fe00e0e70f0000e07000e000e00ee07070000e
PUBLIC_MOCK_HTTP=false
```
Then build and run
```shell
yarn build
yarn preview 
```

***Testing*** create a testing specific `testing.env` environment file
```yaml
# .env production
PRIVATE_KEY=1f7f00ee0e0000000f0e00e0e0fe00e0e70f0000e07000e000e00ee07070000e
PUBLIC_MOCK_HTTP=true
```
Then build in testing mode and run
```shell
yarn build --mode testing
yarn preview 
```


## Features

- [x] Faucet logo design
- [x] User input address
  - [x] Regex validation
  - [x] EOS address
  - [x] EVM address
- [x] Send EOS transfers (via internal API)
  - [x] EVM (via bridge `eosio.evm`)
  - [x] EOS
  - [x] Success Notification
- [x] History of last 10 faucet transactions
- [x] Rate limit based on cookies (1 request per second)
- [ ] Detect EVM wallet:
  - [ ] Metamask
  - [ ] Coinbase Wallet
- [x] Save address to localStorage
- [x] Mobile optimization
- [x] Edge runtime

## Cypress Testing 
To run the tests use the following command
`npx cypress run`

You may find the spec tests under `cypress/e2e/*.cy.ts`. You may add additional tests to the existing file or start a new file in the same directory. Files in the `cypress/e2e` directory will automatically be picked up. 

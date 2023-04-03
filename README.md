# `EOS EVM` Faucet

<img width="1223" alt="image" src="https://user-images.githubusercontent.com/550895/229628495-5075dcfa-50b2-4b10-b07e-21c959d68052.png">

## Quickstart

```
$ npm install
$ npm run dev
```

## Features

- [x] Faucet logo design
- [x] User input address
  - [ ] Regex validation
  - [ ] EOS address
  - [ ] EVM address
- [x] Send EOS transfers (via internal API)
  - [x] EVM (via bridge `eosio.evm`)
  - [x] EOS
  - [x] Success Notification
- [x] History of last 10 faucet transactions
- [ ] Rate limit based on cookies (1 request per second)
- [ ] Detect EVM wallet:
  - [ ] Metamask
  - [ ] Coinbase Wallet
- [x] Save address to localStorage
- [x] Mobile optimization
- [x] Edge runtime

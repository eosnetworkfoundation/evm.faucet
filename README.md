# `EOS EVM` Faucet

<img width="1223" alt="image" src="https://user-images.githubusercontent.com/550895/229307696-e704a8d2-a2d2-45b1-b99e-919f77c66e27.png">

## Quickstart

```
$ npm install
$ npm run dev
```

## Features

- [ ] User input address
  - [ ] Regex validation
  - [ ] EOS address
  - [ ] EVM address
- [ ] Send EOS transfers (via internal API)
  - [ ] EVM (via bridge `eosio.evm`)
  - [ ] EOS
  - [ ] Success Notification
- [ ] History of last 10 faucet transactions
- [ ] Rate limit based on cookies (1 request per second)
- [ ] Detect EVM wallet fro Metamask
- [x] Save address to localStorage
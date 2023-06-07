
## Preserve Old
Made a release branch and add a tag 
```
git checkout -b release/1 
git push origin release/1 
git tag -a v1.0.0 -m "initial nextjs version of evm faucet"
git push orgin --tags
```

## Create New Branch 
```
git checkout main 
git checkout -b move-to-svelte
```

## Steps to Migrate to Svelte

First Preserve Typescript
```
mv middleware.ts src
mv app/api src
```

Next Migrate statics
```
mkdir static
mv public/*.* static
rm -rf public
mv app/globals.css static
```

Remove NextJS Config
```
rm next-env.d.ts next.config.js 
```

Add new remote to sync with template
```
git remote add template https://github.com/eosnetworkfoundation/base-web-app-template.git
git fetch template
git checkout template/main -- src/routes
cd src
git checkout template/main -- app.d.ts app.html app.postcss index.test.ts
git checkout template/main -- .eslintignore .eslintrc.json .gitignore .npmrc .prettierignore .prettierrc postcss.config.cjs prod-server.js svelte.config.js tailwind.config.ts tsconfig.json vite.config.ts 
```

Remove old packages and re-install
```
rm package-lock.json
mv package.json original-package.json
git checkout template/main -- package.json
```

Manually sync up package.json 
- update `name` to `evm-faucet`
- rev major version to `2.0.0` from `0.1.0`  
- add dependency  `@whafkit/session` `@wharfkit/wallet-plugin-privatekey`
- add dependency `daysjs`
Note: Big jump in releases because original is `release/1` and next release will be `release/2`. Live production version should have been release v1.x.x

## Validate
```
yarn install
yarn build
yarn preview
```
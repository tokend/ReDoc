Customized fork of [Redoc](https://github.com/Rebilly/ReDoc) OpenAPI/Swagger-generated API Reference Documentation


## Publish
- Two npm modules '@tokend/redoc' and '@tokend/redoc-ci'
- Set new version in redoc package.json
- Set new version cli and update '@tokend/redoc' to new, in redoc-cli .cli/package.json

- npm run bundle
- yarn publish
- cd cli/
- npm install
- cd ..
- npm run compile:cli
- cd cli/
- yarn publish

# refactory-frontend-react
Refactory Front End built with ReactJS

### Requirements for development

1. Make sure you have installed nodeJS and npm.
2. Follow instruction for back-end setup (refactory-web) `https://github.com/refactory-id/refactory-web/wiki/Project-setup`

### Setup development

1. Clone or Download `git@github.com:refactory-id/refactory-frontend-react.git`
2. Run `npm install`
3. Duplicate `/config/template.js` and rename it to `/config/local.js` then specify variables, see below for more details
4. Run `npm start`

### Configure The App

Setup variable in `/config/local.js`

| Variable | Description | Example |
| ------------- | ------------- | --------------|
| API_BASE_URL | Base URL for Github login | 'http://localhost:8000/' |
| GITHUB_CLIENT_ID | Client ID of the Github | 'b420627027b59e773f4f' |
| GITHUB_CLIENT_SECRET | Client ID of the Github | 'd8afddad6dabf8327c2b6753c3055cbf0767f70a' |
| GITHUB_CLIENT_BASE_URI | Base URI of Github | 'github.com' |

/**
 *  Import configuration
 */
const config = require('config')
const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, GITHUB_REDIRECT_URI, GITHUB_CLIENT_BASE_URI } = config.default
/**
*  Define Constants
*/
export const AUTH_IS_PROCESSING = 'src/app/authGithub/AUTH_IS_PROCESSING'
export const AUTH_USER = 'src/app/authGithub/AUTH_USER'
export const UNAUTH_USER = 'src/app/authGithub/UNAUTH_USER'
export const LOAD_USER = 'src/app/authGithub/LOAD_USER'
export const ENDPOINT_AUTH = `https://${GITHUB_CLIENT_BASE_URI}/login/oauth/authorize`
export const ENDPOINT = `http://localhost:8000/api/auth/github`
export const REDIRECT_URI = GITHUB_REDIRECT_URI
export const CLIENT_ID = GITHUB_CLIENT_ID
export const CLIENT_SECRET = GITHUB_CLIENT_SECRET
export const RESPONSE_TYPE = 'code'
export const SCOPES = 'user:email,repo'

export const TOKEN_PARAMS = {
    client_id: CLIENT_ID,
    scope: SCOPES
}

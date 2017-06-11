/**
 *  Import configuration
 */
const config = require('config')
const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, GITHUB_REDIRECT_URI, GITHUB_CLIENT_BASE_URI } = config.default
/**
*  Define Constants
*/
export const AUTH_USER = 'src/app/authGithub/AUTH_USER'
export const UNAUTH_USER = 'src/app/authGithub/UNAUTH_USER'
export const LOAD_USER = 'src/app/authGithub/LOAD_USER'
export const ENDPOINT_AUTH = `https://${GITHUB_CLIENT_BASE_URI}/login/oauth/authorize`
export const ENDPOINT = `https://${GITHUB_CLIENT_BASE_URI}/login/oauth/access_token`
// export const ENDPOINT_USER_INFO = `https://${GITHUB_CLIENT_BASE_URI}/oxauth/seam/resource/restv1/oxauth/userinfo`
// export const ENDPOINT_DEAUTH = `https://${GITHUB_CLIENT_BASE_URI}/oxauth/seam/resource/restv1/oxauth/end_session`
export const REDIRECT_URI = GITHUB_REDIRECT_URI
export const CLIENT_ID = GITHUB_CLIENT_ID
export const CLIENT_SECRET = GITHUB_CLIENT_SECRET
// export const CLIENT_ASSERTION_TYPE = 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer'
// export const GRANT_TYPE = 'authorization_code'

export const RESPONSE_TYPE = 'code'
export const SCOPES = 'user:email,repo'

export const PAYLOADS = {
    iss: CLIENT_ID,
    sub: CLIENT_ID,
    aud: ENDPOINT,
    jti: Math.floor(Date.now() / 1000),
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 86400
}

export const TOKEN_PARAMS = {
    client_id: CLIENT_ID,
    scope: SCOPES
}

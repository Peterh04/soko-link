let accessToken = null;

export function setAccessToken(token) {
  accessToken = token;
  console.log("[accessTokenModule] setAccessToken:", token);
}

export function getAccessToken() {
  console.log("[accessTokenModule] getAccessToken:", accessToken);
  return accessToken;
}

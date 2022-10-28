let auth0 = null

window.onload = async () => {
  await configureClient()
  await processLoginState()
  updateUI()
}

const configureClient = async () => {
  auth0 = await createAuth0Client({
    domain: "dev-o7j10t6opbyd3gyu.us.auth0.com",
    client_id: "1o7QV7pJVBwyHLkRVd8TDrAAoWMAxBRF",
  })
}

const processLoginState = async () => {
  // Check code and state parameters
  const query = window.location.search
  if (query.includes("code=") && query.includes("state=")) {
    // Process the login state
    await auth0.handleRedirectCallback()
    // Use replaceState to redirect the user away and remove the querystring parameters
    window.history.replaceState({}, document.title, window.location.pathname)
  }
}
const updateUI = async () => {
  const isAuthenticated = await auth0.isAuthenticated()
  document.getElementById("btn-logout").disabled = !isAuthenticated
  document.getElementById("btn-login").disabled = isAuthenticated
  // NEW - add logic to show/hide gated content after authentication
  if (isAuthenticated) {
    document.getElementById("gated-content").classList.remove("hidden")
    document.getElementById(
      "ipt-access-token"
    ).innerHTML = await auth0.getTokenSilently()
    document.getElementById("ipt-user-profile").innerHTML = JSON.stringify(
      await auth0.getUser()
    )
  } else {
    document.getElementById("gated-content").classList.add("hidden");
  }
}

const login = async () => {
  await auth0.loginWithRedirect({
    redirect_uri: 'https://shanmucode27.github.io/test-repo/dashboard.html',
  })
}

const logout = () => {
  auth0.logout({
    returnTo: 'https://shanmucode27.github.io/test-repo/index.html',
  })
}

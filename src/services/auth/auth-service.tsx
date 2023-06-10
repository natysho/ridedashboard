export const AuthService = {
  logout,
  logIn,
}
function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('jwt')
  localStorage.removeItem('roles')
  localStorage.clear()
}

function logIn() {}

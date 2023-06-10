// export function getCurrentUserRoles() {
//   const d: any = JSON.parse(localStorage.getItem('user') || '')
//   console.log('roles..')
//   return d
// }

export const userService = {
  get getCurrentUserRoles(): any {
    const data = JSON.parse(localStorage.getItem('user') || '')

    return data?.roles
  },
  get currentRole(): any {
    const data = JSON.parse(localStorage.getItem('currentRole') || '')

    return data
  },
  get currentUser(): any {
    return localStorage.getItem('user')
  },
}

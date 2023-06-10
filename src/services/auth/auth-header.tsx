export const authHeaderService = {
  get getAuthHeader(): string {
    const token = localStorage.getItem('token')
    if (token) {
      return token
    } else {
      return ''
    }
  },
}

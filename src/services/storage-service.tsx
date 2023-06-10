export function getItem(key: any) {
  return localStorage.getItem(key)
}

export function setItem(key: string, data: any) {
  return localStorage.setItem(key, data)
}

export function removeItem(key: string) {
  return localStorage.removeItem(key)
}
const clear = async () => {
  await localStorage.clear()
}

export const storageServices = {
  getItem,
  setItem,
  removeItem,
  clear,
}

// getItem<T>(key: string): Observable<T> {
//   return from(localforage.getItem<T>(key));
// }
// setItem<T = any>(key: string, data: T): Observable<T> {
//   return from(localforage.setItem<T>(key, data));
// }
// removeItem(key: string): Observable<void> {
//   return from(localforage.removeItem(key));
// }
// keys(): Observable<string[]> {
//   return from(localforage.keys());
// }
// clear(): Observable<any> {
//   return from(localforage.clear());
// }

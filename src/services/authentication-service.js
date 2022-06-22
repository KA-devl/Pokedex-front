export default class AuthenticationService {
static isAuthenticated = false;


static login(username, password){
  const isAuthenticated = (username === 'pikachu' && password ==='pikachu')

  return new Promise( resolve => {
    setTimeout(() =>{
      this.isAuthenticated = isAuthenticated
      resolve (isAuthenticated)
    }, 500)
  })
}






}
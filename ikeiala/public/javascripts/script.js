document.addEventListener('DOMContentLoaded', () => {

  console.log('IronGenerator JS imported successfully!');
  const log = document.getElementById(`logbutton`)
  const login = document.getElementById(`login`) 

  const loginform = document.getElementById(`loginform`)

  const sign = document.getElementById(`signupbutton`)
  const signup = document.getElementById(`signup`) 

  log.onclick = e => {
    e.preventDefault()
    login.style.display = "block"
  }

  loginform.onclick = e => {
    e.preventDefault()
    console.log("hola")
    axios.post(`http://localhost:4000/auth/login`)
  }


  sign.onclick = e => {
    e.preventDefault()
    login.style.display = "none"
    signup.style.display = "block"
  }

}, false);

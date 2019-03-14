document.addEventListener('DOMContentLoaded', () => {
  
  console.log('IronGenerator JS imported successfully!');
  const log = document.getElementById(`logbutton`)
  const login = document.getElementById(`login`)
 
  const sign = document.getElementById(`signupbutton`)
  const signup = document.getElementById(`signup`)
  const searchYearDateInput = document.getElementById(`search-year-date-input`)

 
  const signup_loginbutton = document.getElementById("signup_loginbutton")
  const calendar = document.getElementById("v-cal")

  searchYearDateInput.onclick = () => {
    calendar.style.display = "block";
  }

  log.onclick = e => {
    e.preventDefault()
    login.style.display = "block"
  }
 
  sign.onclick = e => {
    e.preventDefault()
    login.style.display = "none"
    signup.style.display = "block"
  }

  signup_loginbutton.onclick = e => {
    e.preventDefault()
    signup.style.display = "none"
    login.style.display = "block"
  }

 }, false);

 
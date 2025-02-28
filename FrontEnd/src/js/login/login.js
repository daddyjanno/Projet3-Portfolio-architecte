import { fetchCredentials } from '../utils/data.js'
import { handleLoginForm, storeToken } from './loginForm.js'
import { bold, returnToHomePage, unbold } from '../utils/utils.js'
import { LOGINBTN, LOGO, SUBMITBTN } from '../utils/variables.js'

console.log(window.location.pathname)

if (window.location.pathname === '/FrontEnd/login.html') {
    bold(LOGINBTN)
}

SUBMITBTN.addEventListener('click', (event) => {
    handleSubmit(event)
})
LOGO.addEventListener('click', () => {
    returnToHomePage()
})

async function handleSubmit(event) {
    event.preventDefault()
    const body = handleLoginForm()
    const response = await fetchCredentials(body)

    if (response.token) {
        storeToken(response)
        unbold(LOGINBTN)
        returnToHomePage()
    }
}

// const body = { email: 'sophie.bluel@test.tld', password: 'S0phie' }

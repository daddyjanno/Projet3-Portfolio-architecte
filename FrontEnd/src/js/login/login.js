import { BASEURL } from '../../index.js'
import { fetchCredentials } from '../utils/fetchData.js'
import { handleLoginForm, storeToken, validateForm } from './loginForm.js'
import { bold, returnToHomePage } from '../utils/utils.js'
import { LOGINBTN, LOGO, SUBMITBTN } from '../utils/variables.js'

if (
    document.location.href ===
    'http://127.0.0.1:5500/FrontEnd/src/html/login.html'
) {
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
    validateForm(body.email, body.password)
    const response = await fetchCredentials(BASEURL, body)

    if (response.token) {
        console.log('connected')
        storeToken(response)
        returnToHomePage()
    }
}

// const body = { email: 'sophie.bluel@test.tld', password: 'S0phie' }

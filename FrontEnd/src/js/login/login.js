import { BASEURL } from '../../index.js'
import { fetchCredentials } from '../utils/fetchData.js'
import { handleLoginForm, storeToken } from './loginForm.js'
import { bold, returnToHomePage, unbold } from '../utils/utils.js'
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
    const response = await fetchCredentials(BASEURL, body)

    if (response.token) {
        console.log('connected')
        storeToken(response)
        unbold(LOGINBTN)
        LOGINBTN.innerText = 'logout'
        returnToHomePage()
    }
}

// const body = { email: 'sophie.bluel@test.tld', password: 'S0phie' }

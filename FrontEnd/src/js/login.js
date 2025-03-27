import { fetchCredentials } from './utils/data.js'
import { bold, returnToHomePage, unbold } from './utils/utils.js'
import { LOGINBTN, LOGO, SUBMITBTN } from './utils/variables.js'

if (window.location.pathname === '/login.html') {
    bold(LOGINBTN)

    SUBMITBTN.addEventListener('click', (event) => {
        handleSubmit(event)
    })
    LOGO.addEventListener('click', () => {
        returnToHomePage()
    })
}

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

export function handleLoginForm() {
    const email = document.querySelector('#email').value
    const password = document.querySelector('#password').value
    const body = { email, password }
    return body
}

export function storeToken(data) {
    localStorage.setItem('token', data.token)
}

// const body = { email: 'sophie.bluel@test.tld', password: 'S0phie' }

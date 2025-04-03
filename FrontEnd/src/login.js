import { fetchCredentials } from './js/utils/data.js'
import { bold, returnToHomePage, unbold } from './js/utils/utils.js'
import { LOGINBTN, LOGO, SUBMITBTN } from './js/utils/variables.js'

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
    const email = document.querySelector('#email').value
    const password = document.querySelector('#password').value

    const body = { email, password }

    const response = await fetchCredentials(body)

    if (response.token) {
        storeToken(response)
        unbold(LOGINBTN)
        returnToHomePage()
    }
}

export function storeToken(data) {
    localStorage.setItem('token', data.token)
}

// const body = { email: 'sophie.bluel@test.tld', password: 'S0phie' }

import { BASEURL, bold } from '../index.js'

const loginBtn = document.getElementById('login')
const submitBtn = document.querySelector('.loginForm-submitBtn')

if (
    document.location.href ===
    'http://127.0.0.1:5500/FrontEnd/src/html/login.html'
) {
    bold(loginBtn)
}

submitBtn.addEventListener('click', (event) => {
    handleSubmit(event)
})

function returnToHomePage() {
    const logo = document.getElementById('logo')
    logo.addEventListener('click', () => {
        document.location.href = '../../'
    })
}
returnToHomePage()

async function handleSubmit(event) {
    event.preventDefault()
    const body = handleLoginForm()
    validateForm(body.email, body.password)
    const response = await fetchCredentials(BASEURL, body)
    if (response.token) {
        console.log('connected')
        storeToken(response)
    }
}

function handleLoginForm() {
    const email = document.querySelector('#email').value
    const password = document.querySelector('#password').value
    const body = { email, password }
    return body
}

function validateForm(email, password) {
    if (!email || !password) {
        toggleError()
    }
}
function storeToken(data) {
    localStorage.setItem('token', data.token)
}
function toggleError() {
    const errorMessage = document.querySelector('.loginForm-error')
    errorMessage.classList.toggle('hidden')
    setTimeout(() => {
        errorMessage.classList.toggle('hidden')
    }, 3000)
}

async function fetchCredentials(url, body) {
    try {
        const response = await fetch(url + 'users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        })
        if (!response.ok) {
            toggleError()
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        return data
    } catch (error) {
        throw error
    }
}
// const body = { email: 'sophie.bluel@test.tld', password: 'S0phie' }

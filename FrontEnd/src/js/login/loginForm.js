export function handleLoginForm() {
    const email = document.querySelector('#email').value
    const password = document.querySelector('#password').value
    const body = { email, password }
    return body
}

export function validateForm(email, password) {
    if (!email || !password) {
        toggleError()
    }
}

export function toggleError() {
    const errorMessage = document.querySelector('.loginForm-error')
    errorMessage.classList.toggle('hidden')
    setTimeout(() => {
        errorMessage.classList.toggle('hidden')
    }, 3000)
}

export function storeToken(data) {
    localStorage.setItem('token', data.token)
}

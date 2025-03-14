export function handleLoginForm() {
    const email = document.querySelector('#email').value
    const password = document.querySelector('#password').value
    const body = { email, password }
    return body
}

export function storeToken(data) {
    localStorage.setItem('token', data.token)
}

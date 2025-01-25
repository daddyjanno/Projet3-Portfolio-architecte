export function displayLoginPage() {}

const logo = document.getElementById('logo')
console.log(logo)
logo.addEventListener('click', () => {
    document.location.href = '../../index.html'
})

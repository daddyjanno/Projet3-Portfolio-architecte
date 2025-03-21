import { EDITIONBTN, EDITIONMODE, WORKS } from './variables.js'

export function bold(element) {
    element.classList.add('bold')
}
export function unbold(element) {
    element.classList.remove('bold')
}

export function returnToHomePage() {
    console.log('return to home')
    window.location.pathname = '/'
}

export function toggleEditionMode() {
    EDITIONMODE.classList.toggle('hidden')
    EDITIONBTN.classList.toggle('hidden')
}

export function toggleError() {
    const errorMessage = document.querySelector('.error')
    errorMessage.classList.toggle('hidden')
    setTimeout(() => {
        errorMessage.classList.toggle('hidden')
    }, 3000)
}

export function filterWorks(workId) {
    WORKS = [...WORKS.filter((work) => work.id !== workId)]
    return WORKS
}

export function deleteWork(workId) {
    const elementsToDelete = document.querySelectorAll(`[data-id~="${workId}"]`)

    elementsToDelete.forEach((el) => el.remove())
}

export function generateId() {
    return 'id' + Math.random().toString(16).slice(2)
}

import { EDITIONMODE } from './variables.js'

export function bold(element) {
    element.classList.add('bold')
}
export function unbold(element) {
    element.classList.remove('bold')
}

export function returnToHomePage() {
    document.location.href = '../../'
}

export function toggleEditionMode() {
    EDITIONMODE.classList.toggle('hidden')
}

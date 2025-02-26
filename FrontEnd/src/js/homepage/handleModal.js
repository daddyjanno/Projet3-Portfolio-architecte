import { MODAL, MODALCLOSEBTN, MODALGRID } from '../utils/variables.js'
import { createFigure } from './createFigure.js'

export function toggleIsModalOpen(isModalOpen) {
    return !isModalOpen
}

export function openModal(modal) {
    if (modal) {
        modal.style.display = 'flex'
        // document.querySelector('body').style.overflow = 'hidden'
    }
}
export function closeModal(modal) {
    modal.style.display = 'none'
    // document.querySelector('body').style.overflow = 'visible'
}
export function handleModal(isModalOpen) {
    MODALCLOSEBTN.addEventListener('click', () => closeModal(MODAL))

    if (isModalOpen) {
        window.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') {
                MODAL.style.display = 'none'
            }
        })
    }
}
export function displayWorksInModal(works) {
    MODALGRID.innerHTML = ''
    works.forEach((work) => {
        createFigure(work, MODALGRID, false, true)
    })
}

export function handleDelete(button) {
    console.log(button)
    button.addEventListener('click', (event) => console.log(event.target))
}

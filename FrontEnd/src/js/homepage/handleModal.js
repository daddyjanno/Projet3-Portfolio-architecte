import { MODAL, MODALCLOSEBTN } from '../utils/variables.js'

export function toggleIsModalOpen(isModalOpen) {
    return !isModalOpen
}

export function openModal(modal) {
    if (modal) {
        modal.style.display = 'flex'
    }
}
export function closeModal(modal) {
    modal.style.display = 'none'
}
export function handleModal(isModalOpen) {
    MODALCLOSEBTN.addEventListener('click', () => closeModal(MODAL))
    // MODALCONTENT.addEventListener('click', () => closeModal(MODAL))

    if (isModalOpen) {
        window.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') {
                MODAL.style.display = 'none'
            }
        })
    }
}

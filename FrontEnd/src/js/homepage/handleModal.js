export function openModal(modal) {
    if (modal) {
        console.log(modal)
        modal.style.display = 'flex'
    }
}

export function closeModal(modal) {
    modal.style.display = 'none'
}

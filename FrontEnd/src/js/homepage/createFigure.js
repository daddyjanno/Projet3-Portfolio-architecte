import { deleteWorkInModal } from './handleModal.js'

export function createFigure(
    work,
    element,
    caption = false,
    deleteBtn = false
) {
    const figure = document.createElement('figure')
    const img = createImg(work, figure)

    if (caption) {
        createCaption(work, figure)
    }
    if (deleteBtn) {
        createDeleteBtn(work, figure)
    }

    element.appendChild(figure)

    return figure
}
export function createCaption(work, element) {
    const figCaption = document.createElement('figcaption')
    figCaption.innerText = work.title
    element.appendChild(figCaption)

    return figCaption
}

export function createImg(work, element) {
    const img = document.createElement('img')
    img.src = work.imageUrl
    img.alt = work.title

    element.appendChild(img)

    return img
}

export function createDeleteBtn(work, element) {
    const deleteBtn = document.createElement('span')
    deleteBtn.classList.add('delete-btn')
    deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>'
    element.appendChild(deleteBtn)
    deleteBtn.addEventListener('click', (event) => {
        console.log('deletebtn click')
        deleteWorkInModal(work.id)
    })

    return deleteBtn
}

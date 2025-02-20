import { deleteProject } from '../utils/data.js'
import { BASEURL } from '../utils/variables.js'

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
    console.log(work.id)

    const deleteBtn = document.createElement('button')
    deleteBtn.classList.add('delete-btn')
    deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>'
    deleteBtn.addEventListener('click', () => deleteProject(work.id, BASEURL))
    element.appendChild(deleteBtn)

    return deleteBtn
}

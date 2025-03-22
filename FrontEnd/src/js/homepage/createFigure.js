import { generateId } from '../utils/utils.js'
import { MODALGRID, WORKS } from '../utils/variables.js'
import { deleteWork } from './handleModal.js'

export function createFigure(work) {
    const id = work.id ? work.id : generateId()
    const html = `
        <figure data-id=${id}>
            <img 
                src=${work.imageUrl}
                alt=${work.title}
            >
            <figcaption>
                ${work.title}
            </figcaption>
        </figure>
    `
    return html
}

export function createFigureInModal(work) {
    const id = work.id ? work.id : generateId()
    const html = `
            <figure data-id=${id}>
                <img 
                    src= ${work.imageUrl} 
                    alt=${work.title}
                >
                <span class="delete-btn">
                    <i class="fa-solid fa-trash-can">
                    </i>
                </span>
            </figure>
        `
    MODALGRID.innerHTML += html
    handleFigureInModal(id)
}

export function handleFigureInModal(workId) {
    document.querySelector('.delete-btn').addEventListener('click', (event) => {
        console.log('delete click')
        console.log(workId)

        deleteWork(workId)
    })
}

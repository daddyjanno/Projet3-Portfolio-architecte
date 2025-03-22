import { generateId } from '../utils/utils.js'
import { MODALGRID } from '../utils/variables.js'
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
    const figure = document.createElement('figure')
    figure.dataset.id = work.id
    figure.innerHTML = `
           
                <img 
                    src= ${work.imageUrl} 
                    alt=${work.title}
                >
                <span class="delete-btn">
                    <i class="fa-solid fa-trash-can">
                    </i>
                </span>
          
        `
    figure.querySelector('.delete-btn').addEventListener('click', () => {
        console.log(figure.dataset.id)
        deleteWork(figure.dataset.id)
    })
    return figure
}

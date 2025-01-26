import { createFigure } from './createFigure.js'

const gallery = document.querySelector('.gallery')

export function clearGallery() {
    document.querySelector('.gallery').innerHTML = ''
}

export function displayWorks(works) {
    works.forEach((work) => {
        const figure = createFigure(work)
        gallery.appendChild(figure)
    })
}

import { GALLERY } from '../utils/variables.js'
import { createFigure } from './createFigure.js'

export function clearGallery() {
    GALLERY.innerHTML = ''
}

export function displayWorks(works) {
    works.forEach((work) => {
        const figure = createFigure(work)
        GALLERY.appendChild(figure)
    })
}

import { GALLERY } from '../utils/variables.js'
import { createFigure } from './createFigure.js'

export function clearGallery() {
    GALLERY.innerHTML = ''
}

export function displayWorks(element, works) {
    element.innerHTML = ''

    works.forEach((work) => {
        const figure = createFigure(work, element, work.id, true, false)
        element.appendChild(figure)
    })
}

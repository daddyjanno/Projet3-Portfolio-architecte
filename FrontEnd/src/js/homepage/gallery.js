import { GALLERY, WORKS } from '../utils/variables.js'
import { createFigure, createFigureInModal } from './createFigure.js'

export function clearGallery() {
    GALLERY.innerHTML = ''
}

export function displayWork(work) {
    const figure = createFigure(work)
    GALLERY.innerHTML += figure
}

export function initDisplay(works) {
    GALLERY.innerHTML = ''

    works.forEach((element) => {
        displayWork(element)
        createFigureInModal(element)
    })
}

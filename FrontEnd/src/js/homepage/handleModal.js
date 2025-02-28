import { categories } from '../../index.js'
import {
    ADDPHOTOBTN,
    BACKTOMODAL,
    MODAL,
    MODALCLOSEBTN,
    MODALFIRSTVIEW,
    MODALGRID,
    MODALSECONDVIEW,
} from '../utils/variables.js'
import { createFigure } from './createFigure.js'

export function toggleIsModalOpen(isModalOpen) {
    return !isModalOpen
}

function openModal() {
    if (MODAL) {
        MODAL.style.display = 'flex'
        document.querySelector('body').style.overflow = 'hidden'
    }
}
function closeModal() {
    MODALCLOSEBTN.addEventListener('click', () => {
        MODAL.style.display = 'none'
        document.querySelector('body').style.overflow = 'visible'
        MODALFIRSTVIEW.style.display = 'flex'
        MODALSECONDVIEW.style.display = 'none'
    })
}

function closeModalOnEsc() {
    window.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            MODAL.style.display = 'none'
            MODALFIRSTVIEW.style.display = 'flex'
            MODALSECONDVIEW.style.display = 'none'
        }
    })
}
function displayModalFirstView() {
    ADDPHOTOBTN.addEventListener('click', () => {
        MODALFIRSTVIEW.style.display = 'none'
        MODALSECONDVIEW.style.display = 'flex'
    })
}
function displayModalSecondView() {
    BACKTOMODAL.addEventListener('click', () => {
        MODALFIRSTVIEW.style.display = 'flex'
        MODALSECONDVIEW.style.display = 'none'
    })
}
export function handleModal(isModalOpen) {
    if (isModalOpen) {
        closeModal()
        closeModalOnEsc()
        populateModalCategorySelect()
        displayModalFirstView()
        displayModalSecondView()
    }
    openModal()
}
export function displayWorksInModal(works) {
    MODALGRID.innerHTML = ''
    works.forEach((work) => {
        createFigure(work, MODALGRID, false, true)
    })
}

function populateModalCategorySelect() {
    const categorySelect = document.getElementById('category-select')
    categorySelect.innerHTML = ''

    const defaultOption = document.createElement('option')
    defaultOption.value = ''
    defaultOption.disabled = true
    defaultOption.selected = true
    categorySelect.appendChild(defaultOption)

    categories.forEach((category) => {
        const option = document.createElement('option')
        option.value = category.id
        option.textContent = category.name
        categorySelect.appendChild(option)
    })
}

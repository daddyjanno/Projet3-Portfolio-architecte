import { fetchCategories } from '../utils/data.js'
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

export function openModal(modal) {
    if (modal) {
        modal.style.display = 'flex'
        document.querySelector('body').style.overflow = 'hidden'
    }
}
export function closeModal(modal) {
    modal.style.display = 'none'
    document.querySelector('body').style.overflow = 'visible'
}
export function handleModal(isModalOpen) {
    MODALCLOSEBTN.addEventListener('click', () => closeModal(MODAL))

    if (isModalOpen) {
        window.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') {
                MODAL.style.display = 'none'
            }
        })
        ADDPHOTOBTN.addEventListener('click', () => {
            MODALFIRSTVIEW.style.display = 'none'
            MODALSECONDVIEW.style.display = 'flex'
            populateModalCategorySelect()
        })
        BACKTOMODAL.addEventListener('click', () => {
            MODALFIRSTVIEW.style.display = 'flex'
            MODALSECONDVIEW.style.display = 'none'
        })
    }
}
export function displayWorksInModal(works) {
    MODALGRID.innerHTML = ''
    works.forEach((work) => {
        createFigure(work, MODALGRID, false, true)
    })
}

async function populateModalCategorySelect() {
    const categorySelect = document.getElementById('category-select')
    categorySelect.innerHTML = ''

    const defaultOption = document.createElement('option')
    defaultOption.value = ''
    defaultOption.disabled = true
    defaultOption.selected = true
    categorySelect.appendChild(defaultOption)

    const categories = await fetchCategories()
    categories.forEach((category) => {
        const option = document.createElement('option')
        option.value = category.id
        option.textContent = category.name
        categorySelect.appendChild(option)
    })
}

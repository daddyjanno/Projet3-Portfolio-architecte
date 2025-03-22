import {
    CATEGORIES,
    EDITIONBTN,
    FILTERS,
    GALLERY,
    LOGINBTN,
    MODALGRID,
    WORKS,
} from './js/utils/variables.js'
import { displayFilters, manageFiltersClick } from './js/homepage/filters.js'
import { displayWork } from './js/homepage/gallery.js'
import { toggleEditionMode, unbold } from './js/utils/utils.js'
import { handleModal, toggleIsModalOpen } from './js/homepage/handleModal.js'

import {
    createFigureInModal,
    handleFigureInModal,
} from './js/homepage/createFigure.js'

function init() {
    let isModalOpen = false
    const hasToken = localStorage.getItem('token') ? true : false

    WORKS.forEach((element) => {
        displayWork(element)
        createFigureInModal(element)
    })
    manageFiltersClick(WORKS)
    handleFigureInModal()
    displayFilters(CATEGORIES)

    LOGINBTN.addEventListener('click', () => {
        if (LOGINBTN.innerText === 'login') {
            document.location.href = './login.html'
        }
        if (LOGINBTN.innerText === 'logout') {
            FILTERS.style.display = 'flex'
            localStorage.clear()
            LOGINBTN.innerText = 'login'
            toggleEditionMode()
            unbold(LOGINBTN)
        }
    })

    if (hasToken) {
        FILTERS.style.display = 'none'
        LOGINBTN.innerText = 'logout'
        toggleEditionMode()
        EDITIONBTN.addEventListener('click', () => {
            isModalOpen = toggleIsModalOpen(isModalOpen)
            handleModal(isModalOpen, WORKS)
        })
    }
}

init()

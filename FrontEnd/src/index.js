import {
    CATEGORIES,
    EDITIONBTN,
    FILTERS,
    GALLERY,
    LOGINBTN,
    MODALGRID,
} from './js/utils/variables.js'
import { displayFilters, manageFiltersClick } from './js/homepage/filters.js'
import { displayWorks } from './js/homepage/gallery.js'
import { toggleEditionMode, unbold } from './js/utils/utils.js'
import { handleModal, toggleIsModalOpen } from './js/homepage/handleModal.js'
import { fetchWorks } from './js/utils/data.js'

const works = await fetchWorks()

function init() {
    let isModalOpen = false
    const hasToken = localStorage.getItem('token') ? true : false

    displayWorks(GALLERY, works, true, false)
    displayWorks(MODALGRID, works, false, true)
    displayFilters(CATEGORIES)
    manageFiltersClick(works)

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
            handleModal(isModalOpen, works)
        })
    }
}

init()

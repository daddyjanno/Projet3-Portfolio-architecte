import {
    EDITIONBTN,
    GALLERY,
    LOGINBTN,
    MODAL,
    MODALGRID,
} from './js/utils/variables.js'
import { displayFilters, manageFiltersClick } from './js/homepage/filters.js'
import { displayWorks } from './js/homepage/gallery.js'
import { fetchWorks, fetchCategories } from './js/utils/fetchData.js'
import { toggleEditionMode, unbold } from './js/utils/utils.js'
import {
    handleModal,
    openModal,
    toggleIsModalOpen,
} from './js/homepage/handleModal.js'
import { createImg } from './js/homepage/createFigure.js'

export const BASEURL = 'http://localhost:5678/api/'

const categories = await fetchCategories(BASEURL)
const works = await fetchWorks(BASEURL)
console.log(works[0])

const hasToken = localStorage.getItem('token') ? true : false

let isModalOpen = false
console.log('isModalOpen init', isModalOpen)

if (document.location.href === 'http://127.0.0.1:5500/FrontEnd/') {
    console.log('hasToken', hasToken)

    displayWorks(works, GALLERY)
    displayFilters(categories)
    manageFiltersClick(works)

    LOGINBTN.addEventListener('click', () => {
        if (LOGINBTN.innerText === 'login') {
            document.location.href = './login.html'
        }
        if (LOGINBTN.innerText === 'logout') {
            localStorage.clear()
            LOGINBTN.innerText = 'login'
            toggleEditionMode()
            unbold(LOGINBTN)
        }
    })

    console.log('index')
}
if (hasToken) {
    LOGINBTN.innerText = 'logout'
    toggleEditionMode()
    EDITIONBTN.addEventListener('click', () => {
        openModal(MODAL)
        isModalOpen = toggleIsModalOpen(isModalOpen)
        handleModal(isModalOpen)
    })
    works.forEach((work) => {
        createImg(work, MODALGRID)
    })
}

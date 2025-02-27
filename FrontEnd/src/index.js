import {
    BASEURL,
    EDITIONBTN,
    FILTERS,
    GALLERY,
    LOGINBTN,
    MODAL,
} from './js/utils/variables.js'
import { displayFilters, manageFiltersClick } from './js/homepage/filters.js'
import { displayWorks } from './js/homepage/gallery.js'
import { fetchWorks, fetchCategories } from './js/utils/data.js'
import { toggleEditionMode, unbold } from './js/utils/utils.js'
import {
    displayWorksInModal,
    handleModal,
    openModal,
    toggleIsModalOpen,
} from './js/homepage/handleModal.js'

const categories = await fetchCategories(BASEURL)
const works = await fetchWorks(BASEURL)

const hasToken = localStorage.getItem('token') ? true : false

let isModalOpen = false
console.log('isModalOpen init', isModalOpen)

if (window.location.pathname === '/FrontEnd/') {
    console.log('hasToken', hasToken)

    displayWorks(works, GALLERY)
    displayFilters(categories)
    manageFiltersClick(works)

    LOGINBTN.addEventListener('click', () => {
        if (LOGINBTN.innerText === 'login') {
            document.location.href = './login.html'
            FILTERS.style.display = 'none'
        }
        if (LOGINBTN.innerText === 'logout') {
            FILTERS.style.display = 'flex'
            localStorage.clear()
            LOGINBTN.innerText = 'login'
            toggleEditionMode()
            unbold(LOGINBTN)
        }
    })

    console.log('index')
}
if (hasToken) {
    FILTERS.style.display = 'none'
    LOGINBTN.innerText = 'logout'
    toggleEditionMode()
    EDITIONBTN.addEventListener('click', () => {
        openModal(MODAL)
        isModalOpen = toggleIsModalOpen(isModalOpen)
        handleModal(isModalOpen)

        displayWorksInModal(works)
    })
}

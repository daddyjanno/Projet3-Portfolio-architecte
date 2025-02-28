import { EDITIONBTN, FILTERS, GALLERY, LOGINBTN } from './js/utils/variables.js'
import { displayFilters, manageFiltersClick } from './js/homepage/filters.js'
import { displayWorks } from './js/homepage/gallery.js'
import { fetchWorks, fetchCategories } from './js/utils/data.js'
import { toggleEditionMode, unbold } from './js/utils/utils.js'
import {
    displayWorksInModal,
    handleModal,
    toggleIsModalOpen,
} from './js/homepage/handleModal.js'

console.log('index')
export const categories = await fetchCategories()
const works = await fetchWorks()

const hasToken = localStorage.getItem('token') ? true : false

let isModalOpen = false

if (window.location.pathname === '/FrontEnd/') {
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
}
if (hasToken) {
    FILTERS.style.display = 'none'
    LOGINBTN.innerText = 'logout'
    toggleEditionMode()
    EDITIONBTN.addEventListener('click', () => {
        isModalOpen = toggleIsModalOpen(isModalOpen)
        handleModal(isModalOpen)

        displayWorksInModal(works)
    })
}

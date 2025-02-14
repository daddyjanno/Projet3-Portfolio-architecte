import {
    EDITIONBTN,
    LOGINBTN,
    MODAL,
    MODALCLOSEBTN,
    MODALCONTENT,
} from './js/utils/variables.js'
import { displayFilters, manageFiltersClick } from './js/homepage/filters.js'
import { displayWorks } from './js/homepage/gallery.js'
import { fetchWorks, fetchCategories } from './js/utils/fetchData.js'
import { toggleEditionMode, unbold } from './js/utils/utils.js'
import { closeModal, openModal } from './js/homepage/handleModal.js'

export const BASEURL = 'http://localhost:5678/api/'

const categories = await fetchCategories(BASEURL)
const works = await fetchWorks(BASEURL)

if (
    document.location.href === 'http://127.0.0.1:5500/FrontEnd/' &&
    localStorage.getItem('token')
) {
    LOGINBTN.innerText = 'logout'
    toggleEditionMode()

    LOGINBTN.addEventListener('click', () => {
        if (LOGINBTN.innerText === 'login') {
            document.location.href = './src/html/login.html'
        }
        if (LOGINBTN.innerText === 'logout') {
            localStorage.clear()
            LOGINBTN.innerText = 'login'
            toggleEditionMode()
        }
    })

    displayFilters(categories)
    displayWorks(works)
    unbold(LOGINBTN)
    console.log('index')
}
EDITIONBTN.addEventListener('click', () => openModal(MODAL))
MODALCLOSEBTN.addEventListener('click', () => closeModal(MODAL))
MODALCONTENT.addEventListener('click', () => closeModal(MODAL))

manageFiltersClick(works)

import { fetchCategories, fetchWorks } from './js/fetchData.js'
import { displayFilters, manageFiltersClick } from './js/filters.js'
import { displayWorks } from './js/gallery.js'

export const BASEURL = 'http://localhost:5678/api/'

const categories = await fetchCategories(BASEURL)
const works = await fetchWorks(BASEURL)
const loginBtn = document.getElementById('login')

export function bold(element) {
    element.classList.add('bold')
}
export function unbold(element) {
    element.classList.remove('bold')
}

if (document.location.href === 'http://127.0.0.1:5500/FrontEnd/') {
    displayFilters(categories)
    displayWorks(works)
    unbold(loginBtn)
    console.log('index')
}

manageFiltersClick(works)

loginBtn.addEventListener('click', () => {
    document.location.href = './src/html/login.html'
})

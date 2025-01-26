import { displayFilters, manageFiltersClick } from './js/homepage/filters.js'
import { displayWorks } from './js/homepage/gallery.js'
import { fetchWorks, fetchCategories } from './js/utils/fetchData.js'
import { unbold } from './js/utils/utils.js'
import { LOGINBTN } from './js/utils/variables.js'

export const BASEURL = 'http://localhost:5678/api/'

const categories = await fetchCategories(BASEURL)
const works = await fetchWorks(BASEURL)

if (document.location.href === 'http://127.0.0.1:5500/FrontEnd/') {
    displayFilters(categories)
    displayWorks(works)
    unbold(LOGINBTN)
    console.log('index')
}

manageFiltersClick(works)

LOGINBTN.addEventListener('click', () => {
    document.location.href = './src/html/login.html'
})

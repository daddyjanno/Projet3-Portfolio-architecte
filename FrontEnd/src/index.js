import { fetchCategories, fetchWorks } from './js/fetchData.js'
import { displayFilters, manageFiltersClick } from './js/filters.js'
import { displayWorks } from './js/gallery.js'

const BASEURL = 'http://localhost:5678/api/'

const categories = await fetchCategories(BASEURL)
displayFilters(categories)

const works = await fetchWorks(BASEURL)
displayWorks(works)

manageFiltersClick(works)

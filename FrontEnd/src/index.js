import { createFigure } from './js/createFigure.js'
import { createFilter } from './js/createFilter.js'
import { fetchCategories, fetchWorks } from './js/fetchData.js'

const BASEURL = 'http://localhost:5678/api/'

const works = await fetchWorks(BASEURL)
console.log(works)

const categories = await fetchCategories(BASEURL)
console.log(categories)

const gallery = document.querySelector('.gallery')
works.forEach((work) => {
    const figure = createFigure(work)
    gallery.appendChild(figure)
})

const filters = document.querySelector('.filters')
categories.forEach((category) => {
    const filter = createFilter(category)
    filters.appendChild(filter)
})

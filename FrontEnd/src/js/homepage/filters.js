import { FILTERS, GALLERY } from '../utils/variables.js'
import { createFilter } from './createFilter.js'
import { clearGallery, displayWork } from './gallery.js'

export function displayFilters(categories) {
    const all = createFilter({ name: 'Tous' })

    all.classList.add('active')
    FILTERS.appendChild(all)
    categories.forEach((category) => {
        const filter = createFilter(category)
        FILTERS.appendChild(filter)
    })
}

function defineFilterValue(filters, filterValue) {
    for (const item of filters) {
        if (item.classList.contains('active')) {
            filterValue = item.innerText
        }
    }
    return filterValue
}

function filterWorks(filterValue, works) {
    if (filterValue === 'Tous') {
        return works
    }
    let filteredWorks
    filteredWorks = works.filter((el) => el.category.name === filterValue)

    return filteredWorks
}

function manageActiveClass(filters, filter) {
    filters.forEach((filter) => filter.classList.remove('active'))
    filter.classList.add('active')
}

export function manageFiltersClick(works) {
    const filters = document.querySelectorAll('.filter')
    let filterValue = ''
    let filteredWorks

    filters.forEach((filter) => {
        filter.addEventListener('click', () => {
            manageActiveClass(filters, filter)
            filterValue = defineFilterValue(filters, filterValue)
            filteredWorks = filterWorks(filterValue, works)
            clearGallery()
            filterWorks.forEach((el) => {
                displayWork(el)
            })
        })
    })
}

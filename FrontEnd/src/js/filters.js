import { createFilter } from './createFilter.js'
import { clearGallery, displayWorks } from './gallery.js'

export function displayFilters(categories) {
    const filtersDiv = document.querySelector('.filters')

    const all = createFilter({ name: 'Tous' })

    all.classList.add('active')
    filtersDiv.appendChild(all)
    categories.forEach((category) => {
        const filter = createFilter(category)
        filtersDiv.appendChild(filter)
    })
}

export function defineFilterValue(filter) {
    let filterValue = ''
    filterValue = filter
    return filterValue
}

export function filterWorks(filterValue, works) {
    if (filterValue === 'Tous') {
        return works
    }
    let filteredWorks
    filteredWorks = works.filter((el) => el.category.name === filterValue)

    return filteredWorks
}

export function manageFiltersClick(works) {
    const filters = document.querySelectorAll('.filter')

    let filterValue = ''
    let filteredWorks

    for (var item of filters) {
        if (item.classList.contains('active')) {
            filterValue = item.firstChild.innerText
        }
    }

    filters.forEach((filter) => {
        filter.addEventListener('click', (event) => {
            filters.forEach((filter) => filter.classList.remove('active'))
            filter.classList.add('active')
            filterValue = defineFilterValue(event.target.innerText)
            filteredWorks = filterWorks(filterValue, works)
            clearGallery()
            displayWorks(filteredWorks)
        })
    })
}

import { deleteWork, handleModal, toggleIsModalOpen } from './modal.js'
import { fetchCategories, fetchWorks } from './utils/data.js'
import { toggleEditionMode, unbold } from './utils/utils.js'
import {
    EDITIONBTN,
    FILTERS,
    GALLERY,
    LOGINBTN,
    MODALGRID,
} from './utils/variables.js'

const WORKS = await fetchWorks()
export const CATEGORIES = await fetchCategories()

function init() {
    let isModalOpen = false
    const hasToken = localStorage.getItem('token') ? true : false

    initDisplay(WORKS)
    displayFilters(CATEGORIES)
    manageFiltersClick()
    manageFiltersClick()

    LOGINBTN.addEventListener('click', () => {
        if (LOGINBTN.innerText === 'login') {
            document.location.href = './login.html'
        }
        if (LOGINBTN.innerText === 'logout') {
            FILTERS.style.display = 'flex'
            localStorage.clear()
            LOGINBTN.innerText = 'login'
            toggleEditionMode()
            unbold(LOGINBTN)
        }
    })

    if (hasToken) {
        FILTERS.style.display = 'none'
        LOGINBTN.innerText = 'logout'
        toggleEditionMode()
        EDITIONBTN.addEventListener('click', () => {
            isModalOpen = toggleIsModalOpen(isModalOpen)
            handleModal(isModalOpen, WORKS)
        })
    }

    handleContactForm()
}
init()

export function createFigure(work) {
    const html = `
        <figure data-id=${work.id} data-category-id=${work.categoryId} class=figure>
            <img 
                src=${work.imageUrl}
                alt=${work.title}
            >
            <figcaption>
                ${work.title}
            </figcaption>
        </figure>
    `
    return html
}

export function createFigureInModal(work) {
    const figure = document.createElement('figure')
    figure.dataset.id = work.id
    figure.dataset.categoryId = work.categoryId
    figure.classList.add('figure')
    figure.innerHTML = `
           
                <img 
                    src= ${work.imageUrl} 
                    alt=${work.title}
                >
                <span class="delete-btn">
                    <i class="fa-solid fa-trash-can">
                    </i>
                </span>
          
        `
    figure.querySelector('.delete-btn').addEventListener('click', () => {
        deleteWork(figure.dataset.id)
    })
    return figure
}

function createFilter(category) {
    const div = document.createElement('div')
    div.classList.add('filter')
    div.dataset.categoryId = category.id || 'Tous'

    const h3 = document.createElement('h3')
    h3.innerText = category.name

    div.appendChild(h3)

    return div
}

function displayFilters(categories) {
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
            filterValue = item.dataset.categoryId
        }
    }
    return filterValue
}

function manageActiveClass(filters, filter) {
    filters.forEach((filter) => filter.classList.remove('active'))
    filter.classList.add('active')
}

function filterWorks(filterValue) {
    const figures = document.querySelectorAll('.figure')

    if (filterValue === 'Tous') {
        figures.forEach((figure) => {
            figure.classList.remove('hidden')
        })
    } else {
        figures.forEach((figure) => {
            if (figure.dataset.categoryId !== filterValue) {
                figure.classList.add('hidden')
            } else {
                figure.classList.remove('hidden')
            }
        })
    }
}

export function manageFiltersClick() {
    const filters = document.querySelectorAll('.filter')
    let filterValue

    filters.forEach((filter) => {
        filter.addEventListener('click', () => {
            manageActiveClass(filters, filter)
            filterValue = defineFilterValue(filters, filterValue)
            filterWorks(filterValue)
        })
    })
}

export function displayWork(work) {
    const figure = createFigure(work)
    GALLERY.innerHTML += figure
}

export function displayWorkInModal(work) {
    const figure = createFigureInModal(work)
    MODALGRID.appendChild(figure)
}

export function initDisplay(works) {
    GALLERY.innerHTML = ''

    works.forEach((element) => {
        displayWork(element)
        displayWorkInModal(element)
    })
}

function handleContactForm() {
    const btn = document.getElementById('contactFormSubmit')
    btn.addEventListener('click', (event) => event.preventDefault())
}

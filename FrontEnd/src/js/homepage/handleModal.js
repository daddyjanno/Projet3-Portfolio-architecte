import { deleteProject } from '../utils/data.js'
import {
    ADDPHOTOBTN,
    BACKTOMODAL,
    MODAL,
    MODALCLOSEBTN,
    MODALFIRSTVIEW,
    MODALGRID,
    MODALSECONDVIEW,
    CATEGORIES,
    filterWorks,
    WORKS,
    GALLERY,
    UPLOADBTN,
    IMGPREVIEW,
    UPLOADLAYOUT,
    IMGDELETE,
    DELETEBTN,
} from '../utils/variables.js'
import { createFigure } from './createFigure.js'
import { displayWorks } from './gallery.js'

let isFirstView = true

export function toggleIsModalOpen(isModalOpen) {
    return !isModalOpen
}

function openModal() {
    if (MODAL) {
        MODAL.style.display = 'flex'
        document.querySelector('body').style.overflow = 'hidden'
    }
}
function closeModal() {
    MODAL.style.display = 'none'
    document.querySelector('body').style.overflow = 'visible'
    MODALFIRSTVIEW.style.display = 'flex'
    MODALSECONDVIEW.style.display = 'none'
}

function closeModalOnClick() {
    MODALCLOSEBTN.addEventListener('click', () => {
        closeModal()
    })
}

function closeModalOnEsc() {
    window.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            closeModal()
        }
    })
}
function closeModalOnClickOutside() {
    window.addEventListener('click', (event) => {
        if (event.target == MODAL) {
            closeModal()
        }
    })
}

function displayModalFirstView() {
    ADDPHOTOBTN.addEventListener('click', () => {
        MODALFIRSTVIEW.style.display = 'none'
        MODALSECONDVIEW.style.display = 'flex'
        isFirstView = true
    })
}
function displayModalSecondView() {
    BACKTOMODAL.addEventListener('click', () => {
        MODALFIRSTVIEW.style.display = 'flex'
        MODALSECONDVIEW.style.display = 'none'
    })
}

export function displayWorksInModal(works) {
    console.log('displayWorksInModal')

    MODALGRID.innerHTML = ''
    works.forEach((work) => {
        createFigure(work, MODALGRID, false, true)
    })
}

export function deleteWorkInModal(workId) {
    const confirm = window.confirm(
        'Êtes-vous sûr de vouloir supprimer cette photo ?'
    )
    if (!confirm) return
    deleteProject(workId)
    filterWorks(workId)
    displayWorksInModal(WORKS)
    displayWorks(GALLERY, WORKS)
}

function populateModalCategorySelect() {
    const categorySelect = document.getElementById('category-select')

    CATEGORIES.forEach((category) => {
        const option = document.createElement('option')
        option.value = category.id
        option.textContent = category.name
        categorySelect.appendChild(option)
    })
}

function renderPreview() {
    UPLOADBTN.addEventListener('change', () => {
        getImageData()
    })
}

function getImageData() {
    const files = UPLOADBTN.files[0]
    console.log(files)

    if (files) {
        const fileReader = new FileReader()
        fileReader.readAsDataURL(files)
        fileReader.addEventListener('load', function () {
            UPLOADLAYOUT.style.display = 'none'
            IMGPREVIEW.style.display = 'flex'
            const img = document.createElement('img')
            img.classList.add('img-previewDisplay')
            img.src = `${this.result}`
            IMGPREVIEW.appendChild(img)
        })
    }
}

function deleteImage() {
    IMGPREVIEW.addEventListener('click', () => {
        console.log('toto')
        const img = document.querySelector('.img-previewDisplay')
        IMGPREVIEW.removeChild(img)
        UPLOADLAYOUT.style.display = 'flex'
        IMGPREVIEW.style.display = 'none'
    })
}

export function handleModal(isModalOpen, works) {
    if (isModalOpen) {
        closeModalOnClick()
        closeModalOnEsc()
        closeModalOnClickOutside()
        populateModalCategorySelect()
        displayModalFirstView()
        displayModalSecondView()
        displayWorksInModal(works)
        renderPreview()
        deleteImage()
    }
    openModal()
}

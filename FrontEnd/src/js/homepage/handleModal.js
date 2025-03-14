import { createProject, deleteProject } from '../utils/data.js'
import { toggleError } from '../utils/utils.js'
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
    MODALFORM,
    MODALSUBMIT,
} from '../utils/variables.js'
import { createFigure } from './createFigure.js'
import { displayWorks } from './gallery.js'

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
    MODALFIRSTVIEW.style.display = 'none'
    MODALSECONDVIEW.style.display = 'flex'
}

function displayModalFirstViewOnclick() {
    ADDPHOTOBTN.addEventListener('click', () => {
        displayModalFirstView()
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
    const categorySelect = document.getElementById('category')

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
            img.id = 'image'
            img.classList.add('img-previewDisplay')
            img.src = `${this.result}`
            IMGPREVIEW.appendChild(img)
        })
    }
}

function deleteImage() {
    const img = document.querySelector('.img-previewDisplay')
    if (img) {
        IMGPREVIEW.removeChild(img)
    }
    UPLOADLAYOUT.style.display = 'flex'
    IMGPREVIEW.style.display = 'none'
}

function deleteImgOnclick() {
    IMGPREVIEW.addEventListener('click', () => {
        deleteImage()
    })
}

function handleSubmit() {
    MODALSUBMIT.addEventListener('click', (event) => {
        event.preventDefault()
        deleteImage()
        postFormData()
        MODALFORM.reset()
        displayWorksInModal(WORKS)
        displayModalFirstView()
        displayWorks(GALLERY, WORKS)
    })
}

function postFormData() {
    const titleForm = document.getElementById('title').value
    const categoryForm = document.getElementById('category').value
    const imageForm = document.getElementById('upload-btn').files[0]

    console.log(imageForm, titleForm, categoryForm)

    if (!imageForm || !titleForm || !categoryForm) {
        toggleError()
        return
    }
    console.log(titleForm, categoryForm, imageForm)

    const formData = new FormData()
    formData.append('image', imageForm)
    formData.append('title', titleForm)
    formData.append('category', categoryForm)

    createProject(formData)
}

export function handleModal(isModalOpen, works) {
    if (isModalOpen) {
        closeModalOnClick()
        closeModalOnEsc()
        closeModalOnClickOutside()
        populateModalCategorySelect()
        displayModalFirstViewOnclick()
        displayModalSecondView()
        displayWorksInModal(works)
        renderPreview()
        deleteImgOnclick()
        handleSubmit()
    }
    openModal()
}

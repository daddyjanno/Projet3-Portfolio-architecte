import { displayWork, displayWorkInModal } from './homepage.js'
import { createProject, deleteProject } from './utils/data.js'
import { toggleError } from './utils/utils.js'
import {
    ADDPHOTOBTN,
    BACKTOMODAL,
    MODAL,
    MODALCLOSEBTN,
    MODALFIRSTVIEW,
    MODALSECONDVIEW,
    CATEGORIES,
    UPLOADBTN,
    IMGPREVIEW,
    UPLOADLAYOUT,
    MODALFORM,
    MODALSUBMIT,
} from './utils/variables.js'

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
    })
}
function displayModalSecondView() {
    BACKTOMODAL.addEventListener('click', () => {
        MODALFIRSTVIEW.style.display = 'flex'
        MODALSECONDVIEW.style.display = 'none'
    })
}

export function deleteWork(workId) {
    const confirm = window.confirm(
        'Êtes-vous sûr de vouloir supprimer cette photo ?'
    )
    if (!confirm) return
    deleteWorkInModal(workId)
    deleteProject(workId)
}

function deleteWorkInModal(workId) {
    const elementsToDelete = document.querySelectorAll(`[data-id~="${workId}"]`)

    elementsToDelete.forEach((el) => el.remove())
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

function deleteImagePreview() {
    const img = document.querySelector('.img-previewDisplay')
    if (img) {
        IMGPREVIEW.removeChild(img)
    }
    UPLOADLAYOUT.style.display = 'flex'
    IMGPREVIEW.style.display = 'none'
}

function deleteImgOnclick() {
    IMGPREVIEW.addEventListener('click', () => {
        deleteImagePreview()
    })
}

function handleSubmit() {
    MODALSUBMIT.addEventListener('click', (event) => {
        event.preventDefault()
        deleteImagePreview()
        postFormData()
        MODALFORM.reset()
        closeModal()
        displayModalFirstView()
    })
}

async function postFormData() {
    const titleForm = document.getElementById('title').value
    const categoryForm = document.getElementById('category').value
    const imageForm = document.getElementById('upload-btn').files[0]

    if (!imageForm || !titleForm || !categoryForm) {
        toggleError()
        return
    }

    const formData = new FormData()
    formData.append('image', imageForm)
    formData.append('title', titleForm)
    formData.append('category', categoryForm)

    const response = await createProject(formData)
    displayWork(response)
    displayWorkInModal(response)
}

export function handleModal(isModalOpen) {
    if (isModalOpen) {
        closeModalOnClick()
        closeModalOnEsc()
        closeModalOnClickOutside()
        populateModalCategorySelect()
        displayModalFirstView()
        displayModalSecondView()
        renderPreview()
        deleteImgOnclick()
        handleSubmit()
    }
    openModal()
}

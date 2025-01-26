export function createFilter(category) {
    const div = document.createElement('div')
    div.classList.add('filter')

    const h3 = document.createElement('h3')
    h3.innerText = category.name

    div.appendChild(h3)

    return div
}

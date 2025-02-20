export function createFigure(work, element) {
    const figure = document.createElement('figure')
    const img = createImg(work, figure)
    const caption = createCaption(work, figure)

    element.appendChild(figure)

    return figure
}
export function createCaption(work, element) {
    const figCaption = document.createElement('figcaption')
    figCaption.innerText = work.title
    element.appendChild(figCaption)

    return figCaption
}

export function createImg(work, element) {
    const img = document.createElement('img')
    img.src = work.imageUrl
    img.alt = work.title

    element.appendChild(img)

    return img
}

export function createFigure(work) {
    const figure = document.createElement('figure')

    const img = document.createElement('img')
    img.src = work.imageUrl
    img.alt = work.title
    figure.appendChild(img)

    const figCaption = document.createElement('figcaption')
    figCaption.innerText = work.title
    figure.appendChild(figCaption)

    return figure
}

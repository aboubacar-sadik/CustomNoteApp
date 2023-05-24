const modalWrapper = document.querySelector('.modal-wrapper')
const notesWrapper = document.querySelector('.notes-wrapper')
const submitNoteBtn = document.getElementById('add-note-btn')
const addNewNoteBtn = document.getElementById('add-new-note-btn')
const titleInputField = document.querySelector('#title')
const descriptionInputField = document.querySelector('#description')
const noteDetails = document.querySelector('.details')
const closeModalIcon = document.querySelector('.close-icon')
const errorMsg = document.querySelector('.error-msg')

addNewNoteBtn.addEventListener('click', () => modalWrapper.classList.add('active'))

closeModalIcon.addEventListener('click', () => modalWrapper.classList.remove('active'))

submitNoteBtn.addEventListener('click', (e) => {
    e.preventDefault()
    displayNote()
})

function getDate() {
    const d = new Date();
    const date = new Intl.DateTimeFormat('fr-FR').format(d)
    return date
}

titleInputField.addEventListener('keypress', () => errorMsg.style.display = 'none')
descriptionInputField.addEventListener('keypress', () => errorMsg.style.display = 'none')

function displayNote() {

    if (titleInputField.value && descriptionInputField.value) {

        modalWrapper.classList.remove('active')

        const noteTitle = document.createElement('h2')
        noteTitle.textContent = titleInputField.value

        const noteDescription = document.createElement('p')
        noteDescription.classList.add('description')
        noteDescription.textContent = descriptionInputField.value

        const editNoteBtn = document.createElement('span')
        editNoteBtn.id = 'edit-note'
        editNoteBtn.textContent = 'Editer'
        editNoteBtn.addEventListener('click', () => editNote(noteTitle, noteDescription, notesWrapper, note))

        const deleteNoteBtn = document.createElement('span')
        deleteNoteBtn.id = 'delete-note'
        deleteNoteBtn.textContent = 'Supprimer'
        deleteNoteBtn.addEventListener('click', () => {
            removeNote(notesWrapper, note)
        })

        const details = document.createElement('div')
        details.classList.add('details')
        details.append(editNoteBtn, deleteNoteBtn)

        const openNoteDetailsBtn = document.createElement('img')
        openNoteDetailsBtn.src = './svg/dotted-menu.svg'
        openNoteDetailsBtn.id = 'note-details'
        openNoteDetailsBtn.addEventListener('click', () => details.classList.toggle('active'))

        const detailsGroup = document.createElement('div')
        detailsGroup.classList.add('details-group')
        detailsGroup.append(details, openNoteDetailsBtn)

        const date = document.createElement('span')
        date.classList.add('date')
        date.textContent = getDate()

        const line = document.createElement('span')
        line.classList.add('line')

        const noteFooter = document.createElement('div')
        noteFooter.classList.add('footer')
        noteFooter.append(line, date, detailsGroup)

        const note = document.createElement('div')
        note.classList.add('note')
        note.append(noteTitle, noteDescription, noteFooter)
        notesWrapper.append(note)

        titleInputField.value = ''
        descriptionInputField.value = ''

    } else {
        errorMsg.style.display = 'block'
    }
}

function editNote(noteTitle, noteDesctiption, noteContainer, note) {

    removeNote(noteContainer, note)
    titleInputField.value = noteTitle.textContent
    descriptionInputField.value = noteDesctiption.textContent
    modalWrapper.classList.add('active')

}

function removeNote(noteContainer, note) {

    noteContainer.removeChild(note)

}


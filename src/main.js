var randomButton = document.querySelector(".random-cover-button");
var coverImage = document.querySelector(".cover-image");
var coverTitle = document.querySelector(".cover-title");
var tagline1 = document.querySelector(".tagline-1");
var tagline2 = document.querySelector(".tagline-2");
var makeCoverButton = document.querySelector(".make-new-button");
var homeCover = document.querySelector('.home-view');
var form = document.querySelector('.form-view');
var saveCoverButton = document.querySelector('.save-cover-button');
var homeButton = document.querySelector('.home-button');
var viewSaveButton = document.querySelector('.view-saved-button');
var savedView = document.querySelector('.saved-view');
var makeBookButton = document.querySelector('.create-new-book-button');

var coverInput = document.querySelector('.user-cover')
var titleInput = document.querySelector('.user-title')
var desc1Input = document.querySelector('.user-desc1')
var desc2Input = document.querySelector('.user-desc2')
var randomBook;
var savedCoversSection = document.querySelector('.saved-covers-section')


function getRandomIndex(array) {
  return Math.floor(Math.random() * (array.length))
}

randomButton.addEventListener("click", createRandomCover)

function createRandomCover() {
  coverImage.src = covers[getRandomIndex(covers)]
  coverTitle.innerText = titles[getRandomIndex(titles)]
  tagline1.innerText = descriptors[getRandomIndex(descriptors)]
  tagline2.innerText = descriptors[getRandomIndex(descriptors)]
  randomBook = new Cover (coverImage.src, coverTitle.innerText, tagline1.innerText, tagline2.innerText)
}
createRandomCover()

makeCoverButton.addEventListener('click', showForm)

function showForm() {
  homeCover.classList.add('hidden')
  form.classList.remove('hidden')
  randomButton.classList.add('hidden')
  saveCoverButton.classList.add('hidden')
  homeButton.classList.remove('hidden')
  makeBookButton.disabled = true
  savedView.classList.add('hidden')

}

document.addEventListener('keyup', enableMakeBookButton)

function enableMakeBookButton() {
  if (coverInput.value && titleInput.value && desc1Input.value && desc2Input.value) {
    makeBookButton.disabled = false
  }
}


viewSaveButton.addEventListener('click', showSavedCovers)

function showSavedCovers() {
  homeCover.classList.add('hidden')
  form.classList.add('hidden')
  savedView.classList.remove('hidden')
  randomButton.classList.add('hidden')
  saveCoverButton.classList.add('hidden')
  homeButton.classList.remove('hidden')
}

homeButton.addEventListener('click', goHome)

function goHome() {
  homeCover.classList.remove('hidden')
  saveCoverButton.classList.remove('hidden')
  homeButton.classList.add('hidden')
  randomButton.classList.remove('hidden')

}



makeBookButton.addEventListener('click', makeNewBook, saveNewBookData)

function saveNewBookData() {
  event.preventDefault()
  covers.push(coverInput.value)
  titles.push(titleInput.value)
  descriptors.push(desc1Input.value)
  descriptors.push(desc2Input.value)
}
function makeNewBook() {
  event.preventDefault()
  randomBook = new Cover(coverInput.value, titleInput.value, desc1Input.value, desc2Input.value)
  goHome()
  form.classList.add('hidden')
  coverImage.src = randomBook.cover
  coverTitle.innerText = randomBook.title
  tagline1.innerText = randomBook.tagline1
  tagline2.innerText = randomBook.tagline2
}

var savedCovers = []

saveCoverButton.addEventListener('click', saveCover)
function saveCover() {
  if (savedCovers.length === 0) {
    savedCovers.push(randomBook)
  } else {
    var idList = [];
    for (var i = 0; i < savedCovers.length; i++) {
      idList.push(savedCovers[i].id)
    }
    if (!idList.includes(randomBook.id)) {
      savedCovers.push(randomBook)
    }
  }
}

viewSaveButton.addEventListener('click', displaySavedCovers)

function displaySavedCovers() {
  savedCoversSection.innerHTML = ``
  savedView.classList.remove('hidden')
  for (var i = 0; i < savedCovers.length; i++) {
  savedCoversSection.innerHTML += `<article class="mini-cover" id=${savedCovers[i].id}>
                        <img class="cover-image" src=${savedCovers[i].cover}>
                        <h2 class="cover-title">${savedCovers[i].title}</h2>
                        <h3 class="tagline">A tale of <span class="tagline-1">${savedCovers[i].tagline1}</span> and <span class="tagline-2">${savedCovers[i].tagline2}</span></h3>
                        <img class="price-tag" src="./assets/price.png">
                        <img class="overlay" src="./assets/overlay.png">
                        </article>`
  }
}

savedView.addEventListener('dblclick', deleteBook)

function deleteBook() {
  for (var i = 0; i < savedCovers.length; i++) {
    if (`${savedCovers[i].id}` === event.target.parentNode.id) {
      savedCovers.splice(i, 1)
    }
  }
    displaySavedCovers()
}

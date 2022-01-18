// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
// Modules
const {ipcRenderer} = require('electron')

// Dom Nodes
let showModal = document.getElementById('show-modal'),
    closeModal = document.getElementById('close-modal'),
    modal = document.getElementById('modal'),
    addItem = document.getElementById('add-item'),
    itemUrl = document.getElementById('url')

// Disable & Enable modal buttons
const toggleModalButtons = () => {

  // Check state of buttons
  if (addItem.disabled === true) {
    addItem.disabled = false
    addItem.style.opacity = 1
    addItem.innerText = 'Add Item'
    closeModal.style.display = 'inline'
  } else {
    addItem.disabled = true
    addItem.style.opacity = 0.5
    addItem.innerText = 'Adding...'
    closeModal.style.display = 'none'
  }
}

// Show modal
showModal.addEventListener('click', e => {
  modal.style.display = 'flex'
  itemUrl.focus()
})

// Hide modal
closeModal.addEventListener('click', e => {
  modal.style.display = 'none'
})

// Handle new item
addItem.addEventListener('click', e => {

  // Check a url exists
  if (itemUrl.value) {

    // Send new item url to main process
    ipcRenderer.send('new-item', itemUrl.value)

    // Disable buttons
    toggleModalButtons()
  }
})

// Listen for new item from main process
ipcRenderer.on('new-item-success', (e, newItem) => {
  console.log(newItem)

  // Enable buttons
  toggleModalButtons()

  // Hide modal and clear value
  modal.style.display = 'none'
  itemUrl.value = ''
})

// Listen for keyboard submit
itemUrl.addEventListener('keyup', e => {
  if( e.key === 'Enter' ) addItem.click()
})

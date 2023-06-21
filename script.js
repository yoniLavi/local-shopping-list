addEventListener('DOMContentLoaded', () => {
    syncFromStorage();
    document.querySelector('#new-item').addEventListener('submit', submitNewItem);
    document.querySelector('#clear').addEventListener('click', clearBought);
});

function applyToggleListener(elem) {
    elem.addEventListener('click', () => {
        elem.classList.toggle('bought');
        syncItemsToStorage();
    });
}

function createListItem(text, bought = false) {
    const newListItem = document.createElement('li');
    newListItem.innerText = text;
    if (bought) {
        newListItem.classList.add('bought');
    }
    applyToggleListener(newListItem);
    document.querySelector('#items').appendChild(newListItem);
}

function submitNewItem(event) {
    event.preventDefault();

    const inputElem = document.querySelector('#new-item input');
    if (inputElem.value === '') {
        return;
    }

    createListItem(inputElem.value, false);
    inputElem.value = '';

    syncItemsToStorage();
}

function clearBought() {
    document.querySelectorAll('#items li.bought').forEach(item => {
        item.remove();
    });
    syncItemsToStorage();
}

/// Data persistence functions
function syncFromStorage() {
    const items = JSON.parse(localStorage.getItem('items')) || [];
    items.forEach(item => {
        createListItem(item.text, item.bought);
    });
}

function syncItemsToStorage() {
    const items = Array.from(document.querySelectorAll('#items li')).map(item =>
        ({ text: item.innerText, bought: item.classList.contains('bought') })
    );
    localStorage.setItem('items', JSON.stringify(items));
}

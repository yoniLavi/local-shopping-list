addEventListener('DOMContentLoaded', () => {
    document.querySelector('#new-item').addEventListener('submit', submitNewItem);
    document.querySelectorAll('#items li').forEach(applyToggleListener);
    document.querySelector('#clear').addEventListener('click', clearBought);
});

function submitNewItem(event) {
    event.preventDefault();

    const inputElem = document.querySelector('#new-item input');
    if (inputElem.value === '') {
        return;
    }

    const newListItem = document.createElement('li');
    newListItem.innerText = inputElem.value;
    inputElem.value = '';

    applyToggleListener(newListItem);
    document.querySelector('#items').appendChild(newListItem);
}

function applyToggleListener(elem) {
    elem.addEventListener('click', () => {
        elem.classList.toggle('bought');
    });
}

function clearBought() {
    document.querySelectorAll('#items li.bought').forEach(item => {
        item.remove();
    });
}

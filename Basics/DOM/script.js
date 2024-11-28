window.addEventListener("load", initialize);

function initialize() {
    const addButton = document.getElementById("add");
    const removeButton = document.getElementById("remove");

    if (addButton) {
        addButton.addEventListener("click", add);
    }
    if (removeButton) {
        removeButton.addEventListener("click", remove);
    }
}

function add() {
    const ingredients = document.getElementById("ingredients");
    const choice = document.getElementById("choice");

    if (ingredients?.selectedIndex > -1) {
        const selectedOption = ingredients.options[ingredients.selectedIndex];
        const newOption = document.createElement("option");
        newOption.text = selectedOption.text;
        newOption.value = selectedOption.value;

        choice.add(newOption);
        ingredients.remove(ingredients.selectedIndex);
    }
}

function remove() {
    const choice = document.getElementById("choice");
    const ingredients = document.getElementById("ingredients");

    if (choice?.selectedIndex > -1) {
        const selectedOption = choice.options[choice.selectedIndex];
        const newOption = document.createElement("option");
        newOption.text = selectedOption.text;
        newOption.value = selectedOption.value;

        ingredients.add(newOption);
        choice.remove(choice.selectedIndex);
    }
}
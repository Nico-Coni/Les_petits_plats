let selectedIngredients = []
let selectedAppliances = []
let selectedUstensils = []

const dropdowns = {
    ingredient: document.getElementById('ingredient-list'),
    appliance: document.getElementById('appliance-list'),
    ustensil: document.getElementById('ustensil-list')
}

function updateDropdownOptions(filteredRecipes) {
    const ingredients = new Set()
    const appliances = new Set()
    const ustensils = new Set()

    filteredRecipes.forEach(recipe => {
        recipe.ingredients.forEach(ing => ingredients.add(ing.ingredient))
        appliances.add(recipe.appliance)
        recipe.ustensils.forEach(ust => ustensils.add(ust))
    })

    populateDropdown('ingredient', ingredients, selectedIngredients)
    populateDropdown('appliance', appliances, selectedAppliances)
    populateDropdown('ustensil', ustensils, selectedUstensils)
}

function populateDropdown(type, items, selected) {
    const list = dropdowns[type]
    list.innerHTML = ''

    items.forEach(item => {
        const li = document.createElement('li')
        li.classList.add('dropdown-item')
        const itemList = document.createElement('span')
        itemList.classList.add('item-list')
        itemList.textContent = item

        if (selected.includes(item)) {
            li.classList.add('selected')
            itemList.innerHTML += `<i class='bi bi-x-circle remove-option'></i>`
        }

        li.addEventListener('click', (e) => {
            if (e.target.classList.contains('remove-option')) {
                removeSelection(type, item)
            } else {
                addSelection(type, item)
            }
        })
        li.appendChild(itemList)
        list.appendChild(li)
    })
}


function removeSelection(type, item) {
    if (type === 'ingredient') {
        selectedIngredients = selectedIngredients.filter(i => i !== item)
    }
    if (type === 'appliance') {
        selectedAppliances = selectedAppliances.filter(i => i !== item)
    }
    if (type === 'ustensil') {
        selectedUstensils = selectedUstensils.filter(i => i !== item)
    }
}

function addSelection(type, item) {
    if (type === 'ingredient' && !selectedIngredients.includes(item)) {
        selectedIngredients.push(item)
    }
    if (type === 'appliance' && !selectedAppliances.includes(item)) {
        selectedAppliances.push(item)
    }
    if (type === 'ustensil' && !selectedUstensils.includes(item)) {
        selectedUstensils.push(item)
    }
}
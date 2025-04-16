const searchInput = document.querySelector('.input-search-bar')
const clearIconInput = document.querySelector('.clear-input-icon')

function applyFilters(onlyReturnFiltered = false) {
    const searchText = searchInput.value.trim().toLowerCase()
    if (searchText.length > 0 && searchText.length < 3) return recipes
    if (searchText.length > 0) {
        clearIconInput.classList.remove('d-none')
    } else {
        clearIconInput.classList.add('d-none')
    }

    const filteredRecipes = recipes.filter(recipe => {
        const matchSearch = searchText === '' ||
            recipe.name.toLowerCase().includes(searchText) ||
            recipe.description.toLowerCase().includes(searchText) ||
            recipe.ingredients.some(ing => ing.ingredient.toLowerCase().includes(searchText))

        const matchIngredients = selectedIngredients.every(ing =>
            recipe.ingredients.some(i => i.ingredient === ing)
        )

        const matchAppliance = selectedAppliances.length === 0 ||
            selectedAppliances.includes(recipe.appliance)

        const matchUstensils = selectedUstensils.every(ust =>
            recipe.ustensils.includes(ust)
        )

        return matchSearch && matchIngredients && matchAppliance && matchUstensils
    })

    if (onlyReturnFiltered) return filteredRecipes

    updateRecipeDisplay(filteredRecipes)
    updateRecipeAfterClearingMainInput()
    return filteredRecipes
}

// Rechercher dans Chaque dropdown 
function setupDropdownSearchHandlers() {
    document.querySelectorAll('.filter-input').forEach(input => {
        const wrapper = input.closest('.search-container')
        const clearIcon = wrapper.querySelector('.clear-icon')
        const list = input.closest('.dropdown-menu').querySelector('ul')
        input.addEventListener('input', function () {
            const filterValue = input.value.toLowerCase()
            //Ajout de la modification de class de l'icon supprimer ICI
            if (filterValue.length > 0) {
                clearIcon.classList.remove('d-none')
            } else {
                clearIcon.classList.add('d-none')
            }
            Array.from(list.children).forEach(li => {
                li.style.display = li.textContent.toLowerCase().includes(filterValue) ? '' : 'none'
            })
        })
        clearIcon.addEventListener('click', function () {
            input.value = ""
            clearIcon.classList.add('d-none')
            Array.from(list.children).forEach(li => {
                li.style.display = ""
            })
        })
    })
}

function updateRecipeAfterClearingMainInput() {
    clearIconInput.addEventListener('click', function () {
        searchInput.value = ''
        clearIconInput.classList.add('d-none')
        applyFilters()
    })
}
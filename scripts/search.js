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

    const filteredRecipes = []

    // on parcours toutes les recettes
    for (let i = 0; i < recipes.length; i++) {
        let recipe = recipes[i]

        // on vérifie si la recherche match
        let matchSearch = searchText === '' || recipe.name.toLowerCase().includes(searchText) || recipe.description.toLowerCase().includes(searchText)
        if (!matchSearch) {
            let j = 0
            while (j < recipe.ingredients.length && !matchSearch) {
                if (recipe.ingredients[j].ingredient.toLowerCase().includes(searchText)) {
                    matchSearch = true
                }
                j++
            }
        }

        // on vérifie si les ingrédients matches
        let matchIngredients = selectedIngredients.length === 0
        if (!matchIngredients) {
            let allIngredientsMatch = true
            for (let k = 0; k < selectedIngredients.length && allIngredientsMatch; k++) {
                let ing = selectedIngredients[k]
                let found = false
                let m = 0
                while (m < recipe.ingredients.length && !found) {
                    if (recipe.ingredients[m].ingredient === ing) {
                        found = true
                    }
                    m++
                }
                allIngredientsMatch = found
            }
            matchIngredients = allIngredientsMatch
        }

        //on vérifie si les appliances match
        let matchAppliance = selectedAppliances.length === 0
        if (!matchAppliance) {
            for (let n = 0; n < selectedAppliances.length; n++) {
                if (selectedAppliances[n] === recipe.appliance) {
                    matchAppliance = true
                    break
                }
            }
        }

        // on vérifie sur les ustensiles match
        let matchUstensils = selectedUstensils.length === 0
        if (!matchUstensils) {
            let allUstensilsMatch = true
            for (let u = 0; u < selectedUstensils.length && allUstensilsMatch; u++) {
                let ust = selectedUstensils[u]
                let found = false
                let q = 0
                while (q < recipe.ustensils.length && !found) {
                    if (recipe.ustensils[q] === ust) {
                        found = true
                    }
                    q++
                }
                allUstensilsMatch = found
            }
            matchUstensils = allUstensilsMatch
        }

        //si tout est vérifié, on ajoute la recette dans les recettes filtrées
        if (matchSearch && matchIngredients && matchAppliance && matchUstensils) {
            filteredRecipes.push(recipe)
        }
    }

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
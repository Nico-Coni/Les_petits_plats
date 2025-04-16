const recipeResultContainer = document.getElementById('recipe-result')
const searchBtn = document.getElementById('search-btn')

function init() {
    updateRecipeDisplay(recipes)
    updateDropdownOptions(recipes)
    setupDropdownSearchHandlers()
    searchInput.addEventListener('input', updateFilters)
    searchBtn.addEventListener('click', function (event) {
        event.preventDefault()
        updateFilters()
    })
}

function updateRecipeDisplay(filteredRecipes) {
    recipeResultContainer.innerHTML = ''
    filteredRecipes.forEach(recipe => {
        const cardRecipe = getCardRecipe(recipe)
        recipeResultContainer.appendChild(cardRecipe)
    });
    updateDropdownOptions(filteredRecipes)
}

init()
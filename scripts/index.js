const recipeResultContainer = document.getElementById('recipe-result')

function init() {
    updateRecipeDisplay(recipes)
    updateDropdownOptions(recipes)
}

function updateRecipeDisplay(recipes) {
    recipeResultContainer.innerHTML = ''
    recipes.forEach(recipe => {
        const cardRecipe = getCardRecipe(recipe)
        recipeResultContainer.appendChild(cardRecipe)
    });
}

init()
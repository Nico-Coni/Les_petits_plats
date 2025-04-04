const recipesSection = document.querySelector('.recipes-section')

function getCardRecipe(recipe) {
  const recipeContainer = document.createElement('div')
  recipeContainer.classList.add('card')
  recipeContainer.style.cssText = 'width: 20rem; margin-bottom: 100px;'

  const timeCapsule = document.createElement('span')
  timeCapsule.classList.add('time')
  timeCapsule.textContent = recipe.time + "min"

  const recipeImage = document.createElement('img')
  recipeImage.src = `assets/images/${recipe.image}`
  recipeImage.classList.add('image-recipe')

  const contentContainer = document.createElement('div')
  contentContainer.classList.add('card-body', 'recipe-structure')

  const recipeName = document.createElement('h3')
  recipeName.classList.add('card-title', 'recipe-name')
  recipeName.textContent = recipe.name

  const recipeTitle = document.createElement('h5')
  recipeTitle.classList.add('card-title', 'recipe-structure_title')
  recipeTitle.textContent = "Recette"

  const recipeDescription = document.createElement('p')
  recipeDescription.classList.add('card-text', 'recipe-description')
  const fullText = recipe.description
  const textToShow = fullText.substring(0, 170)
  recipeDescription.textContent = textToShow + '...'


  const ingredientsTitle = document.createElement('h5')
  ingredientsTitle.classList.add('card-title', 'recipe-structure_title')
  ingredientsTitle.textContent = "Ingrédients"

  const ingredientsContent = document.createElement('div')
  ingredientsContent.classList.add('row')

  recipe.ingredients.forEach(item => {
    const ingredientContent = document.createElement('div')
    ingredientContent.classList.add('col-6', 'ingredient-content')

    const ingredientName = document.createElement('p')
    ingredientName.classList.add('ingredient-name')
    ingredientName.textContent = item.ingredient

    const ingredientDose = document.createElement('p')
    ingredientDose.classList.add('ingredient-dose')
    ingredientDose.textContent = item.quantity ? `${item.quantity} ${item.unit || ''}` : '-'

    ingredientContent.append(ingredientName, ingredientDose)
    ingredientsContent.appendChild(ingredientContent)
  })

  contentContainer.append(recipeName, recipeTitle, recipeDescription, ingredientsTitle, ingredientsContent)
  recipeContainer.append(recipeImage, timeCapsule, contentContainer)
  return recipeContainer
}
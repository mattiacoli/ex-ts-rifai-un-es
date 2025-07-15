type Recipe = {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: string;
  cuisine: string;
  caloriesPerServing: number;
  tags: string[];
  userId: number;
  image: string;
  rating: number;
  reviewCount: number;
  mealType: string[];
}


function isRecipe(recipe: unknown): recipe is Recipe {
  return typeof recipe === 'object' && recipe != null &&
    typeof recipe.id === 'number' &&
    typeof recipe.name === 'string' &&
    Array.isArray(recipe.ingredients) && recipe.ingredients.every((item: any) => typeof item === 'string') &&
    Array.isArray(recipe.instructions) && recipe.instructions.every((item: any) => typeof item === 'string') &&
    typeof recipe.prepTimeMinutes === 'number' &&
    typeof recipe.cookTimeMinutes === 'number' &&
    typeof recipe.servings === 'number' &&
    typeof recipe.difficulty === 'string' &&
    typeof recipe.cuisine === 'string' &&
    typeof recipe.caloriesPerServing === 'number' &&
    Array.isArray(recipe.tags) && recipe.tags.every((item: any) => typeof item === 'string') &&
    typeof recipe.userId === 'number' &&
    typeof recipe.image === 'string' &&
    typeof recipe.rating === 'number' &&
    typeof recipe.reviewCount === 'number' &&
    Array.isArray(recipe.mealType) && recipe.mealType.every((item: any) => typeof item === 'string');
}


async function getChefBirthday(id: number): Promise<string> {

  try {
    const responseRecipe = await fetch(`https://dummyjson.com/recipes/${id}`)
    if (!responseRecipe.ok) {
      throw new Error('Errore nel recupero dei dati')
    }
    const recipe: unknown = await responseRecipe.json()
    if (!isRecipe(recipe)) {
      throw new Error('Formato dati non valido')
    }

    const chefId: number = recipe.userId

    const responseChef = await fetch(`https://dummyjson.com/users/${chefId}`)

    const chef: any = await responseChef.json()

    const birthDate: string = chef.birthDate

    return birthDate


  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    }
  }

}

getChefBirthday(1)
  .then(birthday => console.log("Data di nascita dello chef:", birthday))
  .catch(error => console.error("Errore:", error.message));
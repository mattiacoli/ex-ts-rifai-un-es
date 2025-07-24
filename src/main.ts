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

  if (recipe && typeof recipe === 'object' && recipe != null &&
    "id" in recipe && typeof recipe.id === 'number' &&
    "name" in recipe && typeof recipe.name === 'string' &&
    "ingredients" in recipe && Array.isArray(recipe.ingredients) && recipe.ingredients.every((item: any) => typeof item === 'string') &&
    "instructions" in recipe && Array.isArray(recipe.instructions) && recipe.instructions.every((item: any) => typeof item === 'string') &&
    "prepTimeMinutes" in recipe && typeof recipe.prepTimeMinutes === 'number' &&
    "cookTimeMinutes" in recipe && typeof recipe.cookTimeMinutes === 'number' &&
    "servings" in recipe && typeof recipe.servings === 'number' &&
    "difficulty" in recipe && typeof recipe.difficulty === 'string' &&
    "cuisine" in recipe && typeof recipe.cuisine === 'string' &&
    "caloriesPerServing" in recipe && typeof recipe.caloriesPerServing === 'number' &&
    "tags" in recipe && Array.isArray(recipe.tags) && recipe.tags.every((item: any) => typeof item === 'string') &&
    "userId" in recipe && typeof recipe.userId === 'number' &&
    "image" in recipe && typeof recipe.image === 'string' &&
    "rating" in recipe && typeof recipe.rating === 'number' &&
    "reviewCount" in recipe && typeof recipe.reviewCount === 'number' &&
    "mealType" in recipe && Array.isArray(recipe.mealType) && recipe.mealType.every((item: any) => typeof item === 'string')) {
    return true
  }

  return false
}


async function getChefBirthday(id: number): Promise<string | null> {

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

  return null

}

getChefBirthday(1)
  .then(birthday => console.log("Data di nascita dello chef:", birthday))
  .catch(error => console.error("Errore:", error.message));
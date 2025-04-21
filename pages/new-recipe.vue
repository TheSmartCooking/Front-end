<template>
    <div v-if="isLoggedIn">
        <h1>Create a New Recipe</h1>
        <form @submit.prevent="submitRecipe">
            <div>
                <label for="title">Title:</label>
                <input type="text" id="title" v-model="recipe.title" required />
            </div>
            <div>
                <label for="ingredients">Ingredients:</label>
                <textarea
                    id="ingredients"
                    v-model="recipe.ingredients"
                    required
                ></textarea>
            </div>
            <div>
                <label for="instructions">Instructions:</label>
                <textarea
                    id="instructions"
                    v-model="recipe.instructions"
                    required
                ></textarea>
            </div>
            <div>
                <label for="preparationTime">Preparation Time:</label>
                <input
                    type="text"
                    id="preparationTime"
                    v-model="recipe.preparationTime"
                />
            </div>
            <div>
                <label for="cookingTime">Cooking Time:</label>
                <input
                    type="text"
                    id="cookingTime"
                    v-model="recipe.cookingTime"
                />
            </div>
            <div>
                <label for="servings">Servings:</label>
                <input
                    type="number"
                    id="servings"
                    v-model="recipe.servings"
                    min="1"
                    max="10"
                />
            </div>
            <div>
                <label for="difficulty">Difficulty:</label>
                <select id="difficulty" v-model="recipe.difficulty">
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
            </div>
            <div>
                <label for="source">Source:</label>
                <input type="text" id="source" v-model="recipe.source" />
            </div>
            <div>
                <label for="language">Language:</label>
                <select id="language" v-model="recipe.language">
                    <!-- TODO: Request languages list to API -->
                    <option value="en">English</option>
                    <option value="fr">Français</option>
                </select>
            </div>
            <div>
                <label for="nutritionalInfo">Nutritional Info:</label>
                <textarea
                    id="nutritionalInfo"
                    v-model="recipe.nutritionalInfo"
                ></textarea>
            </div>

            <button type="submit">Create Recipe</button>
        </form>
    </div>
    <div v-else>
        <p>Please log in to create a new recipe.</p>
        <nuxt-link to="/login">Login</nuxt-link>
    </div>
</template>

<script setup>
import { useAuth } from '@/composables/useAuth'

const {
    public: { apiBaseUrl },
} = useRuntimeConfig()
const { isLoggedIn } = useAuth()

const recipe = ref({
    title: '',
    ingredients: '',
    instructions: '',
    preparationTime: '',
    cookingTime: '',
    servings: 1,
    difficulty: 'easy',
    source: '',
    language: 'en',
    nutritionalInfo: '',
})

const submitRecipe = async () => {
    if (!isLoggedIn.value) {
        console.error('User is not logged in')
        return
    }

    const accessToken = useCookie('access_token')?.value

    if (!accessToken) {
        console.error('Missing access token')
        return
    }

    const payload = {
        picture_id: 1,

        cook_time:
            parseInt(recipe.value.preparationTime || '0') +
            parseInt(recipe.value.cookingTime || '0'),
        recipe_source: recipe.value.source,
        language_iso_code: recipe.value.language,
        title: recipe.value.title,
        details: recipe.value.ingredients,
        preparation: recipe.value.instructions,
        nutritional_information: recipe.value.nutritionalInfo,
    }

    try {
        const response = await fetch(`${apiBaseUrl}/recipe`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(payload),
        })

        console.log('Response status:', response.status)
        const text = await response.text()
        console.log('Raw response text:', text)

        if (!response.ok) {
            throw new Error(`Failed to create recipe: ${response.statusText}`)
        }

        const data = await response.json()
        console.log('Recipe created:', data)
        // TODO: router.push(`/recipe/${data.recipe_id}`)
    } catch (error) {
        console.error('Error creating recipe:', error)
    }
}
</script>

<style scoped>
div {
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-medium);
    justify-content: center;
}
</style>

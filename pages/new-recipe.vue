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
                <textarea id="ingredients" v-model="recipe.ingredients" required></textarea>
            </div>
            <div>
                <label for="instructions">Instructions:</label>
                <textarea id="instructions" v-model="recipe.instructions" required></textarea>
            </div>
            <div>
                <label for="preparationTime">Preparation Time:</label>
                <input type="text" id="preparationTime" v-model="recipe.preparationTime"/>
            </div>
            <div>
                <label for="cookingTime">Cooking Time:</label>
                <input type="text" id="cookingTime" v-model="recipe.cookingTime"/>
            </div>
            <div>
                <label for="servings">Servings:</label>
                <input type="number" id="servings" v-model="recipe.servings" min="1" max="10"/>
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
                <input type="text" id="source" v-model="recipe.source"/>
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

const {apiBaseUrl } = useRuntimeConfig()
const { isLoggedIn } = useAuth()

const recipe = ref({
    title: '',
    ingredients: '',
    instructions: '',
    preparationTime: '',
    cookingTime: '',
    servings: 1,
    difficulty: 'easy',
    source: ''
})

const submitRecipe = async () => {
    if (!isLoggedIn.value) {
        console.error('User is not logged in')
        return
    }
    console.log('Submitting recipe:', recipe.value)
    try {
        const response = await fetch(`${apiBaseUrl}/recipe`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(recipe.value)
        })

        if (!response.ok) {
            throw new Error('Failed to create recipe')
        }

        const data = await response.json()
        console.log('Recipe created:', data)
        // Redirect or show success message
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

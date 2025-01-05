<template>
    <main>
        <div id="recipe-list">
            <div v-if="error">Error: {{ error.message }}</div>
            <div v-else-if="!recipes.data">Loading...</div>
            <div v-else>
                <RecipeCard
                    v-for="recipe in recipes.data"
                    :key="recipe.recipe_id"
                    :recipe="recipe"
                />
            </div>
        </div>
    </main>
</template>

<script setup>
// Import RecipeCard component
import RecipeCard from '@/components/RecipeCard.vue';

// Fetch recipes from your API
const { data: recipes, pending, error } = useFetch('http://localhost:5000/recipe/all', {
    params: { language_code: 'fr' },
});
</script>

<style scoped>
main {
    overflow-y: auto;
}

#recipe-list> div {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    justify-content: center;
    justify-self: center;
    width: 80%;
}
</style>

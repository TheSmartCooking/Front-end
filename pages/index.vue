<template>
    <main>
        <div id="recipe-list">
            <div v-if="error">Unable to load recipes, please try again later or contact support</div>
            <div v-else-if="!recipes">Loading recipes...</div>
            <div v-else-if="!recipes.data">No recipes available</div>
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

// Fetch recipes from the API
const { data: recipes, pending, error } = useFetch('http://localhost:5000/recipe/all', {
    params: { language_code: 'fr' },
});
</script>

<style scoped>
main {
    overflow-y: auto;
    scrollbar-color: var(--color-quinary) transparent;
    scrollbar-width: thin;
}

#recipe-list>div {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-medium);
    justify-content: center;
    justify-self: center;
    width: 100%;
    text-wrap: nowrap;
}
</style>

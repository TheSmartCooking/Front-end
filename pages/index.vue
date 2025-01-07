<template>
    <p v-if="error">Unable to load recipes, please try again later or contact support</p>
    <p v-else-if="!recipes">Loading recipes...</p>
    <p v-else-if="!recipes.data">No recipes available</p>
    <main v-else>
        <RecipeCard
            v-for="recipe in recipes.data"
            :key="recipe.recipe_id"
            :recipe="recipe"
        />
    </main>
</template>

<script setup>
// Import RecipeCard component
import RecipeCard from '@/components/RecipeCard.vue';

const config = useRuntimeConfig();

// Fetch recipes from the API
const { data: recipes, _, error } = useFetch(`${config.public.apiBaseUrl}/recipe/all`, {
    params: { language_code: 'fr' },
});
</script>

<style scoped>
main {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-medium);
    justify-content: center;
    justify-self: center;
    overflow: hidden auto;
    scrollbar-color: var(--color-quinary) transparent;
    scrollbar-width: thin;
    text-wrap: nowrap;
    width: 100%;
}
</style>

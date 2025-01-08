<template>
    <main>
        <SearchBar @search="onSearch" />
        <p v-if="error">Unable to load recipes, please try again later or contact support</p>
        <p v-else-if="loading">Loading recipes...</p>
        <p v-else-if="!recipes || recipes.length === 0">No recipes available</p>
        <section v-else id="recipes">
            <RecipeCard
                v-for="recipe in recipes"
                :key="recipe.recipe_id"
                :recipe="recipe"
            />
        </section>
    </main>
</template>

<script setup>
import { ref } from 'vue';
import { fetchJSON } from '@/utils/fetch.js';
import { useHead } from '@vueuse/head';
import RecipeCard from '@/components/RecipeCard.vue';
import SearchBar from '@/components/SearchBar.vue';

const { public: { apiBaseUrl, appTitle  } } = useRuntimeConfig();

// Reactive state
const recipes = ref(null);
const error = ref(false);
const loading = ref(true);

useHead(() => ({ title: appTitle }));

// Fetch recipes from the API
async function fetchRecipes(query = '') {
    loading.value = true;
    error.value = false;

    try {
        const data = await fetchJSON(
            `${apiBaseUrl}/recipe/all${query ? `?search=${query}` : ''}`
        );
        recipes.value = data.data || [];
    } catch (e) {
        error.value = true;
    } finally {
        loading.value = false;
    }
}

function onSearch(searchTerm) {
    console.log('Searching for:', searchTerm);
    // fetchRecipes(searchTerm);
}

// Fetch recipes on mounted
fetchRecipes();
</script>

<style scoped>
main {
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-medium);
    overflow: hidden auto;
    width: 100%;
}

#recipes {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-medium);
    justify-content: center;
    width: 100%;
}
</style>

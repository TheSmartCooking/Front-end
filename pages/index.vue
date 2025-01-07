<template>
    <main>
        <input
            type="text"
            v-model="search"
            @input="onSearchInput"
            placeholder="Search for recipes"
        />
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
import { ref, onMounted, watch } from 'vue';
import { fetchJSON } from '@/utils/fetch.js';
import RecipeCard from '@/components/RecipeCard.vue';

const config = useRuntimeConfig();

// Reactive state
const recipes = ref(null);
const error = ref(false);
const loading = ref(true);
const search = ref('');
let lastSearchTerm = ''; // To track the previous search term
let debounceTimeout = null; // Timeout ID for debouncing

// Fetch recipes from the API
async function fetchRecipes(query = '') {
    loading.value = true;
    error.value = false;

    try {
        const data = await fetchJSON(
            `${config.public.apiBaseUrl}/recipe/all${query ? `?search=${query}` : ''}`
        );
        recipes.value = data.data || []; // Assuming `data.data` contains the recipes array
    } catch (e) {
        error.value = true;
    } finally {
        loading.value = false;
    }
}

function onSearchInput() {
    clearTimeout(debounceTimeout);

    debounceTimeout = setTimeout(() => {
        if (search.value !== lastSearchTerm) {
            lastSearchTerm = search.value; // Update the last search term
            console.log('Searching for:', search.value.trim());
        }
    }, 750);
}

// Fetch recipes on component mount
onMounted(() => { fetchRecipes(); });
</script>

<style scoped>
main {
    overflow: hidden auto;
    scrollbar-color: var(--color-quinary) transparent;
    scrollbar-width: thin;
}

#recipes {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-medium);
    justify-content: center;
    justify-self: center;
    text-wrap: nowrap;
    width: 100%;
}
</style>

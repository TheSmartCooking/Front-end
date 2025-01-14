<template>
    <div id="recipe-details">
        <Recipe
            :key="recipe.recipe_id"
            :recipe="recipe"
        />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useHead } from '@vueuse/head';
import { fetchJSON } from '@/utils/fetch.js';

const { public: { apiBaseUrl, appTitle  } } = useRuntimeConfig();

const { id } = useRoute().params;
const recipe = ref({});

// Reactive head for title
const pageTitle = ref('Loading Recipe...');
useHead(() => ({ title: `${appTitle} - ${pageTitle.value}` || 'Recipe Details' }));

// Fetch the recipe data
const fetchRecipe = async () => {
    try {
        const response = await fetchJSON(`${apiBaseUrl}/recipe/${id}`);
        if (response.success) {
            recipe.value = response.data;
            pageTitle.value = recipe.value.title || 'Recipe Details';
        } else {
            console.error('Failed to fetch recipe data.');
            pageTitle.value = 'Recipe Not Found';
        }
    } catch (e) {
        console.error('Error fetching recipe:', e);
        pageTitle.value = 'Error Loading Recipe';
    }
};

// Fetch recipe on mounted
fetchRecipe();
</script>

<style scoped>
#recipe-details {
    width: 80%;
}

@media screen and (width<=850px) {
    #recipe-details {
        width: 100%;
    }
}
</style>

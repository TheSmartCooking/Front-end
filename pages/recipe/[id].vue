<template>
    <main>
        <p v-if="recipe.title"><strong>Title:</strong> {{ recipe.title }}</p>
        <p v-if="recipe.author_name"><strong>Author:</strong> {{ recipe.author_name }}</p>
        <p v-if="recipe.cook_time"><strong>Cook Time:</strong> {{ recipe.cook_time }} minutes</p>
        <p v-if="recipe.details"><strong>Details:</strong> {{ recipe.details }}</p>
        <p v-if="recipe.difficulty_level"><strong>Difficulty Level:</strong> {{ recipe.difficulty_level }}</p>
        <p v-if="recipe.number_of_reviews"><strong>Number of Reviews:</strong> {{ recipe.number_of_reviews }}</p>
        <p v-if="recipe.nutritional_information"><strong>Nutritional Information:</strong> {{ recipe.nutritional_information }}</p>
        <p v-if="recipe.picture_id"><strong>Picture ID:</strong> {{ recipe.picture_id }}</p>
        <p v-if="recipe.preparation"><strong>Preparation:</strong> {{ recipe.preparation }}</p>
        <p v-if="recipe.recipe_status"><strong>Status:</strong> {{ recipe.recipe_status }}</p>
        <p v-if="recipe.video_url"><strong>Video URL:</strong> <a :href="recipe.video_url" target="_blank">{{ recipe.video_url }}</a></p>
    </main>
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

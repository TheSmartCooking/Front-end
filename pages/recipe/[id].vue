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
import { onMounted } from 'vue';
import { fetchJSON } from '@/utils/fetch.js';
import { useRoute } from 'vue-router';

const config = useRuntimeConfig();

const { id } = useRoute().params;
const recipe = ref({});

onMounted(async () => {
    try {
        const response = await fetchJSON(
            `${config.public.apiBaseUrl}/recipe/${id}`
        );
        if (response.success) {
            recipe.value = response.data;
        } else {
            console.error('Failed to fetch recipe data.');
        }
    } catch (e) {
        console.error('Error fetching recipe:', e);
    }
});
</script>

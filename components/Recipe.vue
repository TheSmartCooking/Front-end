<template>
    <div id="recipe">
        <section id="modal-top">
            <h2>{{ recipe.title }}</h2>
            <p id="modal-details">
                <p v-if="recipe.author_name"><strong>Author:</strong> {{ recipe.author_name }}</p>
                <p v-if="recipe.cook_time"><strong>Cook Time:</strong> {{ recipe.cook_time }} minutes</p>
                <p v-if="recipe.difficulty_level"><strong>Difficulty Level:</strong> {{ recipe.difficulty_level }}</p>
                <p v-if="recipe.number_of_reviews"><strong>Number of Reviews:</strong> {{ recipe.number_of_reviews }}</p>
                <p v-if="recipe.nutritional_information"><strong>Nutritional Information:</strong> {{ recipe.nutritional_information }}</p>
                <p v-if="recipe.picture_id"><strong>Picture ID:</strong> {{ recipe.picture_id }}</p>
                <p v-if="recipe.preparation"><strong>Preparation:</strong> {{ recipe.preparation }}</p>
                <p v-if="recipe.recipe_status"><strong>Status:</strong> {{ recipe.recipe_status }}</p>
                <p v-if="recipe.video_url"><strong>Video URL:</strong> <a :href="recipe.video_url" target="_blank">{{ recipe.video_url }}</a></p>
            </p>
        </section>
        <section id="modal-left">
            <img id="modal-author" src="https://picsum.photos/300/300" alt="Recipe image">
            <span id="modal-image-author"></span>
            <div id="modal-recipe"></div>
        </section>
        <section id="modal-right">
            <p v-if="recipe.details"><strong>Details:</strong> {{ recipe.details }}</p>
        </section>
    </div>
</template>

<script setup>
// Props
const { recipe } = defineProps({
    recipe: {
        type: Object,
        required: true,
    },
});
</script>

<style scoped>
#recipe {
    display: grid;
    gap: 1rem;
    grid-template:
        "modal-top modal-top" auto
        "modal-left modal-right" auto / 1fr 1fr;
    height: 100%;
    width: 100%;
    overflow-y: auto;
}

#modal-top {
    grid-area: modal-top;
    border-bottom: 1px solid #888;
}

#modal-left {
    grid-area: modal-left;
    border-right: 1px solid #888;
    width: 100%;
}

#modal-right {
    grid-area: modal-right;
}
</style>

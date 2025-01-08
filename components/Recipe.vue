<template>
    <div id="recipe">
        <section id="section-top">
            <h1>{{ recipe.title }}</h1>
            <p>
                <span v-if="recipe.author_name">@{{ recipe.author_name }}</span>
                <span v-if="recipe.publication_date">{{ recipe.publication_date }}</span>
                <span v-if="recipe.modification_date"> (Last Modified: {{ recipe.modification_date }})</span>
            </p>
        </section>
        <section id="section-left">
            <div>
                <img src="https://picsum.photos/300/300" alt="Recipe image">
                <span v-if="null">{{ recipe_picture.author_name }}</span>
                <span v-else>Unknown author.</span>
                <p v-if="recipe.picture_id"><strong>Picture ID:</strong> {{ recipe.picture_id }}</p>
            </div>
            <div>
                <p v-if="recipe.cook_time"><strong>Cook Time:</strong> {{ recipe.cook_time }} minutes</p>
                <p v-if="recipe.difficulty_level"><strong>Difficulty Level:</strong> {{ recipe.difficulty_level }}</p>
                <p v-if="recipe.number_of_reviews"><strong>Number of Reviews:</strong> {{ recipe.number_of_reviews }}</p>
                <p v-if="recipe.nutritional_information"><strong>Nutritional Information:</strong> {{ recipe.nutritional_information }}</p>
                <p v-if="recipe.details"><strong>Details:</strong> {{ recipe.details }}</p>
                <p v-if="recipe.recipe_status"><strong>Status:</strong> {{ recipe.recipe_status }}</p>
                <p v-if="recipe.video_url"><strong>Video URL:</strong> <a :href="recipe.video_url" target="_blank">{{ recipe.video_url }}</a></p>
            </div>
        </section>
        <section id="section-right">
            <p v-if="recipe.preparation"><strong>Preparation:</strong> {{ recipe.preparation }}</p>
            <p v-else>No preparation details available.</p>
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
    align-items: start;
    display: grid;
    gap: 1rem;
    grid-template:
        "section-top section-top" auto
        "section-left section-right" 1fr / 1fr 1fr;
    height: 100%;
    width: 100%;
    overflow-y: auto;
}

#section-top {
    grid-area: section-top;
    border-bottom: 1px solid #888;
    height: fit-content;
}

#section-top>p {
    display: flex;
    flex-wrap: wrap;
    gap: 0 var(--spacing-small);
}

#section-left {
    border-right: 1px solid #888;
    grid-area: section-left;
    width: 100%;
}


#section-left>div:first-child {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;
}

#section-left>div:first-child>img {
    object-fit: cover;
    width: var(--polaroid-photo-size);
    height: var(--polaroid-photo-size);
}

#section-left>div:nth-child(2) {
    display: flex;
    flex-direction: column;
}

#section-right {
    grid-area: section-right;
    max-height: calc(var(--polaroid-photo-size) * 2);
    overflow-y: auto;
}

@media screen and (width>850px) {
    #section-top>p>:nth-child(2):before {
        content: "| ";
    }
}

@media screen and (width<=850px) {
    #recipe {
        grid-template:
            "section-top" auto
            "section-left" auto
            "section-right" 1fr / 1fr;
    }

    #section-top>p {
        flex-direction: column;
    }

    #section-left {
        border-right: none;
        border-bottom: 1px solid #888;
    }
}
</style>

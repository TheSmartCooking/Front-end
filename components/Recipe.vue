<template>
    <div id="recipe">
        <section id="header-section">
            <h1>{{ recipe.title }}</h1>
            <p>
                <span v-if="recipe.author_name">@{{ recipe.author_name }}</span>
                <span v-if="recipe.publication_date">{{
                    recipe.publication_date
                }}</span>
                <span v-if="recipe.modification_date">
                    (Last Modified: {{ recipe.modification_date }})
                </span>
            </p>
        </section>
        <section id="detail-section">
            <div>
                <img
                    :src="imagePath || defaultImage"
                    @error="handleImageError"
                    alt="Recipe image"
                />
                <div v-if="imagePath && imagePath !== defaultImage">
                    <span v-if="recipe_picture?.author_name">{{
                        recipe_picture.author_name
                    }}</span>
                    <span v-else>Unknown author.</span>
                </div>
            </div>
            <div>
                <p v-if="recipe.cook_time">
                    <strong>Cook Time:</strong> {{ recipe.cook_time }} minutes
                </p>
                <p v-if="recipe.difficulty_level">
                    <strong>Difficulty Level:</strong>
                    {{ recipe.difficulty_level }}
                </p>
                <p v-if="recipe.number_of_reviews">
                    <strong>Number of Reviews:</strong>
                    {{ recipe.number_of_reviews }}
                </p>
                <p v-if="recipe.nutritional_information">
                    <strong>Nutritional Information:</strong>
                    {{ recipe.nutritional_information }}
                </p>
                <p v-if="recipe.details">
                    <strong>Details:</strong> {{ recipe.details }}
                </p>
                <p v-if="recipe.recipe_status">
                    <strong>Status:</strong> {{ recipe.recipe_status }}
                </p>
                <p v-if="recipe.video_url">
                    <strong>Video URL:</strong>
                    <a :href="recipe.video_url" target="_blank">{{
                        recipe.video_url
                    }}</a>
                </p>
            </div>
        </section>
        <section id="preparation-section">
            <p v-if="recipe.preparation">
                <strong>Preparation:</strong> {{ recipe.preparation }}
            </p>
            <p v-else>No preparation details available.</p>
        </section>
        <section id="review-section"></section>
        <section id="comment-section">
            <Comment
                v-for="comment in commentSection"
                :key="comment.comment_id"
                :comment="comment"
            />
        </section>
        <section id="similar-recipes-section"></section>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import Comment from './Comment.vue'

const {
    public: { apiBaseUrl },
} = useRuntimeConfig()

const { id } = useRoute().params
const commentSection = ref(null)

// Props
const { recipe } = defineProps({
    recipe: {
        type: Object,
        required: true,
    },
})

// Reactive state for the image path
const imagePath = ref(null)
const recipe_picture = ref(null) // Placeholder for picture metadata if needed
const defaultImage = '/default-recipe.png'

// Function to fetch picture data
function fetchPictureData() {
    if (recipe.picture_id) {
        fetchJSON(`${apiBaseUrl}/picture/${recipe.picture_id}`)
            .then((data) => {
                imagePath.value = `${apiBaseUrl}/picture/${data.data.picture_path}`
                recipe_picture.value = data.data
            })
            .catch((error) => {
                console.error('Error fetching picture data:', error)
            })
    } else {
        imagePath.value = null
        recipe_picture.value = null
    }
}

// Function to handle image loading errors
const handleImageError = (event) => {
    event.target.src = defaultImage
}

// Function to fetch comments
;(() => {
    fetchJSON(`${apiBaseUrl}/comment/recipe/${id}`)
        .then((data) => {
            commentSection.value = data.data || []
        })
        .catch((error) => {
            console.error('Error fetching comments:', error)
        })
})()

// Watch for changes to the recipe prop
watch(() => recipe.picture_id, fetchPictureData, { immediate: true })
</script>

<style scoped>
#recipe {
    align-items: start;
    display: grid;
    gap: 1rem;
    grid-template:
        'header-section header-section' auto
        'detail-section preparation-section' 1fr
        'review-section review-section' auto
        'comment-section comment-section' auto
        'similar-recipes-section similar-recipes-section' auto
        / 1fr 1fr;
    height: 100%;
    width: 100%;
    overflow-y: auto;
}

#header-section {
    grid-area: header-section;
    border-bottom: 1px solid #888;
    height: fit-content;
}

#header-section > p {
    display: flex;
    flex-wrap: wrap;
    gap: 0 var(--spacing-small);
}

#detail-section {
    border-right: 1px solid #888;
    grid-area: detail-section;
    width: 100%;
}

#detail-section > div:first-child {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;
}

#detail-section > div:first-child > img {
    object-fit: cover;
    width: var(--polaroid-photo-size);
    height: var(--polaroid-photo-size);
}

#detail-section > div:nth-child(2) {
    display: flex;
    flex-direction: column;
}

#preparation-section {
    grid-area: preparation-section;
    max-height: calc(var(--polaroid-photo-size) * 2);
    overflow-y: auto;
}

@media screen and (width>850px) {
    #header-section > p > :nth-child(2):before {
        content: '| ';
    }
}

@media screen and (width<=850px) {
    #recipe {
        display: flex;
        flex-direction: column;
    }

    #recipe section:not(:last-child) {
        width: 100%;
        border-bottom: 1px solid #888;
    }

    #header-section > p {
        flex-direction: column;
    }

    #detail-section {
        border-right: none;
    }
}
</style>

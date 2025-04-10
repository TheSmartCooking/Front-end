<template>
    <div class="card" @click="handleClick">
        <div
            class="card-body"
            :style="{
                backgroundImage: `url(${recipe.image || placeholderImage})`,
            }"
        >
            <div class="card-top">
                <div class="card-text cook-time">
                    {{ `⏱ ${recipe.cook_time}` || 'Unknown' }}
                </div>
                <div class="card-text recipe-status">
                    {{ recipe.status || 'Unknown' }}
                </div>
            </div>
            <div class="card-bottom">
                <div class="card-text recipe-author">
                    {{ `@${recipe.author_name}` || 'Unknown' }}
                </div>
                <div class="card-text recipe-likes">
                    {{ recipe.likes || 0 }} likes
                </div>
            </div>
        </div>
        <div class="recipe-title">
            <h1>{{ recipe.title || 'Unknown' }}</h1>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

// Props
const { recipe } = defineProps({
    recipe: {
        type: Object,
        required: true,
    },
})

// Constants
const placeholderImage = 'https://picsum.photos/300/300'

// Router for navigation
const router = useRouter()

// Methods
const handleClick = () => {
    router.push(`/recipe/${recipe.recipe_id}`)
}
</script>

<style scoped>
.card {
    align-items: center;
    background-color: var(--polaroid-color);
    border: 1px solid #888;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    height: var(--polaroid-height);
    user-select: none;
    width: var(--polaroid-width);
}

.card .recipe-title {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.recipe-title > h1 {
    color: light-dark(var(--color-secondary), var(--color-primary));
    font-size: var(--font-size-title);
}

.card-body {
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: var(--polaroid-margin-top);
    min-height: var(--polaroid-photo-size);
    width: var(--polaroid-photo-size);
}

.card-body * {
    filter: drop-shadow(0 0 var(--spacing-small) var(--polaroid-color));
    font-size: var(--font-size-body);
}

.card-top,
.card-bottom {
    display: flex;
    justify-content: space-between;
}

/* The status will not be displayed for now */
.recipe-status {
    display: none;
}

/* Pseudo-elements */

.card:hover {
    filter: brightness(1.1);
    transform: rotate(2deg);
}

.cook-time::after {
    content: "'";
}
</style>

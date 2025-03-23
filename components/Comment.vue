<template>
    <article class="comment">
        <header>
            <h3>{{ comment.author_id }}</h3>
            <time>{{ comment.comment_date }}</time>
        </header>
        <p>{{ comment.content }}</p>
        <p>{{ comment.like_count }}</p>
    </article>
</template>

<script setup>
const { comment } = defineProps({
    comment: {
        type: Object,
        required: true,
    },
})
</script>

<style scoped>
header {
    background-color: red;
}
</style>

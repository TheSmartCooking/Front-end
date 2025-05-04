<template>
    <VueMarkdown :source="privacyPolicy" class="markdown" />
</template>

<script setup>
import { onMounted, ref } from 'vue'
import VueMarkdown from 'vue-markdown-render'
import '~/assets/styles/markdown.css'
import privacyPolicy from '~/content/privacy-policy.md?raw'
</script>

<style scoped>
.markdown {
    width: 75%;
}

.markdown > p > em {
    text-align: center;
    color: red;
}

@media screen and (width<=850px) {
    .markdown {
        width: 95%;
    }
}
</style>

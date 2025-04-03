<template>
    <VueMarkdown
        ref="markdown"
        :source="privacyPolicy"
        class="prose max-w-none"
    />
</template>

<script setup>
import { onMounted, ref } from 'vue'
import VueMarkdown from 'vue-markdown-render'
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark-dimmed.css'
import privacyPolicy from '~/content/privacy-policy.md?raw'

const markdown = ref(null)

onMounted(() => {
    if (markdown.value) {
        document.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightElement(block)
        })
    }
})
</script>

<style scoped>
pre code {
    border: 1px solid #ccc;
    display: block;
    overflow-x: auto;
    padding: 1em;
    border-radius: 6px;
}
</style>

<template>
    <div>
        <VueMarkdown :source="privacyPolicy" />
    </div>
</template>

<script setup>
import VueMarkdown from 'vue-markdown-render'
import privacyPolicy from '~/content/privacy-policy.md?raw'
</script>

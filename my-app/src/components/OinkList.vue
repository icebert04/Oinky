<script setup>
import { computed, toRefs } from 'vue'
import OinkCard from '@/components/OinkCard'

const props = defineProps({
    oinks: Array,
    loading: Boolean,
})

const { oinks, loading } = toRefs(props)
const orderedOinks = computed(() => {
    return oinks.value.slice().sort((a, b) => b.timestamp - a.timestamp)
})
</script>

<template>
    <div v-if="loading" class="p-8 text-gray-500 text-center">
        Loading...
    </div>
    <div v-else class="divide-y">
        <oink-card v-for="oink in orderedOinks" :key="oink.key" :oink="oink"></oink-card>
    </div>
</template>

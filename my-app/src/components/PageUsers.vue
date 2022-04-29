<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { fetchOinks, authorFilter } from '@/api'
import { useFromRoute } from '@/composables'
import OinkList from '@/components/OinkList'
import OinkSearch from '@/components/OinkSearch'

// Data.
const router = useRouter()
const oinks = ref([])
const loading = ref(true)
const author = ref('')
const viewedAuthor = ref('')

// Actions.
const search = () => {
    router.push(`/users/${author.value}`)
}

const fetchAuthorOinks = async () => {
    if (author.value === viewedAuthor.value) return
    try {
        loading.value = true
        const fetchedOinks = await fetchOinks([authorFilter(author.value)])
        oinks.value = fetchedOinks
        viewedAuthor.value = author.value
    } finally {
        loading.value = false
    }
}

// Router hooks.
useFromRoute((route) => {
    author.value = route.params.author
    if (author.value) {
        fetchAuthorOinks()
    } else {
        oinks.value = []
        viewedAuthor.value = ''
    }
})
</script>

<template>
    <oink-search placeholder="public key" :disabled="! author" v-model="author" @search="search">
        <template #icon>
            <svg src="../assets/logo.png" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
        </template>
    </oink-search>
    <div v-if="viewedAuthor">
        <oink-list :oinks="oinks" :loading="loading"></oink-list>
        <div v-if="oinks.length === 0" class="p-8 text-gray-500 text-center">
            User not found...
        </div>
    </div>
</template>

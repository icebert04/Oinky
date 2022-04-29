<script setup>
import { ref, watchEffect } from 'vue'
import { fetchOinks } from '@/api'
import OinkForm from '@/components/OinkForm'
import OinkList from '@/components/OinkList'
import { useWorkspace } from '@/composables'

const oinks = ref([])
const loading = ref(true)
const { wallet } = useWorkspace()

watchEffect(() => {
    if (! wallet.value) return
    fetchOinks()
        .then(fetchedOinks => oinks.value = fetchedOinks)
        .finally(() => loading.value = false)
})

const addOink = oink => oinks.value.push(oink)
</script>

<template>
    <div v-if="wallet" class="border-b px-8 py-4 bg-gray-50">
        y2ipkth52szcYUdzwqeeUVJvt2jSkDzPsJ1zm1cMfjp
    </div>
    <oink-form @added="addOink"></oink-form>
    <oink-list :oinks="oinks" :loading="loading"></oink-list>
</template>

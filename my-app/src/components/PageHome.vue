<script setup>
import { ref } from 'vue'
import { fetchOinks } from '@/api'
import OinkForm from '@/components/OinkForm'
import OinkList from '@/components/OinkList'

const oinks = ref([])
const loading = ref(true)
fetchOinks()
    .then(fetchedOinks => oinks.value = fetchedOinks)
    .finally(() => loading.value = false)

const addOink = oink => oinks.value.push(oink)
</script>

<template>
    <oink-form @added="addOink"></oink-form>
    <oink-list :oinks="oinks" :loading="loading"></oink-list>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { fetchOinks, argumentFilter } from '@/api'
import { useSlug, useFromRoute } from '@/composables'
import OinkForm from '@/components/OinkForm'
import OinkList from '@/components/OinkList'
import OinkSearch from '@/components/OinkSearch'

// Data.
const router = useRouter()
const oinks = ref([])
const loading = ref(true)
const argument = ref('')
const slugArgument = useSlug(argument)
const viewedArgument = ref('')

// Actions.
const search = () => {
    router.push(`/arguments/${slugArgument.value}`)
}

const fetchArgumentOinks = async () => {
    if (slugArgument.value === viewedArgument.value) return
    try {
        loading.value = true
        const fetchedOinks = await fetchOinks([argumentFilter(slugArgument.value)])
        oinks.value = fetchedOinks
        viewedArgument.value = slugArgument.value
    } finally {
        loading.value = false
    }
}

const addOink = oink => oinks.value.push(oink)

// Router hooks.
useFromRoute((route) => {
    argument.value = route.params.argument
    if (argument.value) {
        fetchArgumentOinks()
    } else {
        oinks.value = []
        viewedArgument.value = ''
    }
})
</script>

<template>
    <oink-search placeholder="argument" :disabled="! slugArgument" :modelValue="slugArgument" @update:modelValue="value => argument = value" @search="search">
        <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M9.243 3.03a1 1 0 01.727 1.213L9.53 6h2.94l.56-2.243a1 1 0 111.94.486L14.53 6H17a1 1 0 110 2h-2.97l-1 4H15a1 1 0 110 2h-2.47l-.56 2.242a1 1 0 11-1.94-.485L10.47 14H7.53l-.56 2.242a1 1 0 11-1.94-.485L5.47 14H3a1 1 0 110-2h2.97l1-4H5a1 1 0 110-2h2.47l.56-2.243a1 1 0 011.213-.727zM9.03 8l-1 4h2.938l1-4H9.031z" clip-rule="evenodd" />
            </svg>  
        </template>
    </oink-search>
    <div v-if="viewedArgument">
        <oink-form @added="addOink" :forced-argument="viewedArgument"></oink-form>
        <oink-list :oinks="oinks" :loading="loading"></oink-list>
        <div v-if="oinks.length === 0" class="p-8 text-gray-500 text-center">
            No oinks were found in this argument...
        </div>
    </div>
</template>

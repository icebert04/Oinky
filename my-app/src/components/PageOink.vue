<script setup>
import { ref, watchEffect } from 'vue'
import { PublicKey } from '@solana/web3.js'
import { getOink } from '@/api'
import { useFromRoute } from '@/composables'
import OinkCard from '@/components/OinkCard'

const oinkAddress = ref(null)
useFromRoute((route) => oinkAddress.value = route.params.oink)

const loading = ref(false)
const oink = ref(null)
watchEffect(async () => {
    try {
        loading.value = true
        oink.value = await getOink(new PublicKey(oinkAddress.value))
    } catch (e) {
        oink.value = null
    } finally {
        loading.value = false
    }
})
</script>

<template>
    <div v-if="loading" class="p-8 text-gray-500 text-center">
        Loading...
    </div>
    <div v-else-if="! oink" class="p-8 text-gray-500 text-center">
        Oink not found
    </div>
    <oink-card v-else :oink="oink"></oink-card>
</template>

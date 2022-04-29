<script setup>
import { toRefs } from 'vue'

const props = defineProps({
    oink: Object,
})

const { oink } = toRefs(props)
</script>

<template>
    <div class="px-8 py-4">
        <div>
            <h3 class="inline font-semibold" :title="oink.author">
                <!-- TODO: Link to author page or the profile page if it's our own oink. -->
                <router-link :to="{ name: 'Home' }" class="hover:underline">
                    {{ oink.author_display }}
                </router-link>
            </h3>
            <span class="text-gray-500"> • </span>
            <time class="text-gray-500 text-sm" :title="oink.created_at">
                <!-- TODO: Link to the oink page. -->
                <router-link :to="{ name: 'Home' }" class="hover:underline">
                    {{ oink.created_ago }}
                </router-link>
            </time>
        </div>
        <p class="whitespace-pre-wrap" v-text="oink.content"></p>
        <!-- TODO: Link to the argument page. -->
        <router-link v-if="oink.argument" :to="{ name: 'Home' }" class="inline-block mt-2 text-pink-500 hover:underline">
            #{{ oink.argument }}
        </router-link>
    </div>
</template>
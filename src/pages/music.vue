<template>
    <div>
        <tag-select :tags="tags" />
    </div>
</template>

<script>
import tagSelect from '../components/tag-select'

export default {
    name: 'music',
    props: {},
    data() {
        return {
            tags: [
                {
                    name: 'aaa',
                    value: '111'
                },
                {
                    name: 'bb',
                    value: '222'
                },
                {
                    name: 'cc',
                    value: '333'
                }
            ]
        }
    },
    methods: {},
    mounted() {},
    computed: {},
    components: { tagSelect }
}
</script>

<style scoped>
</style>

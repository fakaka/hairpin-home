<template>
    <div class="tag-select">
        <span
            class="di-tag"
            :class="{ active: tag.diActive }"
            v-for="(tag, index) in innerTags"
            :key="index"
            @click="select(tag)"
            >{{ tag.name }}</span
        >
    </div>
</template>

<script>
export default {
    name: 'tag-select',
    props: {
        multiple: {
            type: Boolean,
            default: false
        },
        tags: Array
    },
    data() {
        return {
            selectValue: []
        }
    },
    methods: {
        select(tag) {
            tag.diActive = !tag.diActive
            if (this.multiple) {
                if (tag.diActive) {
                } else {
                    this.selectValue.push(tag.value)
                }
            } else {
                this.selectValue = [tag.value]
            }
        }
    },
    mounted() {},
    computed: {
        innerTags() {
            let ts = this.tags.map((item) => {
                item.diActive = false
                return item
            })
            return Object.assign([], ts)
        }
    },
    components: {}
}
</script>

<style scoped>
.di-tag {
    display: inline-block;
    height: 32px;
    padding: 0 10px;
    line-height: 30px;
    font-size: 12px;
    border-radius: 4px;
    box-sizing: border-box;
    white-space: nowrap;
    cursor: pointer;
}
.di-tag + .di-tag {
    margin-left: 5px;
}

.di-tag.active {
    background-color: #ecf5ff;
    color: #409eff;
    border: 1px solid #d9ecff;
}
</style>

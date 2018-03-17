<template>
    <div>
        <el-table :data="tableData" stripe style="width: 100%" @row-click="handleRowClick">
            <el-table-column type="index" width="40" />
            <el-table-column prop="name" label="标题" />
            <el-table-column prop="singer" label="歌手" width="150" :show-overflow-tooltip="true" />
            <el-table-column prop="duration" label="时长" width="70" />
            <el-table-column prop="album" label="专辑" width="180" :show-overflow-tooltip="true" />
        </el-table>
    </div>
</template>

<script>

export default {
    name: 'music-list',
    props: {
        tableData: {
            type: Array
        }
    },
    data() {
        return {

        }
    },
    methods: {
        handleRowClick(row, event, column) {
            // console.log(column.property, row[column.property])
            this.$emit('click-row', row, column.property, row[column.property])
        }
    },
    created() { },
    computed: {},
    components: {

    }
}
</script>

<style scoped>

</style>

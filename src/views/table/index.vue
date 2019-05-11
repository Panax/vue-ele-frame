<template>
<div class="pageContainer" ref="pageContainer">
    <!-- 查询条件块 -->
    <div ref="pageSearch" class="pageSearch">
        <div class="searchItem">
            <el-input v-model="pageQuery.name" placeholder="请输入查询名称" clearable></el-input>
        </div>
        <div class="searchItem">
            <el-select v-model="pageQuery.region" placeholder="请选择查询选项" clearable>
                <el-option label="选项1" value="1"></el-option>
                <el-option label="选项2" value="2"></el-option>
            </el-select>
        </div>
        <el-button type="primary" icon="el-icon-search">查询</el-button>
    </div>
    <!-- 数据表格 -->
    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" stripe border fit highlight-current-row :height="tableHeight">
        <el-table-column align="center" label="编号" width="60">
            <template slot-scope="scope">{{ scope.$index }}</template>
        </el-table-column>
        <el-table-column label="名称" align="center" show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row.title }}</template>
        </el-table-column>
        <el-table-column label="作者" width="110" align="center">
            <template slot-scope="scope">
                <span>{{ scope.row.author }}</span>
            </template>
        </el-table-column>
        <el-table-column label="Pageviews" width="110" align="center">
            <template slot-scope="scope">{{ scope.row.pageviews }}</template>
        </el-table-column>
        <el-table-column class-name="status-col" label="Status" width="110" align="center">
            <template slot-scope="scope">
                <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
            </template>
        </el-table-column>
        <el-table-column align="center" prop="created_at" label="Display_time" width="200">
            <template slot-scope="scope">
                <i class="el-icon-time"/>
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
    </el-table>
    <div ref="paginationContainer" class="paginationContainer">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageQuery.currentPage"
        :page-sizes="pageSizes"
        :page-size="pageQuery.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageQuery.totalCount"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import {
    getList
} from "@/api/table";

export default {
    filters: {
        statusFilter(status) {
            const statusMap = {
                published: "success",
                draft: "gray",
                deleted: "danger"
            };
            return statusMap[status];
        }
    },
    data() {
        return {
            list: null,
            listLoading: true,
            tableHeight: 200,
            pageSizes: [],
            pageQuery: {
                totalCount: 30,
                currentPage: 1,
                pageSize: 30
            }
        };
    },
    mounted() {
        const self = this;
        if (self.$refs.pageContainer && self.$refs.pageSearch) {
            this.$nextTick(() => {
                //pageContainer
                self.tableHeight =
                    self.$refs.pageContainer.offsetHeight -
                    self.$refs.pageSearch.offsetHeight -
                    self.$refs.paginationContainer.offsetHeight -
                    30;
                window.onresize = function () {
                    self.tableHeight =
                        self.$refs.pageContainer.offsetHeight -
                        self.$refs.pageSearch.offsetHeight -
                        self.$refs.paginationContainer.offsetHeight -
                        30;
                };
            });
        }
        self.pageSizes = self.$store.state.settings.pageSizes;
        this.fetchData();
    },
    methods: {
        fetchData() {
            this.listLoading = true;
            getList().then(response => {
                this.list = response.data.items;
                this.listLoading = false;
            });
        },
        // pagesize 变化
        handleSizeChange(val) {
            // console.log(`每页 ${val} 条`);
            this.pageQuery.currentPage = 1;
            this.pageQuery.pageSize = val;
        },
        // 当前页变化
        handleCurrentChange(val) {
            this.pageQuery.currentPage = val;
        }
    },
    destroyed() {
        window.onresize = null;
    }
};
</script>

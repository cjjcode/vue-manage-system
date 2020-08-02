<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 课程管理
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button
                        type="primary"
                        icon="el-icon-delete"
                        class="handle-del mr10"
                        @click="addClass"
                >新增课程
                </el-button>
                <el-select v-model="query.topic" placeholder="类型" class="handle-select mr10">
                    <el-option key="库博创品" label="库博创品" value="库博创品"></el-option>
                    <el-option key="隐形基本功" label="隐形基本功" value="隐形基本功"></el-option>
                    <el-option key="流程精进" label="流程精进" value="流程精进"></el-option>
                    <el-option key="门店实践" label="门店实践" value="门店实践"></el-option>
                    <el-option key="专题详解" label="专题详解" value="专题详解"></el-option>
                    <el-option key="直播课程" label="直播课程" value="直播课程"></el-option>
                </el-select>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </div>
            <el-table
                    :data="tableData"
                    border
                    class="table"
                    ref="multipleTable"
                    header-cell-class-name="table-header"
                    @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
                <el-table-column prop="module" label="板块"></el-table-column>
                <el-table-column prop="topic" label="课程类型"></el-table-column>
                <el-table-column prop="url" label="视频url"></el-table-column>
                <el-table-column prop="image" label="图片url"></el-table-column>
                <el-table-column prop="coverImg" label="封面url"></el-table-column>
                <el-table-column prop="type" label="类型"></el-table-column>
                <el-table-column prop="description" label="描述"></el-table-column>
                <el-table-column prop="number" label="排序"></el-table-column>
                <el-table-column prop="code" label="邀请码"></el-table-column>
                <el-table-column prop="app" label="平台"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                                type="text"
                                icon="el-icon-edit"
                                @click="handleEdit(scope.$index, scope.row)"
                        >编辑
                        </el-button>
                        <el-button
                                type="text"
                                icon="el-icon-delete"
                                class="red"
                                @click="handleDelete(scope.$index, scope.row)"
                        >删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                        background
                        layout="total, prev, pager, next"
                        :current-page="query.pageIndex"
                        :page-size="query.pageSize"
                        :total="pageTotal"
                        @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑/新增" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="排序">
                    <el-input v-model="form.number"></el-input>
                </el-form-item>
                <el-form-item label="url">
                    <el-input v-model="form.url"></el-input>
                </el-form-item>
                <el-form-item label="专属码">
                    <el-input v-model="form.code"></el-input>
                </el-form-item>
                <el-form-item label="平台">
                    <el-select  multiple  v-model="form.app" placeholder="平台" class="handle-select mr10">
                        <el-option key="COOPER" label="库博" value="COOPER"></el-option>
                        <el-option key="JM" label="睛美" value="JM"></el-option>
                        <el-option key="BS" label="博士" value="BS"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import {getClassByQuery, updateClass} from '../../../api/index';

    export default {
        name: 'classTable',
        data() {
            return {
                query: {
                    id: '',
                    module: '',
                    topic: '',
                    url: '',
                    coverImg: '',
                    image: '',
                    type: '',
                    description: '',
                    number: '',
                    code: '',
                    number: '',
                    app: '',
                    pageIndex: 1,
                    pageSize: 10
                },
                tableData: [],
                multipleSelection: [],
                delList: [],
                editVisible: false,
                pageTotal: 0,
                form: {},
                optionFlag: '',
                idx: -1,
                id: -1
            };
        },
        created() {
            this.getData();
        },
        methods: {
            getData() {
                getClassByQuery(this.query).then(res => {
                    this.tableData = res;
                    this.pageTotal = res.length || 50;
                });
            },
            // 触发搜索按钮
            handleSearch() {
                this.$set(this.query, 'pageIndex', 1);
                this.getData();
            },
            // 删除操作
            handleDelete(index, row) {
                // 二次确认删除
                this.$confirm('确定要删除吗？', '提示', {
                    type: 'warning'
                })
                    .then(() => {
                        this.$message.success('删除成功');
                        this.tableData.splice(index, 1);
                    })
                    .catch(() => {
                    });
            },
            // 多选操作
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            addClass() {
                this.editVisible = true;
                this.form = {}
                this.optionFlag = 'add'
            },
            // 编辑操作
            handleEdit(index, row) {
                this.idx = index;
                this.form = row;
                this.optionFlag = 'edit'
                this.editVisible = true;
            },
            // 保存编辑
            saveEdit() {
                updateClass(this.form).then(res => {
                    if (res) {
                        this.$message.success(`更新成功`);
                        this.editVisible = false;
                        this.getData();
                    }
                })
            },
            // 分页导航
            handlePageChange(val) {
                this.$set(this.query, 'pageIndex', val);
                this.getData();
            }
        }
    };
</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }

    .table {
        width: 100%;
        font-size: 14px;
    }

    .red {
        color: #ff0000;
    }

    .mr10 {
        margin-right: 10px;
    }

    .table-td-thumb {
        display: block;
        margin: auto;
        width: 40px;
        height: 40px;
    }
</style>

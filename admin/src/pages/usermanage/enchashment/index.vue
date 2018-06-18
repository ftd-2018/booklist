<template>
	<div class="app-container">
		<div class="filter">
			<el-form :inline="true" :model="listQuery" class="demo-form-inline">
				<el-form-item label="手机号">
					<el-input @keyup.enter.native="handleCtr" style="width: 200px;" placeholder="请输入手机号" v-model="listQuery.tel_id">
					</el-input>
				</el-form-item>
				<el-form-item label="类型">
					<el-select clearable style="width: 90px" v-model="listQuery.verify">
						<el-option v-for="item in enchashmentOptions" :key="item.key" :label="item.label" :value="item.key">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="微信号">
					<el-input @keyup.enter.native="handleCtr" style="width: 200px;" placeholder="请输入微信号" v-model="listQuery.wechat_id">
					</el-input>
				</el-form-item>
				<el-form-item label="用户名">
					<el-input @keyup.enter.native="handleCtr" style="width: 200px;" placeholder="请输入用户名" v-model="listQuery.username">
					</el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" icon="el-icon-search" @click="handleCtr">查询</el-button>
				</el-form-item>
			</el-form>
		</div>
		<el-table row-key="id" :data="list"  border fit highlight-current-row
      	style="width: 100%">
			<el-table-column type="index" align="center" label="ID" width="80">
			</el-table-column>
			<el-table-column align="center" label="用户名">
				<template slot-scope="scope">
					<span>{{scope.row.username}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="微信号">
				<template slot-scope="scope">
					<span>{{scope.row.wechat_id}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="手机号">
				<template slot-scope="scope">
					<span>{{scope.row.tel_id}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="提现积分">
				<template slot-scope="scope">
					<span>{{scope.row.points}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="状态" class-name="small-padding fixed-width">
				<template slot-scope="scope">
					<span>{{scope.row.verify | statusFilter}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="操作" class-name="small-padding fixed-width">
				<template slot-scope="scope">
					<el-button v-if="scope.row.verify == '0'" @click="enchashment(scope.$index, scope.row)" type="success" size="small">待提现</el-button>
					<el-button @click="revoke(scope.$index, scope.row)" v-else type="success"  size="small" >撤销</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>
<script>
	import enchashment from './index.js';
	export default enchashment;
</script>
<style scoped>
	
</style>
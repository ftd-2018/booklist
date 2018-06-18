<template>
	<div class="app-container">
		<div class="filter">
			<el-form :inline="true" :model="listQuery" class="demo-form-inline">
				<el-form-item label="手机号">
					<el-input @keyup.enter.native="handleCtr" style="width: 200px;" placeholder="请输入手机号" v-model="listQuery.tel_id">
					</el-input>
				</el-form-item>
				<el-form-item label="微信号">
					<el-input @keyup.enter.native="handleCtr" style="width: 200px;" placeholder="请输入微信号" v-model="listQuery.wechat_id">
					</el-input>
				</el-form-item>
				<el-form-item label="用户昵称">
					<el-input @keyup.enter.native="handleCtr" style="width: 200px;" placeholder="请输入用户昵称" v-model="listQuery.username">
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
			<el-table-column align="center" label="用户名" >
				<template slot-scope="scope">
					<span>{{scope.row.username}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="微信号" >
				<template slot-scope="scope">
					<span>{{scope.row.wechat_id}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="手机号" >
				<template slot-scope="scope">
					<span>{{scope.row.tel_id}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="积分"  class-name="small-padding fixed-width">
				<template slot-scope="scope">
					<template v-if="scope.row.edit">
						<el-input class="edit-input" size="small" v-model="scope.row.credit"></el-input>
						<el-button class='cancel-btn' size="small" icon="el-icon-refresh" type="warning" @click="cancelEdit(scope.row)">cancel</el-button>
					</template>
					<span v-else>{{ scope.row.credit }}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="操作" class-name="small-padding fixed-width">
				<template slot-scope="scope">
					<el-button v-if="scope.row.edit" type="success" @click="confirmEdit(scope.row)" size="small" icon="el-icon-circle-check-outline">Ok</el-button>
          			<el-button v-else type="primary" @click='scope.row.edit=!scope.row.edit' size="small" icon="el-icon-edit">Edit</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>
<script>
	import userInfo from './index.js';
	export default userInfo;
</script>
<style scoped>
	.edit-input {
	  padding-right: 100px;
	}
	.cancel-btn {
	  position: absolute;
	  right: 15px;
	  top: 10px;
	}
</style>
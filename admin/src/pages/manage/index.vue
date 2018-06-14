<template>
	<div class="manage_page fillcontain">
		<el-row style="height: 100%;">
	  		<el-col :span="4"  style="height: 100%;">
				<el-menu :default-active="defaultActive" style="height: 100%;" theme="dark" router>
					<el-menu-item index="manage"><i class="el-icon-menu"></i>首页</el-menu-item>
					<el-submenu index="2">
						<template slot="title"><i class="el-icon-document"></i>工作台</template>
						<el-menu-item index="wxk">微信库</el-menu-item>
					</el-submenu>
				</el-menu>
			</el-col>
			<el-col :span="20" style="height: 100%;overflow: auto;">
				<navbar></navbar>
				<router-view></router-view>
			</el-col>
		</el-row>
  	</div>
</template>

<script>
	import Navbar from './navBar.vue'
    export default {
    	components:{
			Navbar
    	},
		computed: {
			defaultActive: function(){
				return this.$route.path.replace('/', '');
			}
		},
    }
</script>

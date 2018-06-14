<template>
	<div class="c-nav">
		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ path: '/manage' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item v-for="(item, index) in $route.meta.nav" :key="index">{{item}}</el-breadcrumb-item>
		</el-breadcrumb>
		<tabs-view></tabs-view>
		<div class="avatar-container">
			<el-dropdown>
				<span class="el-dropdown-link">
					{{userName}}<i class="el-icon-arrow-down el-icon--right"></i>
				</span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item><span @click="logout">退出登录</span></el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>
	</div>
</template>
<script>
	import TabsView from './tabsView'
	export default{
		data(){
			return{
				userName:''
			}
		},
		mounted(){
			this.userName = this.$store.state.user.username;
		},
		methods:{
			logout(){
				this.$store.dispatch('user/logOut').then(() => {
						location.reload();
				})
			}
		},
		components: {
			TabsView
		}
	}
</script>
<style lang="scss">
	.c-nav{
		position: relative;
		background-color: #EFF2F7;
		height: 60px;
		display: flex;
		align-items: center;
		padding-left: 20px;
	}
	.avator{
		border-radius: 50%;
		margin-right: 37px;
	}
	.el-dropdown-menu__item{
		text-align: center;
	}
	.avatar-container{
		position: absolute;
		right: 0;
		margin-right: 30px;
	}
</style>

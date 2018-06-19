<template>
	<div class="login-container">
		<el-form class="card-box login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
			<h3 class="title">系统登录</h3>
			<el-form-item prop="userName">
				<el-input name="userName" type="text" v-model="loginForm.userName" autoComplete="on" placeholder="账号" />
			</el-form-item>
			<el-form-item prop="password">
				<el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on"
					placeholder="密码" />
				<!-- <span class="show-pwd" @click="showPwd"></span> -->
			</el-form-item>
			<!-- <el-form-item class="kaptcha" prop="kaptcha">
				<el-col :span="12">
					<el-input name="kaptcha" v-model="loginForm.kaptcha" placeholder="请输入验证码"/>
				</el-col>
				<el-col :span="12">
					<img :src="identifyImg" @click="initIndentify()"/>
				</el-col>
			</el-form-item> -->
			<el-button type="primary" style="width:100%;margin-bottom:30px;" :loading="loading" @click.native.prevent="handleLogin">登录</el-button>
		</el-form>
	</div>
</template>

<script>
import {login} from '@/service/api';
import { mapActions } from 'vuex';
export default {
	name: 'login',
	data() {
		const validateUsername = (rule, value, callback) => {
			if (value == '') {
				callback(new Error('用户名不能为空'))
			} else {
				callback()
			}
		}
		const validatePassword = (rule, value, callback) => {
			if (value.length < 6) {
				callback(new Error('密码不能小于6位'))
			} else {
				callback()
			}
		}
		// const validateIdentify = (rule, value, callback) => {
		// 	if (value == '') {
		// 		callback(new Error('验证码不能为空'))
		// 	} else {
		// 		callback()
		// 	}
		// }
		return {
			loginForm: {
				userName: '',
				password: '',
				kaptcha: '',
				serialno: ''
			},
			loginRules: {
				userName: [{ required: true, trigger: 'blur', validator: validateUsername }],
				password: [{ required: true, trigger: 'blur', validator: validatePassword }]
				// identify: [{ required: true, trigger: 'blur', validator: validateIdentify }]
			},
			pwdType: 'password',
			loading: false,
			showDialog: false,
			identifyImg: ''
		}
	},
	mounted(){
		// this.initIndentify();
	},
	methods: {
		...mapActions('user',[
			'getUserInfo'
		]),
		async initIndentify(){
			// let indentify = await getIdentify();
			// this.identifyImg = "data:image/png;base64,"+indentify.data.kaptcha;
			// this.loginForm.serialno = indentify.data.serialno;
		},
		showPwd() {
			if (this.pwdType === 'password') {
				this.pwdType = ''
			} else {
				this.pwdType = 'password'
			}
		},
		handleLogin() {
			const that = this;
			this.$refs.loginForm.validate(async valid => {
				if (valid) {
					let result = await login(that.loginForm);
					if(result.status == 0){  
						localStorage.setItem('token', result.result.token);
						localStorage.setItem('userInfo', JSON.stringify(result.result.userInfo));
						that.$message({
							message: result.msg,
							type: 'success'
						});
						//登录成功跳回上一级页面
						let redirect = that.$route.query.redirect || '';
						that.$router.push({ path: '/' + redirect });
					}else{
						 that.$message.error(result.result);
					}
				} else {
					that.$message.error("格式输入有误");
					return false
				}
			})
		}
	}
}
</script>

<style rel="stylesheet/scss" lang="scss">
	@import "src/style/mixin.scss";
	$bg:#2d3a4b;
	$dark_gray:#889aa4;
	$light_gray:#eee;
	.login-container {
		@include relative;
		height: 100vh;
		background-color: $bg;
		input:-webkit-autofill {
			-webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
			-webkit-text-fill-color: #fff !important;
		}
		input {
			background: transparent;
			border: 0px;
			-webkit-appearance: none;
			border-radius: 0px;
			padding: 12px 5px 12px 15px;
			color: $light_gray;
			height: 47px;
		}
		.el-input {
			display: inline-block;
			height: 47px;
			width: 85%;
		}
		.tips {
			font-size: 14px;
			color: #fff;
			margin-bottom: 10px;
		}
		.svg-container {
			padding: 6px 5px 6px 15px;
			color: $dark_gray;
			vertical-align: middle;
			width: 30px;
			display: inline-block;
			&_login {
				font-size: 20px;
			}
		}
		.title {
			font-size: 26px;
			font-weight: 400;
			color: $light_gray;
			margin: 0px auto 40px auto;
			text-align: center;
			font-weight: bold;
		}
		.login-form {
			position: absolute;
			left: 0;
			right: 0;
			width: 400px;
			padding: 35px 35px 15px 35px;
			margin: 120px auto;
		}
		.el-form-item {
			border: 1px solid rgba(255, 255, 255, 0.1);
			background: rgba(0, 0, 0, 0.1);
			border-radius: 5px;
			color: #454545;
		}
		.kaptcha{
			border: none;
			background: none;
			input{
				background: #fff;
				border-radius: 5px;
				color: #000;
				img{
					width: 100%;
					height: 100%;
				}
			}
		}
		.show-pwd {
			position: absolute;
			right: 10px;
			top: 7px;
			font-size: 16px;
			color: $dark_gray;
			cursor: pointer;
			user-select:none;
		}
		.thirdparty-button{
			position: absolute;
			right: 35px;
			bottom: 28px;
		}
	}
</style>
import {getUserList, updateCredit} from "@/service/api";
import {removeNull} from "@/utils/utils"
export default {
	data(){
		return{
			listQuery:{
				wechat_id: undefined,
				tel_id: undefined,
				username: undefined
			},
			list:[]
		}
	},
	mounted(){
		this.handleCtr();
	},
	methods:{
		async handleCtr(){
			const result = await this.getListMode();
			if(result.status == 0)
				this.list = result.result;
				
		},
		async getListMode(){
			const param = removeNull(this.listQuery);
			let result = await getUserList(param);
			if(result.status != 0){}
			result.result = result.result.map(v => {
				this.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html
				v.originalTitle = v.credit //  will be used when user click the cancel botton
				return v
			})
			return result;	
		},
		cancelEdit(row) {
			row.credit = row.originalTitle
			row.edit = false
			this.$message({
				message: '取消修改',
				type: 'warning'
			})
		},
		async confirmEdit(row) {
			console.log(row.id, row.credit);
			const result = await updateCredit({
				id:row.id, 
				credit:row.credit
			});
			if(result.status == 0){
				row.edit = false
				row.originalTitle = row.credit
				this.$message({
					message: result.result,
					type: 'success'
				})
			}
		}
	}
}
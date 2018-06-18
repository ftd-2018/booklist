import {getEnchaList, enchashment, enchaRevoke} from "@/service/api"
import {removeNull} from "@/utils/utils"
export default {
	data(){
		return{
			listQuery:{
				tel_id: null,
				verify: '0',
				wechat_id: null,
				username: null,
			},
			enchashmentOptions:[{
				key: '0',
          		label: '未提现'
			},{
				key: '1',
				label: '已提现'
			}],
			list: []
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
			let result = await getEnchaList(param);
			return result;	
		},
		async enchashment(index, row){
			const result = await enchashment({
				enchashmentID: row.id
			});
			if(result.status == 0){
				this.$message({
					message: result.result,
					type: 'success'
				});
				this.list.splice(index, 1);
			}
		},
		async revoke(index, row){
			const result = await enchaRevoke({
				enchashmentID: row.id
			});
			if(result.status == 0){
				this.$message({
					message: result.result,
					type: 'success'
				});
				this.list.splice(index, 1);
			}
		}
	},
	filters:{
		statusFilter(status){
			let str = "";
			if(status == 0){
				str = "审核中"
			}else{
				str = "已提现";
			}
			return str;
		}
	}
}
import {getReviewList, publish, revoke} from "@/service/api"
import {removeNull} from "@/utils/utils"
export default {
	data(){
		return{
			listQuery:{
				tel_id: null,
				publish: '0',
				wechat_id: null,
				title: null,
			},
			publishOptions:[{
				key: '0',
          		label: '未审核'
			},{
				key: '1',
				label: '已发布'
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
			let result = await getReviewList(param);
			return result;	
		},
		async publish(index, row){
			const result = await publish({
				courseID: row.id
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
			const result = await revoke({
				courseID: row.id
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
				str = "已发布";
			}
			return str;
		}
	}
}
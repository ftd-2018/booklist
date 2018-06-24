const Service = require('egg').Service;

class CourseService extends Service {
	async insert(data){
		const result = await this.app.mysql.insert('course', data);
    	return result;
	}

	async update(courseID, myCourse, title){
		const {ctx, app} = this;
		const result = await app.mysql.update('course', {
			id: courseID,
			my_course: myCourse,
			title: title
		});
		return result;
	}

	async selectByUID(page, size){
		const result = await this.app.mysql.select('course', {
			where:{user_id: this.app.userId},
			columns: ['id', 'title', 'publish'],
			limit: size,
			offset: (page-1)*size
		});
		return result;
	}
	
	async selectByID(id){
		const {ctx,app} = this;
		const result = await app.mysql.get('course', {
			id: id
		});
		return result;
	}

	async getByID(id){
		const {ctx,app} = this;
		const result = await app.mysql.query('select c.user_id,c.title,c.my_course,c.price,u.username,u.avatar,u.undergraduate,u.master_school from course c left join user u on c.user_id=u.id where c.id='+ id);
		let tmp = {};
		if(result.length >= 1){
			tmp = result[0];
		}

		// 自己写的课程和价格为0的课程直接公开
		if(tmp && tmp.user_id && tmp.user_id == app.userId || tmp.price == 0){
			tmp.isPay = true;
			// 自己写的文章展示编辑
			if(tmp.user_id == app.userId){
				tmp.showEdit = true; 
			}else{
				tmp.showEdit = false;
			}
			return tmp;
		}
		const resultPurchase = await app.mysql.get('purchase',{
			user_id: app.userId,
			course_id: id
		});
		tmp.showEdit = false;
		if(resultPurchase){
			tmp.isPay = true;
		}else{
			// 未购买课程只公开一半
			tmp.my_course = ctx.helper.halfArr(tmp.my_course);
			tmp.isPay = false;
		}
		return tmp;
	}

	async selectCourseWithCollect(page, size){
		const {ctx, app} = this;
		const collect = await ctx.service.collect.listMyCollect();
		let allCourse = await app.mysql.select('course',{
			where:{publish: 1},
			columns: ['id', 'title'],
			limit: size,
			offset: (page - 1)*size
		});
		for(let i = 0; i < allCourse.length; i++){
			allCourse[i].isCollect = 0;   // 未收藏
			let length = await ctx.service.purchase.getPayCount(allCourse[i].id);
			allCourse[i].payCount = length;
			for(let j = 0; j < collect.length; j++){
				if(collect[j].course_id == allCourse[i].id){
					allCourse[i].isCollect = 1;  // 已收藏
				}
			}
		}
		return allCourse;
	}

	async selectCourseWithTitle(title, page, size){
		const {ctx, app} = this;
		const collect = await ctx.service.collect.listMyCollect();
		let allCourse = await app.mysql.query('select id,title from course where title like "%'+title+'%" AND publish=1 LIMIT '+(page-1)*size+','+size);
		for(let i = 0; i < allCourse.length; i++){
			allCourse[i].isCollect = 0;   // 未收藏
			let length = await ctx.service.purchase.getPayCount(allCourse[i].id);
			allCourse[i].payCount = length;
			for(let j = 0; j < collect.length; j++){
				if(collect[j].course_id == allCourse[i].id){
					allCourse[i].isCollect = 1;  // 已收藏
				}
			}
		}
		return allCourse;
	}
}

module.exports = CourseService;
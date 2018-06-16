import {
	baseUrl
} from './env'
import Vue from 'vue'

export default async(url = '', data = {}, type = 'POST', token = 'token', method = 'promise') => {
	type = type.toUpperCase();
	url = baseUrl + url;

	
	let dataStr = ''; //数据拼接字符串，参数要: a=1&b=2。不能{a:1,b:2}的方式，所以要对data做处理
	Object.keys(data).forEach(key => {
		dataStr += key + '=' + data[key] + '&';
	})
	dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));

	if (type == 'GET') {
		if (dataStr !== '') {
			url = url + '?' + dataStr;
		}
	}
		
	if (window.fetch && method == 'fetch') {


		let requestConfig = {
			credentials: true,
			method: type,
			headers: {
				'Accept': 'application/json',
				'Content-type': 'application/x-www-form-urlencoded'
			},
			mode: "cors",
			cache: "force-cache"
		}
		
		if (type == 'POST') {
			Object.defineProperty(requestConfig, 'body', {
				value: dataStr
			})
		}

		try {
			const response = await fetch(url, requestConfig);
			const responseJson = await response.json();
			return responseJson
		} catch (error) {
			throw new Error(error)
		}
	} else {
		return new Promise((resolve, reject) => {
			let requestObj;
			if (window.XMLHttpRequest) {
				requestObj = new XMLHttpRequest();
			} else {
				requestObj = new ActiveXObject;
			}

			let sendData = '';
			if (type == 'POST') {
				sendData = dataStr;
			}
			
			requestObj.open(type, url, true);
			requestObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			if(token == 'token'){
				requestObj.setRequestHeader("token", localStorage.getItem('token') || '');
			}
			
			requestObj.send(sendData);

			requestObj.onreadystatechange = () => {
				if (requestObj.readyState == 4) {
					if (requestObj.status == 200) {
						let obj = requestObj.response
						if (typeof obj !== 'object') {
							try{
								obj = JSON.parse(obj);
							}catch(e){
								console.log(e);
							}	
							
						}
						resolve(obj)
					} else {
						reject(requestObj)
					}
				}
			}
		})
	}
}
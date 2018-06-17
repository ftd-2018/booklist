const userInfo = 'userInfo'

function getUserInfo(){
	// return localStorage.getItem(JSON.parse(userInfo));
}

function setUserInfo(token){
	return localStorage.setItem(userInfo, JSON.stringify(token));
}

function removeUserInfo(){
	return localStorage.removeItem(userInfo);
}

export {
	getUserInfo,
	setUserInfo,
	removeUserInfo
}
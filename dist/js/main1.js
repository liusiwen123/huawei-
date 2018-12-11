// 华为登录页面
//配置要引入的模块的路径了
require.config({
	paths:{
		//自己起的引入模块的名字:引入模块的路径
		"jquery":"jquery-1.11.3",
		"login":"login"
	}
})

// 引入模块调用
require(["login"],function(login){
	login.login();
})
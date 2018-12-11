// 华为注册页面
//配置要引入的模块的路径了
require.config({
	paths:{
		//自己起的引入模块的名字:引入模块的路径
		"jquery":"jquery-1.11.3",
		"register":"register"
	}
})

// 引入模块调用
require(["register"],function(register){
	register.register();
})
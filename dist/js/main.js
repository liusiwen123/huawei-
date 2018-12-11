// console.log("加载成功");

// 华为首页
//配置要引入的模块的路径了
require.config({
	paths:{
		//自己起的引入模块的名字:引入模块的路径
		"jquery":"jquery-1.11.3",
		"index":"index"
	}
})


// 引入模块调用
require(["index"],function(index){
	index.index();
})
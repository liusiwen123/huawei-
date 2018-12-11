// 华为商品列表页
// 配置引入路径
// console.log("加载成功");
require.config({
	paths:{
		"jquery":"jquery-1.11.3",
		"jquery-cookie":"jquery.cookie",
		"list":"list"
	},
	// 设置模块之间的依赖关系
	shim:{
		//保证，先加载JQuery，再加载
		"jquery-cookie":["jquery"],
	}

})

// 引入自己创建的模块
require(["list"],function(list){
	list.list();
})
// 华为商品订单结算页
// 配置引入模块
 // console.log("加载成功");
require.config({
	paths:{
		"jquery":"jquery-1.11.3",
		"jquery-cookie":"jquery.cookie",
		"order":"order"
	},
	// 设置模块之间的依赖关系
	shim:{
		//保证，先加载JQuery，再加载
		"jquery-cookie":["jquery"],
	}

})

// 引入自己创建的模块
require(["order"],function(order){
	order.order();
})
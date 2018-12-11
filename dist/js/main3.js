// 华为商品详情页
//配置要引入的模块的路径
// console.log("加载成功");

require.config({
	paths:{
		//自己起的引入模块的名字:引入模块的路径
		"jquery":"jquery-1.11.3",
		"detail":"detail"
	}
})

// 引入模块调用
require(["detail"],function(detail){
	detail.detail();
})
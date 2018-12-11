// 华为商品订单页 结算页面
define(['jquery','jquery-cookie'],function($){
	function order(){
		$(function(){
			// 1.导航条添加移入移出
			/*下载APP*/
			$(".m1").mouseenter(function(){
				// alert(1);
				$(".s-dropdown .b1").css("display","block");
			})
			$(".m1").mouseleave(function(){
				// alert(1);
				$(".s-dropdown .b1").css("display","none");
			})
			// 更多精彩
			$(".m2").mouseenter(function(){
				// alert(1);
				$(".s-dropdown .b2").css("display","block");
			})
			$(".m2").mouseleave(function(){
				// alert(1);
				$(".s-dropdown .b2").css("display","none");
			})


			

			// 2.实现商品内容的js
			// 先下载商品列表页的数据
			/***加载商品列表页cookie中存储的商品***/
			$.ajax({
				url:"data/list.json",
				success:function(res){
					// alert(res);
					// 一个商品对应一个自己的id,设置id找到对应的下标
					// 获取存储的cookie，转成数组结构,通过id(下标)获取到对应的属性值arr[cookie_arr[i].id].xxx
					var cookieStr = $.cookie("goods");
					var arr = eval(cookieStr);
					for(var i = 0 ; i < arr.length; i++){

						// total();
						// var mm = $("#price").html();
						// var Oprice = mm.substring(1,mm.length);
						// alert(Oprice);
						// var oValue = $("#total").html();
						// alert(oValue);
						// 单价
						var oPrice = res[arr[i].id].price;
						// 数量
						var oNum = arr[i].num;
						// 小计
						var oSum = oPrice * oNum ;
						// alert(oSum);						
						$(`<div class = "sc-pro-list clearfix">
								<label class = "checkbox" for="">
									<input readonly="readonly" class="vam checked dm" id = "${i}">
								</label>
								<div class ="sc-pro-area">
									<div class = "sc-pro-main clearfix">
										<a class = "p-img" href=""><img src="${res[arr[i].id].img}" alt=""></a>
										<ul>
											<li>
												<a href="" class = "p-name">
                            						${res[arr[i].id].name}
												</a>
											</li>
											<!-- 单价 -->
											<li class = "li44">
												<div class = "p-price">
													<article id = "price"><i>￥</i><span>${res[arr[i].id].price}</span></article>
												</div>
											</li>
											<!-- 数量 -->
											<li class = "li55">
												<div class = "p-stock">
													<div class = "p-stock-area">
														<input id = "${i}" type="number" class="p-stock-text" value="${arr[i].num}">
														<p class = "p-stock-btn">
															<a id = "${i}" href="javascript:;" class = "add">+</a>
															<a id = "${i}" href="javascript:;" class="mis disabled">-</a>
														</p>
													</div>
												</div>
											</li>
											<!-- 小计 -->
											<li class = "p-price-total" id = "total">
												<i>¥</i><span>${oSum}</span>
											</li>
											<!-- 操作 -->
											<li>
												<a href="javascript:;"  id="${i}" class = "p-del">删除</a>
											</li>
										</ul>
									</div>
									<!-- 服务  配 -->
									<div class = "sc-pro-parts">
										<!-- 服务 -->
										<div class = "sc-pro-parts-list clearfix p-service-area clear">
											<h2>服务</h2>
											<div class = "p-service-main clearfix">
												<ul>
													<li>
														<div class = "p-service-info mousedown">
															<div class = "p-name disabled">
																<i>延长服务宝</i>
																可选购延长服务宝
															</div>
															<a class = "p-service-btn" href="javascript:;"></a>
														</div>
													</li>
												</ul>
												<ul>
													<li>
														<div class = "p-service-info mousedown">
															<div class = "p-name disabled">
																<i>碎屏服务宝</i>
																可选购碎屏服务宝
															</div>
															<a class = "p-service-btn" href="javascript:;"></a>
														</div>
													</li>
												</ul>
											</div>
										</div>
										<!-- 配 -->
										<div class = "sc-pro-parts-list clearfix clear">
											<h2>配</h2>
											<!-- 1 -->
											<ul class>
												<li>
													<a href="" class = "p-img">
														<img src="images/erji1.jpg" alt="">
													</a>
													<a href="" class = "p-name">荣耀 AM115 半入耳式耳机 （白色） AM115 荣耀版
                            						</a>
												</li>
												<li></li>
												<li>x2</li>
												<li></li>
												<li></li>
											</ul>
											<!-- 2 -->
											<ul class>
												<li>
													<a href="" class = "p-img">
														<img src="images/erji2.png" alt="">
													</a>
													<a href="" class = "p-name">【整点限量送】荣耀 AM115 半入耳式耳机 （白色） 白色	
                            						</a>
												</li>
												<li></li>
												<li>x2</li>
												<li></li>
												<li></li>
											</ul>
										</div>
									</div>
								</div>
							</div>`)
						.appendTo("#content");
					
					}		

				},
				error:function(msg){
					alert(msg);
				}
			})

			

			// 3.点击删除，删除这条商品信息，并删除cookie
			// 通过事件委托，给异步加载的控件添加事件
			$("#content").on("click",".p-del",function(ev){
				ev.preventDefault();
				// alert(1);
				// 先获取到cookie中存储的商品
				var str = $.cookie("goods");
				var arr = eval(str);
				// 4.1删除cookie里存储的商品
				arr.splice($(this).attr("id"),1);
				var cookieStr = JSON.stringify(arr);
				$.cookie('goods',cookieStr,{expires:7});
				 // alert(arr.length);
				// 4.2实现在页面上点击删除，删除对应的商品
				$(this).parents('.sc-pro-list').remove();
				//单价 
				var _price = parseInt($(this).parents(".li55").prev().find(".p-price").find("span").html());
				// 总数量
				var shop_num = 0;
				// 总计
				var shop_piece = 0 ;
				// var _price = $(".p-price").find("")
				// 循环遍历cookie中存储的商品
				for(var i = 0; i < arr.length; i++){
					$().attr("id","i");
					shop_num += arr[i].num;
					shop_piece += arr[i].num * parseInt($(".p-price").eq(i).find('span').html());
					  // alert(shop_piece);
				 } 
				 // 总数
				$(".total-choose em").html(`${shop_num }`);
				// 总计
				$("#gather span").html(`${shop_piece}`);
				
			})



			//4.商品数量的加减
			// 点击+号
			$("#content").on("click", ".add", function(){
				// alert(1);
				// 修改cookie里的数量
				var str = $.cookie('goods');
				var arr = eval(str);	
				arr[$(this).attr("id")].num++;
				// 单价
				var _price = parseInt($(this).parents(".li55").prev().find(".p-price").find("span").html());
				// alert(_price);
				// 总数量
				var shop_num = 0;
				// 总计
				var shop_piece = 0 ;
				// var _price = $(".p-price").find("")
				// 循环遍历cookie中存储的商品
				for(var i = 0; i < arr.length; i++){
					shop_num += arr[i].num;
					shop_piece += arr[i].num * parseInt($(".p-price").eq(i).find('span').html());
					  // alert(shop_piece);
				 } 
				 var cookieStr = JSON.stringify(arr);
				 $.cookie("goods",cookieStr,{expires:7});
				// 修改网页内容
				// 四个地方做修改
				// input输入框
				$(".p-stock-text").eq($(this).attr("id")).attr("value",`${arr[$(this).attr("id")].num}`);
				// 小计
				$(".p-price-total").eq($(this).attr("id")).html("").append($(`<i>¥</i><span>${_price * arr[$(this).attr("id")].num}</span>`));
				// 总数
				$(".total-choose em").html(`${shop_num }`);
				// 总计
				$("#gather span").html(`${shop_piece}`);

			})

			// 点击-号
			$("#content").on("click", ".mis", function(){
				if($(".p-stock-text").eq($(this).attr("id")).attr("value")>1){
					 // alert(1);
					// 修改cookie里的数量
					var str = $.cookie('goods');
					var arr = eval(str);	
					arr[$(this).attr("id")].num--;
					// 单价
					var _price = parseInt($(this).parents(".li55").prev().find(".p-price").find("span").html());
					// alert(_price);
					// 总数量
					var shop_num = 0;
					// 总计
					var shop_piece = 0 ;
					// var _price = $(".p-price").find("")
					// 循环遍历cookie中存储的商品
					for(var i = 0; i < arr.length; i++){
						shop_num += arr[i].num;
						shop_piece += arr[i].num * parseInt($(".p-price").eq(i).find('span').html());
						  // alert(shop_piece);
					 } 
					 var cookieStr = JSON.stringify(arr);
					 $.cookie("goods",cookieStr,{expires:7});
					// 修改网页内容
					// 四个地方做修改
					// input输入框
					$(".p-stock-text").eq($(this).attr("id")).attr("value",`${arr[$(this).attr("id")].num}`);
					// 小计
					$(".p-price-total").eq($(this).attr("id")).html("").append($(`<i>¥</i><span>${_price * arr[$(this).attr("id")].num}</span>`));
					// 总数
					$(".total-choose em").html(`${shop_num }`);
					// 总计
					$("#gather span").html(`${shop_piece}`);

				}
					
			})

			// 加载总计  小计 * 总数
			/*function together(){
				var num = ;

			}
*/	

			

			// 5。点击全选，方块全部选中，总价变化
			// var aButtons1 = $(".checkbox input");
			$(".selected").click(function(){
				if($(this).attr("class")=="vam selected"){
					$(".checkbox input").addClass('checked')		
					// 总数量
					var shop_num = 0;
					// 总计
					var shop_piece = 0;
					var str = $.cookie('goods');
					var arr = eval(str);
					// 循环遍历cookie中存储的商品
					for(var i = 0; i < arr.length; i++){
						shop_num += arr[i].num;
						shop_piece += arr[i].num * parseInt($(".p-price").eq(i).find('span').html());
						  // alert(shop_piece);
					 } 
					 // 总数
					$(".total-choose em").html(`${shop_num }`);
					// 总计
					$("#gather span").html(`${shop_piece}`);

				}else{
					$(".checkbox input").removeClass('checked');
					 // 总数
					$(".total-choose em").html(`0`);
					// 总计
					$("#gather span").html(`0`);


				}
			})


			// 点击非全选框，点击哪个框，选中哪个框
			$("#content").on("click",".dm",function(){
				// 总数量
				var shop_num = Number($(".total-choose em").html());
				// alert( shop_num );
				// 总计
				var shop_piece = Number($("#gather span").html());
				 // alert( shop_piece );
				// 单价
				var _price = Number($(this).parents(".checkbox").next().find(".p-price").find("span").html());
				// alert(_price);
			// $(".dm").click(function(){
			// alert(1);			
				if($(this).attr("class") == "vam dm"){
					$(this).addClass('checked');
					
					/*var str = $.cookie('goods');
					var arr = eval(str);
					// 循环遍历cookie中存储的商品
					for(var i = 0; i < arr.length; i++){
						shop_num += arr[i].num;
						shop_piece += arr[i].num * parseInt($(".p-price").eq(i).find('span').html());
						  // alert(shop_piece);
					 } */
					 shop_num += parseInt($(".p-stock-area input").eq($(this).attr("id")).attr("value"));
					 // console.log($(this).attr("id"));
					 alert(shop_num);
					 shop_piece += parseInt($(".p-stock-text").eq($(this).attr("id")).attr("value")) * _price;
					 // 总数
					$(".total-choose em").html(`${shop_num }`);
					// 总计
					$("#gather span").html(`${shop_piece}`);


				}else{
					$(this).removeClass('checked');
					
					// 循环遍历cookie中存储的商品
					/*for(var i = 0; i < arr.length; i++){
						shop_num -= arr[i].num;
						shop_piece -= arr[i].num * parseInt($(".p-price").eq(i).find('span').html());
						  // alert(shop_piece);
					 } */
					 shop_num -= parseInt($(".p-stock-text").eq($(this).attr("id")).attr("value"));
					 shop_piece -= parseInt($(".p-stock-text").eq($(this).attr("id")).attr("value")) * _price;
					  // 总数
					$(".total-choose em").html(`${shop_num }`);
					// 总计
					$("#gather span").html(`${shop_piece}`);





				}
				
			})

		

			

		})
	}
	return {
		order:order
	}
})
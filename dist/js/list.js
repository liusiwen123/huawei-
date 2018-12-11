// 商品列表页js特效
define(['jquery','jquery-cookie'],function($){
	function list(){
		$(function(){
			sc_car_num();
			// 1.顶部导航部分 添加移入移出,移入谁显示谁
			// $(".nav .s-dropdown .h").mouseenter(function(){
			// 	$(".nav .s-dropdown .b").css("display","block"); 
			// })
			//一. 切换不同的列
			// 移入哪张小图片，显示对应的大图片 并显示对应的小图片
			var oBtns = $(".s-dropdown").find(".h");
			var oUl = $(".s-dropdown").find(".b");
			// var aLis = oUl.find("li");

			 // 移入下边8个按钮时，切换图片
			 oBtns.mouseenter(function(){
			 	// iNow = $(this).index();
			 	// show();
			 })

			// 设置iNow 代表大图的下标
			// var iNow = 0 ;
			// 封装函数，切换大图
			function show(){
				// iNow++;
				// 移入下边8张小图(按钮)时切换
				//1.先让当前移入的按钮变为current
				oUl.css("display","none").eq($(this).index()).css("display","block");
				// 2.切换图片
				// aLis.attr("class","").eq(iNow).attr("class","active");

			}


			// 2.内容部分加载数据
			$.ajax({
				url:"data/list.json",
				success:function(data){
					// alert(data);
					for(var i = 0 ;i < data.length;i++){
							$(`<li>
							<div class = "pro-panels">
								<p class = "p-img">
									<a href="">
										<img src="${data[i].img}" alt="">
									</a>
								</p>
								<p class = "p-name">
									<a href="">
										<span>${data[i].title}</span>
										<span class="red"></span>
									</a>
								</p>
								<p class = "p-price">
									<b>${data[i].price}</b>
								</p>
								<div class = "p-button clearfix">
									<table colspan="0" border="0" rowspan="0">
										<tbody>
											<tr>
												<td>
													<a class = "p-button-cart" href="javascript:void(0);">
														<span id = "${data[i].id}">${data[i].button}</span>
													</a>
												</td>
												<td>
													<label class = "p-button-score" for="">
														<span>${data[i].label}</span>
													</label>
												</td>
											</tr>
										</tbody>
									</table>
								</div>
								<s class = "p-tag">
									<img src="${data[i].img2}" alt="">
								</s>
							</div>
						</li>`)
							.appendTo(".channel-list .pro-list ul");
						
					}
				},
				error:function(data){
					alert(msg);
				}
			})


			
			// 3.点击选购，加入购物袋,将商品信息存储到cookie当中
			// 通过事件委托，给异步加载的数据添加点击事件
			//var oBtn22 = $(".p-button-cart").find("span");
			$(".channel-list .pro-list ul").on("click",".p-button-cart span",function(){
				// alert(1);
				var id = this.id;
				// alert(this.id);
				var first = $.cookie("goods") == null ? true : false;
				// 如果是第一次添加，直接将cookie存储进去
				if(first){
					$.cookie("goods",`[{id:${id},num:1}]`,{expires:7})
				}else{
					// 先判断之前是否添加过该商品
					// 通过循环遍历
					// cookie存储的是字符串格式，需要转成数组格式去遍历
					var cookieStr = $.cookie("goods");
					var arr = eval(cookieStr);
					// 假设之前没添加过
					var same = false;
					for(var i = 0 ; i < arr.length; i++){
						// 通过id判断 如果cookie中存储的id和当前商品id相同，说明添加过
						if(arr[i].id == id){
							// 数量增加
							arr[i].num++;
							same = true;
							break;
						}
					}
					//如果这个商品第一次添加
					if(!same){
						var obj = {id:id,num:1};
						arr.push(obj);
					}
					var cookieStr = JSON.stringify(arr);
					$.cookie("goods",cookieStr,{expires:7})
				}
				 // alert($.cookie("goods"));
				 sc_car_num();


			})
			// 封装函数，计算小车内的商品数量
			function sc_car_num(){
				var cookieStr = $.cookie("goods");
				var arr = eval(cookieStr);
				// 如果存在 求和
				if(arr){
					var sum = 0 ;
					for(var i = 0 ; i < arr.length; i++){
						sum += arr[i].num;
					}
				}
				$("#header-cart-total").html(sum);
			}

			// 封装函数，让顶部显示购物车内的商品
			function sc_msg(){
				// 再加载一遍数据
				$.ajax({
					url:"data/list.json",
					success:function(res){
						// alert(data);
						// 清空ul中内容
						$("#minicart-goods-list").html("");
						// 清空总价
						$("#micro-cart-totalPrice").html("");

						var cookieStr = $.cookie("goods");
						var arr = eval(cookieStr);
						for(var i = 0 ;i < arr.length; i++){
							$(`<li class = "minicart-pro-item ">
	                				<!-- 上边 -->
	                				<div class = "pro-info clearfix">
	                					<div class = "p-choose">
	                						<i class="icon-choose" id="icon-choose-y4W-S0-2601010058702"></i>
	                					</div>
	                					<div class = "p-img">
	                						<a href=""><img src="${res[arr[i].id].img}" alt=""></a>
	                					</div>
	                					<div class = "p-name">
	                						<a href="">荣耀8X 千元屏霸 高屏占比 2000万AI双摄 全网通 4GB+64GB（魅海蓝）</a>
	                					</div>
	                					<div class = "p-dec">
	                						<span class="p-slogan">               
	                						 </span>
	                					</div>
	                					<div class = "p-status">
	                						<div class = "p-price">
	                							<b>￥&nbsp;${res[arr[i].id].price}.00</b>
	                							<strong><em>x</em><span>${arr[i].num}</span></strong>
	                						</div>
	                					</div>
	                				</div>

									<!-- 下边 -->
									<div class = "p-pack">
	                        			<span class="p-mini-tag-suit">配</span>
	                        			<a href="">
	                        				<span class="">荣耀 AM115 半入耳式耳机 （白色）<em>x ${arr[i].num}</em></span>
	                     	
	                        			</a>
	                        		</div>

                                </li>`)
							.appendTo("#minicart-goods-list");

						// 计算总价
						var em = $("#micro-cart-totalPrice").html().length;
						// alert(em);
						// 需要截取出￥符
						var oValue = Number($("#micro-cart-totalPrice").html().slice(1,em));
						// alert(oValue);
						// alert(res[arr[i].id].price);
						// alert(arr[i].num);
						// alert(res[arr[i].id].price * arr[i].num);
						oValue +=  res[arr[i].id].price * arr[i].num;
						// // 赋值
						// alert(oValue);
						$("#micro-cart-totalPrice").html(`￥${oValue}`);

					}
				},
					error:function(msg){
						alert(msg);
					}
				})
			}

			// 4.右上角购物车添加移入移出
			// $("#header-toolbar-minicart").mouseenter(function(){
			// 	if($.cookie("goods")){
			// 		$("#minicart-pro-empty").css("display","none");
			// 		$("#minicart-pro-list-block").css("display","block");
			// 		sc_msg();
			// 	}else{
			// 		$("#minicart-pro-empty").css("display","block");

			// 	}
				
			// })
			// $("#header-toolbar-minicart").mouseleave(function(){
			// 	$("#header-toolbar-minicart-content").css("display","none");
				
			// })
			// 移入
			$("#header-toolbar-minicart").mouseenter(function(){
				if($.cookie("goods")!="[]" || $.cookie("goods")!= null){
					$("#minicart-pro-list-block").css("display","block");
					sc_msg();			
				}else{
					$("#minicart-pro-empty").css("display","block");
					$("#minicart-pro-list-block").css("display","none");

				}
				
			})
			// 移出
			$("#header-toolbar-minicart").mouseleave(function(){
				$("#minicart-pro-list-block").css("display","none");
				$("#minicart-pro-empty").css("display","none");
				
			})



		})
	}
	return{
		list:list
	}
})
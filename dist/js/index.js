// 首页js代码
define(['jquery'],function($){
	function index(){
		$(function(){

		// 一、轮播图部分
			// 加载数据
			$.ajax({
				url:'data/index.json',
				success:function(res){
				// alert(res);
					// 通过循环遍历，把数据添加到页面上
					var html = "";
					for(var i = 0 ; i < res.length; i++){
						html += `<li>
									<a href="">
										<img src="${res[i].img}" alt="">
										<div id = "${res[i].id}"></div>
									</a>
								</li>`;
					}
					$('.hot-board .ec-slider ul').html(html);
				},
				error:function(msg){
					alert(msg);
				}
			})



			// 添加js特效
			var oBtns = $(".ec-slider-nav-l").find("span");
			var oUl = $(".ec-slider").find("ul");
			var aLis = oUl.find("li");
			var oBtn2 = $(".ec-slider-middle").find(".button-slider-next");
			var oBtn1 = $(".ec-slider-middle").find(".button-slider-prev");
			// 设置iNow,代表当前显示图片是下标
			var iNow = 0;
			var timer = null;

			// 移入下边8个按钮时，切换图片
			oBtns.mouseenter(function(){
				iNow = $(this).index();	
				// alert(this);
				tab();

			})

			// 点击左右两个按钮时切换图片
			oBtn1.click(function(){
				iNow--;
				tab();

			}) 

			oBtn2.click(function(){
				iNow++;
				tab();

			})
			// 封装函数，用来切换图片
			function tab(){
				// 移入下边8个按钮时切换
				// 1.先让当前被点击的按钮为active
				oBtns.attr("class","").eq(iNow).attr("class","active");
				
				//动画之前判断
				// 最后一张图片，active的按钮也是下标0
				if(iNow == 8){
					oBtns.eq(0).attr("class","active");	
				}


				// 2.切换图片
				oUl.animate({
					left:-1263 * iNow
				},1000,function(){
					if(iNow == 8){
						oUl.css("left",0);
						iNow = 0;
					}
				});
			}
			timer = setInterval(timerInner,2000);
			//添加自动滚动
			function timerInner(){
				iNow++;
				document.title = iNow;
				tab();
			}

			// 添加移入移出，移入时停止，移出继续
			$(".ec-slider").hover(function(){
				clearInterval(timer);
			},function(){
				timer = setInterval(timerInner,2000);
			})


		// 二、侧拉菜单
		// 下载数据
			$.ajax({
				url:'data/caidan.json',
				success:function(data){
					 // alert(data);
					 // 1.创建大的div
					 for(var i = 0 ; i < data.length;i++){
					 	$(`<div class = "category-panels ${data[i].aaa}"></div>`)
					 	.appendTo($(".category-index .category-item").eq(i));


					 	var ul = data[i].child;
					 	// 2.创建div中的ul
					 	for(var j = 0 ; j < ul.length;j++){
					 		$(`<ul class = "subcate-list clearfix"></ul>`)
					 		.appendTo($(".category-panels").eq(i));
					 		 		
					 		// console.log(ul[j].child.length);
						 	// 3.创建ul中的li
						 	if(ul[j].child){
						 		var li = ul[j].child;
							 	for(var z = 0; z < li.length;z++){

							 		if(li[z].img){
							 				$(`<li class = "subcate-item">
													<a href="">
														<img src="${li[z].img}" alt="">
														<span>${li[z].name}</span>
													</a>
												</li>`).appendTo($(".subcate-list").eq(j));
							 		}else{
							 				$(`<li class = "subcate-item">
													<a href="">
														<span>${li[z].name}</span>
													</a>
												</li>`).appendTo($(".subcate-list").eq(j));
							 		}
							 			 		
							 	}

						 	}
						}

					 }

				},
				error:function(msg){
					alert(msg);
				}
			})

			// 添加js特效
			// 移入
			$(".category-index .category-item").mouseenter(function(){
				// alert(1);
				$(this).css("background", '#fff')
				.siblings().css("background",'rgba(255,255,255,0.9)');

				$(".category-panels").css("display", 'none')
				.eq($(this).index()).css("display", 'block');


				// // 移入里边的li标签背景颜色变灰色
				// $(".category-index  .subcate-item").eq($(this)).mouseenter(function(){
				// 	$(this).index().css("background","gray");
				// })		
			})

			// // 移出
			$(".category-index .category-item").mouseleave(function(){
				// alert(1);
				$(this).css("background", 'rgba(255,255,255,0.9');
				// .siblings().css("background",'#fff)');

				$(".category-panels").css("display", 'none');
				// .eq($(this).index()).css("display", 'none');
			})


			// 三、内容1 荣耀Magic2
			// 下载数据
				$.ajax({
					url:'data/index2.json',
					success:function(data){
						// alert(data);
						for(var i = 0 ;i <data.length;i++){
							$(`<li><a class = "item" href=""><img src="${data[i].img}" alt=""></a></li>`)
							.appendTo(".home-promo-list");
						}	
					},
					error:function(msg){
						alert(msg);
					}
				})
			// $(".home-promo-list li").hover(function(){

			// 	$(this).css("box-shadow","0 12px 36px rgba(0,0,0,0.1)");

			// // 阴影变化
			// // 	.home-promo-list li:hover {
				// 外部阴影
			// //     box-shadow: 0 12px 36px rgba(0,0,0,0.1);
			// // }

			// })
			// 内部阴影
			// box-shadow:inset 0 0 1px #cfcdcd;

			// 四、内容2 热销单品
			// 下载数据
				$.ajax({
					url:'data/danpin.json',
					success:function(data){
						 // alert(data);
						 for(var i = 0 ;i<data.length;i++){
						 	if(i == 0){
						 			$(`<div class = "span-232 fl">
											<ul class="grid-promo-list clearfix"></ul>	

						 				</div>`)
						 			.appendTo(".home-hot-goods .wing");
						 	}else{
						 		$(`<div class = "span-968 fl">
									<ul class = "grid-list clearfix"></ul>
						 			</div>`)
						 			.appendTo(".home-hot-goods .wing");
						 	}

						 	var pm = data[i].child;
						 	for(var j = 0 ; j < pm.length;j++){
						 		if(i == 0){
						 			$(`
										<li class="grid-items grid-items-sm">
											<a class = "thumb" href="">
												<img src="${pm[j].img}" alt="">
											</a>
										</li>
									`)
						 		.appendTo(".home-hot-goods .span-232 .grid-promo-list");
						 		}else{
						 			$(`
										<li class = "grid-items">
											<a class = "thumb" href="">
												<p class = "grid-img">
													<img src="${pm[j].img}" alt="">
												</p>
												<div class = "grid-title">${pm[j].title1}</div>
												<p class = "grid-desc">${pm[j].title2}</p>
												<p class = "grid-price">${pm[j].price}</p>
												<p class = "grid-tips">
													<em class = "thumb">
														<span class="color01" style= "background-color:#68BEFF">${pm[j].content}</span>
													</em>
												</p>
											</a>
										</li>
										`)
						 		.appendTo(".home-hot-goods .span-968 .grid-list ");
						 		}
						 		
						 	}
						 }
					},
					error:function(msg){
						alert(msg);
					}
				})


				// 五、内容3 精品推荐
				// 下载数据
				$.ajax({
					url:'data/jingpin.json',
					success:function(data){
						 // alert(data);
						 for(var i = 0 ; i <data.length;i++){
						 	$(`<li class="grid-items swiper-slide swiper-slide-visible swiper-slide-active">
									<a class = "thumb" href="">
										<div class = "grid-info">
											<p class = "grid-img">
												<img src="${data[i].img}" alt="">
											</p>
											<p class = "grid-desc">${data[i].desc}</p>
										</div>
										<div class = "grid-title">${data[i].name}</div>
										<p class = "grid-price">${data[i].price}</p>
										<p class = "grid-tips">
											<em class="thumb"> 
												<span class="color01" style= "background-color:#68BEFF">${data[i].content}</span> 
											</em>
										</p>
									</a>
								</li>`)
						 	.appendTo("#goodsRecommend-recommend ul");
						 }
					},
					error:function(msg){
						alert(msg);
					}
				})

				// js特效
				// 点击左右两个按钮,切换页面
				// 点击右边按钮
				$("#goodsRecommend-recommend .btn-next").click(function(){
					$("#goodsRecommend-recommend ul")
					.css("transform","translate3d(-1210px, 0px, 0px)")
					.css("transition-duration","0.3s");

					$(this).addClass("disabled");
					$("#goodsRecommend-recommend .btn-prev").removeClass("disabled");

				})
				// 点击左边按钮
				$("#goodsRecommend-recommend .btn-prev").click(function(){
					$("#goodsRecommend-recommend ul")
					.css("transform","translate3d(0px, 0px, 0px)")
					.css("transition-duration","0.3s");

					$(this).addClass("disabled");
					$("#goodsRecommend-recommend .btn-next").css("display","block");


				})
				// 移入左右两个按钮时，透明度变化
				$("#goodsRecommend-recommend .grid-btn").hover(function(){
					$(this).css("opacity",1);
				},function(){
					$(this).css("opacity",0.8);
				})

				// 六、内容大块部分
				// （手机 笔记本电脑 精品平板）格式相同 
				// 
				// 下载数据
				$.ajax({
					url:"data/index3.json",
					success:function(data){
						// alert(data);
						//通过第一个大循环遍历 手机 笔记本电脑 精品平板这三个大块
						for(var i = 0 ;i<data.length;i++){
							$(`<div class = "layout" id = "${data[i].nm}">
								<div class = "home-channel-floor">
									<div class = "h">
										<h2 class = "channel-title fl">${data[i].title}</h2>
										<ul class = "channel-nav fl"></ul>
										<div class = "channel-more fr">
											<a href="">查看更多</a>
										</div>
									</div>
									<div class = "b">
										<div class = "goods-list">
											<ul class = "grid-list clearfix">
											</ul>
										</div>
									</div>
								</div>
							</div>`)
							.appendTo(".home-channel-container");

							// 通过第二个循环遍历标题
							var ul = data[i].nav;
							for(var j = 0 ; j < ul.length;j++){
								$(`<li><a href="">${ul[j].name}</a></li>`)
								.appendTo(`#${data[i].nm} .h ul`)
							}
							// 第三个循环遍历内容
							var ol = data[i].child;
							for(var z = 0 ; z < ol.length;z++){
								if(z == 0){
									$(`<li class = "grid-items grid-items-md">
											<a class = "thumb" href="">
												<img src="${ol[z].img}" alt="">
											</a>
										</li>`)
									.appendTo(`#${data[i].nm} .b ul`);
								}else{
									$(`<li class = "grid-items">
										<a class = "thumb" href="">
											<div class = "grid-info">
												<p class = "grid-img">
													<img src="${ol[z].img}" alt="">
												</p>
											</div>
											<div class = "grid-title">${ol[z].title1}</div>
											<p class = "grid-desc">${ol[z].desc}</p>
											<p class = "grid-price">${ol[z].price}</p>
										</a>
								</li>`)
									.appendTo(`#${data[i].nm} .b ul`);
								}
								
							}
						} 
					},
					error:function(msg){
						alert(msg);
					}
				})

				// 七、内容大块部分
				// （智能穿戴 智能家居 热销配件 品牌配件）格式相同
				// 下载数据
				$.ajax({
					url:"data/index4.json",
					success:function(data){
						// alert(data);
						// alert(data);
						//通过第一个大循环遍历 智能穿戴 智能家居 这两个大块
						for(var i = 0 ;i < data.length; i++){
							$(`<div class = "layout" id = "${data[i].nm}">
								<div class = "home-channel-floor">
									<div class = "h">
										<h2 class = "channel-title fl">${data[i].title}</h2>
										<ul class = "channel-nav fl"></ul>
										<div class = "channel-more fr">
											<a href="">查看更多</a>
										</div>
									</div>
									<div class = "b">
										<div class = "goods-list">
											<ul class = "grid-list clearfix" id = "ul3">
											</ul>
										</div>
										<div id = "goodsContent4" class = "goods-rolling swiper-container relative pdt-12">
											<ul class = "grid-list swiper-wrapper clearfix" id = "ul4" style= "width: 2222px; height: 240px;">
											</ul>
											<div class = "grid-btn swiper-button-prev btn-prev disabled">
												<span></span>
											</div>
											<div class = "grid-btn swiper-button-next btn-next">
												<span></span>
											</div>
										</div>
									</div>
								</div>
							</div>`)
							.appendTo(".home-channel-container");

							// 通过第二个循环遍历标题
							var ul = data[i].nav;
							for(var j = 0 ; j < ul.length;j++){
								$(`<li><a href="">${ul[j].name}</a></li>`)
								.appendTo(`#${data[i].nm} .h ul`)
							}
							// 第三个循环遍历内容
							var ol = data[i].child;
							for(var z = 0 ; z < ol.length;z++){
								if(z == 0){
									$(`<li class = "grid-items grid-items-lg">
											<a class = "thumb" href="">
												<img src="${ol[z].img}" alt="">
											</a>
										</li>`)
									.appendTo(`#${data[i].nm} .b .goods-list #ul3`);
								}
								else if(z > 0 && z < 9){
									$(`<li class = "grid-items">
										<a class = "thumb" href="">
											<div class = "grid-info">
												<p class = "grid-img">
													<img src="${ol[z].img}" alt="">
												</p>
											</div>
											<div class = "grid-title">${ol[z].title1}</div>
											<p class = "grid-desc">${ol[z].desc}</p>
											<p class = "grid-price">${ol[z].price}</p>
										</a>
									</li>`)
									.appendTo(`#${data[i].nm} .b .goods-list #ul3`);
								}
								else{
									$(`<li class = "grid-items swiper-slide swiper-slide-visible " id = "${ol[z].np}">
											<a class = "thumb" href="">
												<div class = "grid-info">
													<p class = "grid-img">
														<img src="${ol[z].img}" alt="">
													</p>
												</div>
												<div class = "grid-title">${ol[z].title1}</div>
												<p class = "grid-desc">${ol[z].desc}</p>
												<p class = "grid-price">${ol[z].price}</p>
											</a>
										</li>`)
									.appendTo(`#${data[i].nm} .b .goods-rolling #ul4`)
								}
								
							}
						} 
					},
					error:function(msg){
						alert(msg);
					}
				})



				// js特效
				// 点击左右两个按钮,切换页面
				// 点击右边按钮
				$(".home-channel-container #goodsContent4 .btn-next").click(function(){
					alert(1);
					$("#goodsContent4 ul")
					.css("transform","translate3d(-1210px, 0px, 0px)")
					.css("transition-duration","0.3s");

					$(this).addClass("disabled");
					$("#goodsContent4 .btn-prev").removeClass("disabled");

				})
				// 点击左边按钮
				$("#goodsContent4 .btn-prev").click(function(){

					$("#goodsContent4 ul")
					.css("transform","translate3d(0px, 0px, 0px)")
					.css("transition-duration","0.3s");

					$(this).addClass("disabled");
					$("#goodsContent4 .btn-next").css("display","block");

				})


		})
	}	
	return {
		index: index
	}
})

		
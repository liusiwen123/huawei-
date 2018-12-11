// 华为商品详情页
// 遵从AMD规范
define(['jquery'],function($){
	function detail(){
		$(function(){
			//一. 切换图片
			// 移入哪张小图片，显示对应的大图片 并显示对应的小图片
			// 找到小图
			var aUls = $(".product-gallery-thumbs ul");
			var oBtns = aUls.find("li");
			 // 移入下边8个按钮时，切换图片
			 oBtns.mouseenter(function(){
			 	iNow = $(this).index();
			 	tab();
			 })

			// 设置iNow 代表大图的下标
			var iNow = 0 ;
			// 封装函数，切换大图
			function tab(){

				// 移入下边8张小图(按钮)时切换
				//1.先让当前移入的按钮变为current
				oBtns.attr("class","").eq(iNow).attr("class","current");
				// 2.切换图片
				$("#wrap ul li").attr("class","").eq(iNow).attr("class","active");
			}

			// 3.点击左右按钮，切换小图片
				// 点击右边按钮
				$(".product-gallery-forward").click(function(){
					
					$(".product-gallery-thumbs ul")
					.css("transform","translate3d(-76px, 0px, 0px)")
					.css("transition-duration","0.3s");

					 // $(this).addClass("current").css("border","1px solid #ca141d;");
					// $("#goodsContent4 .btn-prev").removeClass("disabled");
				})

				// 点击左边按钮
				$(".product-gallery-back").click(function(){
					$(".product-gallery-thumbs ul")
					.css("transform","translate3d(0px, 0px, 0px)")
					.css("transition-duration","0.3s");

				})


				// 放大镜  实现图片放大缩小
				/*
			 *  一。当鼠标移入遮罩时，滑块和大图所在的盒子显示
			 *  二。当鼠标移出遮罩时，滑块和大图所在的盒子隐藏
			 *  三。在遮罩上设置鼠标移动事件，做鼠标跟随的效果---边界
			 * 	四。计算滑块在小图上的移动比例
			 * 	五。设置大图的移动距离
			 * 
			 *  
			 *  移动比例： 当前滑块的left值 / 当前滑动移动的总范围
			 * 	
	   		 */
	   		 //获取页面所需元素
               //获取页面所需元素
                const oBigBox = document.getElementById("wrap");	
                //获取小图
				const oSmallPic = document.querySelector('.small_pic');
				//获取遮罩
				const oMark = document.querySelector('.mark');
				//获取滑块
				const oFloat = document.querySelector('.float_layer');
				//获取大图盒子
				const oBigPic = document.querySelector('.big_pic');
				//获取大图
				const oBigImg = document.querySelector('.big_pic img');

				//一、给遮罩添加移入事件，滑块和大图所在的盒子显示
				$(".mark").mouseenter(function(){
					$(".float_layer").css('display','block');
					$(".big_pic").css('display','block');
				});
				//二、给遮罩添加移出事件，滑块和大图所在的盒子隐藏
				$(".mark").mouseleave(function(){
					$(".float_layer").css('display','none');
					$(".big_pic").css('display','none');
				});


				//三、给遮罩添加移动事件，实现滑块跟随并设置边界
				// var oMark = $('.small_pic').find('.mark');
				// var oFloat = $('small_pic').find('.float_layer');
				// var oBigPic = $(".m-c").find('.div').find('.big_pic');
				oMark.onmousemove = function(evt){
					var e = evt || window.event;
					 // alert(oMark.offsetTop)
					 // left为小遮罩层的值
					let left = e.pageX - oBigBox.offsetLeft  - oFloat.offsetWidth / 2;
					let top = e.pageY - oBigBox.offsetTop - oFloat.offsetHeight / 2;
					//设置边界
					if(left <= 0){
						left = 0;
					}else if(left >= oMark.offsetWidth - oFloat.offsetWidth){
						left = oMark.offsetWidth - oFloat.offsetWidth;
					}
					if(top <= 0){
						top = 0;
					}else if(top >= oMark.offsetHeight - oFloat.offsetHeight){
						top = oMark.offsetHeight - oFloat.offsetHeight;
					}
					oFloat.style.left = left + 'px';
					oFloat.style.top = top + 'px';
					
					
					//滑块在小图的移动比例
					 let X = -left / (oMark.offsetWidth - oFloat.offsetWidth);
					let Y = -top / (oMark.offsetHeight - oFloat.offsetHeight);

					// //设置大图的坐标值
					oBigImg.style.left = - X * (oBigImg.offsetWidth - oBigPic.offsetWidth) + 'px';
					oBigImg.style.top = - Y * (oBigImg.offsetHeight - oBigPic.offsetHeight) + 'px';
				}


				/****四.点击加减号 库存数量加减******/
					//数量增加	
					// 一、点击加号，input中数量增加，右侧加载出来的商品数量也增加
					add();
					mis();
					function add(){
						$("#pro-quantity-plus").click(function(){
							// alert(1);
							 var oValue = Number($("#pro-quantity").val());
							 oValue++;
							 $("#pro-quantity").val(oValue);
						})
					}
					// 二、点击减号，数量减少
					function mis(){
						$("#pro-quantity-minus").click(function(){
							 var oValue = Number($("#pro-quantity").val());
							 oValue--;
							if(oValue<1){
								oValue = 1;
							}
							 $("#pro-quantity").val(oValue);
						})
					}



					// 五、选择颜色
					var aLis = $("#pro-skus #ul11 li");
					var datu = $("#datupian ul");
					var dtl = $("#datupian ul li");
					var xiaotu = $(".product-gallery-thumbs ul");
					var xtl = $(".product-gallery-thumbs ul li");
					aLis.click(function(){
					// 点击按钮，选择对应的颜色
					iNow = $(this).index();
					aLis.attr("class","").eq(iNow).attr("class","selected");

					// 选择颜色时，对应的大图片显示
					// datu.eq(iNow).css("display","block");
					datu.css("display","none").eq(iNow).css("display","block");
					dtl.eq(0).attr("class","active");
					// 同时对应小图显示
					xiaotu.css("display","none").eq(iNow).css("display","block");
					xtl.attr("class","").eq(iNow).attr("class","current");



					})
				
					

					// 六、选择版本
					var aLis2 = $("#pro-skus #ul22 li");
					aLis2.click(function(){
						iNow = $(this).index();
						aLis2.attr("class","").eq(iNow).attr("class","selected");

					})





		})


	}
	return{
		detail:detail
	}
})
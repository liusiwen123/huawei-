//华为注册页面js
define(['jquery'],function(){
	function register(){
		$(function(){
		// 1.手机号
		// var oInput1 = $(".content-2").find(".div2").find(".input1");
		$(".input1").blur(function(){
			var oInput1 = $(".input1").val();
			if(!oInput1){
				$(".p11").html("请输入手机号");
				$(".span11").css("display","block");
			}else if(oInput1.length !=11){
				// alert(1);
				$(".span11").css("display","block");
				$(".p11").html("手机号不正确");
			}else{
				$(".p11").html("输入正确");
			}
		})

		// 2.验证码
		$(".div3-2").html(textCode(4));
		$(".div3-2").click(function(){
			$(this).html(textCode(4));
		})
		//当输入框失去焦点验证验证码是否成功
			$('#input22').blur(function(){
				var str1 = $('.div3-2').html(); 
				var str2 = $('#input22').val();
				//将生成的验证码转为小写		
				str1 = str1.toLowerCase();
				//将输入的字符全部转为小写
				str2 = str2.toLowerCase();
				
				//判断验证码是否正确
				if(str2 == ""){
					$('.p22').html("请输入验证码");
					$('.div3-3').css('display' ,'block');
				}
				else if(str2 != str1) {
					$('.p22').html("输入错误");
					$('.div3-3').css('display' ,'block');
				}else{
					$('.p22').html("输入正确");
					$('.div3-3').css('display' ,'block');
				}
			})

		// 封装验证码函数
		function textCode(num){
			var arr = [];
			for (var i = 0; i < num; i++) {

				var newArr = parseInt(Math.random() * 100);
				if (newArr >= 0 && newArr <= 9) {
					arr.push(newArr);
				}else if (newArr >= 65 && newArr <= 90) {
					var str = String.fromCharCode(newArr);
					arr.push(str);
				}else if (newArr >= 17 && newArr <= 42) {
					str = String.fromCharCode(newArr + 80);
					arr.push(str);
				}else{
					i--;
				}
				
			}
			return arr.join("")
		}


		// 3.密码
		$(".input35").blur(function(){
			// 不能包含空格
			var oValue = $(".input35").val().replace(/ /ig,"");
			$(".input35").val = oValue;
			// 至少包含8个字符
			if(!oValue){
				$(".p44").html("不能包含空格");
			}else if(oValue.length < 8 || oValue.length > 32){
				$(".p44").html( "至少包含8个字符");
				// $(".div5-2").css("display","block");
			}else if(/\W/.test(oValue)){
				$(".p44").html("至少包含字母、数字、字符中的两种");
			}else{
				$(".p44").html("输入正确");
			}

		})

		// 4.确认密码
		$(".input44").blur(function(){
			var oValue1 = $(".input44").val();
			if(oValue1 != $(".input35").val()){
				$(".p45").html("两次密码输入不一致");
			}else{
				$(".p45").html("输入正确");
			}
		})

		// 5.点击注册，链接数据库
		$(".btn-reg").click(function(){
			 var str=`mobile=${$(".input1").val()}&password=${$(".input35").val()}`;
			$.ajax({
				method:"post",
				url:'php/register.php',
				 data:str,
				success:function(data){
					alert(data);
				},
				error:function(msg){
					alert(msg);
				}
			})
		})

	})
	}
	return {
		register:register
	}
})
	
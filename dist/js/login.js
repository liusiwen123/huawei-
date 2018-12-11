// 华为登录界面js
define(['jquery'],function($){
	function login(){
		$(function(){
		// 1.手机号
		// 失去焦点
		$(".input11").blur(function(){
			var oInput1 = $(".input11").val();
			if(!oInput1){
				$(".form-1-1").html("请输入手机号");
				$(".form-1-1").css("display","block");
			}
			else if(oInput1.length !=11){
				// alert(1);
				// $(".span11").css("display","block");
				$(".form-1-1").html("手机号不正确");
			}else{
				$(".form-1-1").html("输入正确");
			}
		})
		// 获取焦点
		$(".input11").focus(function(){
			$(".div111").css("display","none");
		})


		// 2.密码
		$(".input22").blur(function(){
			// 不能包含空格
			var oValue = $(".input22").val().replace(/ /ig,"");
			$(".input22").val = oValue;
			// 至少包含8个字符
			if(!oValue){
				$(".td22").html("不能包含空格");
			}else if(oValue.length < 8 || oValue.length > 32){
				$(".td22").html( "至少包含8个字符");
				// $(".div5-2").css("display","block");
			}else if(/\W/.test(oValue)){
				$(".td22").html("至少包含字母、数字、字符中的两种");
			}else{
				$(".td22").html("输入正确");
			}

		})
		// 获取焦点
		$(".input22").focus(function(){
			$(".div222").css("display","none");
		})



		// 3.点击登陆，链接数据库
		$(".button-login").click(function(){
			var str = `mobile=${$('.input11').val()}&password=${$('.input22').val()}`;
			$.ajax({
				method:"post",
				url:"php/login.php",
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
		login:login
	}
})
	
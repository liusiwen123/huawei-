<?php
	// 华为登录
	// 设置编码格式
	header('content-type:text/html;charset="utf-8"');
	/*
		$_POST 接受通过post请求所有的数据
	*/
	// 登录
	// 111.输出下载的数据
		// var_dump($_POST);
	// 2222.将手机号和密码取出
		$mobile = $_POST['mobile'];
		$password = $_POST['password'];

	// // 1.链接数据库
	$link = mysql_connect("localhost","root","123456");
	// 2.判断数据库是否链接成功
	if(!$link){
			echo '链接失败';
			exit;
	}
	// 3.设置字符集
	mysql_set_charset("utf8");
	// 4.选择数据库
	mysql_select_db("qd1805");

	// 登录
	/*
	判断是否登陆成功：
	1.手机号或密码错误
	2.手机号不存在
	3.登陆成功

	*/
	// 先判断手机号是否存在
	// 在数据库中查找用户名
	// 5.准备sql语句
	$sql = "select * from huawei where mobile= '{$mobile}'";
	// 6.发送sql语句
	$res = mysql_query($sql);
	// 7.处理结果
	$row = mysql_fetch_assoc($res);
	if(!$row){
		echo '手机号不存在';
	}else{
		// 手机号存在
		// 判断手机号或密码错误
		$sql = "select * from huawei where mobile='{$mobile}' AND password='{$password}'";
		$res = mysql_query($sql);
		$row = mysql_fetch_assoc($res);
		if($row){
			echo '登录成功';
		}else{
			// echo  $mobile ;
			echo '手机号或密码错误';
		}
	}



?>
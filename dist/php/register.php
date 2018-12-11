<?php
	// 注册界面
	//设置编码格式
	header('content-type:text/html;charset="utf-8"');
	/*
		$_POST 接受通过post请求所有的数据
	*/
	//注册
		// 1.输出下载的数据
	 // var_dump($_POST);
		// 2.将手机号和密码取出
		$mobile = $_POST['mobile'];
		$password = $_POST['password'];
	// 对密码做md5加密处理
	// $password = md5(md5($password).'qianfeng');

	// 1.链接数据库
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

	// 注册
		// 判断之前是否注册过
		// 通过用户名判断  查找
		// 5.准备sql语句
	$sql = "SELECT * FROM huawei WHERE mobile = '{$mobile}'";
	$res = mysql_query($sql);
	$row = mysql_fetch_assoc($res);
	if($row){
		echo "该手机号已被注册";
		exit;
	}else{
		// 注册成功
		// 插入数据
		$sql = "insert into huawei(mobile,password) values ('{$mobile}','{$password}')";
		$res = mysql_query($sql);
		if($res){
			echo "注册成功";
			exit;
		}else{
			echo "注册失败";
		}
	}
	//8、关闭数据库
	mysql_close($link);
		


?>
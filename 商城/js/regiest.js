window.onload=function(){
	let oPanel=document.getElementById('panel');
	let sUserName=oPanel.getElementsByClassName('regiest-username')[0];
	let sPsw=oPanel.getElementsByClassName('regiest-psw')[0];
	let iPhone=oPanel.getElementsByClassName('regiest-phone')[0]
	let oRL=oPanel.getElementsByClassName('dlogin')[0]
	let oCode=document.getElementById("code_input");
	let verifyCode = new GVerify("v_container");
	let usern=/^[a-zA-Z0-9]{8,16}$/;
	let passw=/^[a-zA-Z0-9]{6,12}$/;
	let telep=/^1[3|4|5|7|8][0-9]{9}$/;
	oRL.onclick=function(){
		var res = verifyCode.validate(oCode.value);
		var str1=sUserName.value.trim();
		var str2=sPsw.value.trim();
		var str3=iPhone.value.trim();
		if(usern.test(str1)){}
		else{
			alert('请正确输入账号')
			return;
		}
		if(passw.test(str2)){}
		else{
			alert('请按格式输入密码')
			return;
		}
		if(telep.test(str3)){}
		else{
			alert('请输入正确手机号码')
			return;
		}
		
		if(sUserName.value=='' || sPsw.value=='' || iPhone.value=='')
		{
			alert('请输入正确账号或密码')
			return;
		}
//		else{
//			if(r1!=null){
//				alert('r1');
//			}else{
//				alert('用户格式不正确');
//				return;
//			}
//			if(r2!=null){
//				alert('r2');
//		
//			}else{
//				alert('密码格式不正确');
//				return;
//			}
//			if(r3!=null){
//				alert('r3');
//	
//			}else{
//				alert('手机格式不正确');
//				return;
//			}
//		}
		if(!res){
			alert('验证码错误')
			return
		}
		var iUser=0;
		var user={}
		user.username=sUserName.value;
		user.passw=sPsw.value;
		user.phone=iPhone.value;
		user.goodNum='0';
		user.goods=[];
//		localStorage.clear()
//		localStorage.setItem('user',JSON.stringify(user))
//		var u=JSON.parse(localStorage.getItem('user'))
//		alert(u.username)
//		localStorage.clear()
//		console.log(localStorage.getItem('user0'))
		while(localStorage.getItem('user'+iUser)){
			iUser++;
		}
		var str='user'+iUser
		localStorage.setItem(str,JSON.stringify(user))
		sUserName.value="";
		sPsw.value="";
		iPhone.value="";
//		console.log(localStorage.getItem('user0'))
		alert('regiest succeed')
		localStorage.setItem('user',JSON.stringify(user))
		window.open('index.html',true)
//		console.log(JSON.parse(localStorage.getItem(str)).username)
//		console.log(JSON.parse(localStorage.getItem(str)).passw)
//		console.log(JSON.parse(localStorage.getItem(str)).phone)
	}
}

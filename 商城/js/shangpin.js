function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg); //匹配目标参数
	if(r != null) return unescape(r[2]);
	return null; //返回参数值
}
//接收URL中的参数booksId
function getshop_detail() {
	let oGood = {};
	let iNum = 0;
	var id = getUrlParam('shopId');
	var leixing = getUrlParam('leixing');
	$.ajax({
		type: 'get',
		async: false,
		url: 'data/' + leixing + '.json',
		dataType: 'json',
		success: function(res, status) {
			console.log(res)
			$.each(res.shop_detail, function(idx, val) {
				//根据id获取详情数据
				if(id == val.id) {
					for(var index in val) {
						oGood[index] = val[index];
					}
					var str = "<p>" + val.name_h2 + "</p><div class='shop-detail-box clear'><img src='" + val.zhong_url +
						"'/><div><h2>" + val.name_h2 + "</h2><h3>" + val.name_h3 + "</h3><span class='message'>" + val.name + "</span><p>价格：<span>" + val.price +
						"</span></p><input id='jiaru' class='shop-detail-buy' type='button' value='加入购物车'  style='color:#F22D00;background: #FFD9BC;border-color: #F0CAB6;' /><input class='shop-detail-buy' type='button' value='立即购买' style='color: white;background: #F22D00;border-color: #F22D00;' />";
					console.log('index:' + idx);
				}
				$('#shop-detail').append(str);
			});
		}
	});
	$('#footer').load('footer.html');
	if(!oGood.goodNum) {
		oGood.goodNum = 0;
	}
	let oBtn_buy = document.getElementsByClassName('shop-detail-buy');
	let oBuy_Car = null;
	console.log(JSON.parse(localStorage.getItem('user')));
	let user = JSON.parse(localStorage.getItem('user'));
	let bOn = false;
	//	alert(user.goodNum)
	//	console.log(oBtn_buy);
	//	alert(oBuy_Car)
	setTimeout(function() {
		oBuy_Car = document.getElementById('buyCar');
		oBuy_Car.innerHTML = '我的购物车(' + (JSON.parse(localStorage.getItem('user')).goodNum) + ')';
	}, 100)
//	console.log(JSON.parse(localStorage.getItem('user')).goods)
	oBtn_buy[0].onclick = function() {
		if(!localStorage.getItem('user')) {
			alert('请登录后再进行操作')
			return;
		}
		++user.goodNum;
		for(let i = 0; i < JSON.parse(localStorage.getItem('user')).goods.length; i++) {
			console.log(oGood.id == JSON.parse(localStorage.getItem('user')).goods[i].id && oGood.price == JSON.parse(localStorage.getItem('user')).goods[i].price)
			if(oGood.id == JSON.parse(localStorage.getItem('user')).goods[i].id && oGood.price == JSON.parse(localStorage.getItem('user')).goods[i].price) {
				user.goods[i].goodNum = user.goods[i].goodNum + 1;
				bOn = true;
				break;
			}
		}
		if(!bOn) {
			user.goods.push(oGood)
			user.goods[user.goods.length - 1].goodNum = user.goods[user.goods.length - 1].goodNum + 1;
		}
		//		alert(user.goods)
		//		oGood.goodNum=""
		//		user.Good={[oGood],1};
		localStorage.setItem('user', JSON.stringify(user));
		console.log(JSON.parse(localStorage.getItem('user')));
		oBuy_Car.innerHTML = '我的购物车(' + (JSON.parse(localStorage.getItem('user')).goodNum) + ')';

	}
	oBtn_buy[1].onclick = function() {
		let buyNow={};
		for(var i in oGood)
		{
			
			buyNow[i]=oGood[i];
//			localStorage.setItem('buynow',JSON.stringify(buyNow));
		}
		buyNow.goodNum++;
		localStorage.setItem('buynow',JSON.stringify(buyNow));
		let oPay=JSON.parse(localStorage.getItem('pay'));
		let oUser=JSON.parse(localStorage.getItem('user'));
		if(oPay)
		{
			oPay.goods.push(JSON.parse(localStorage.getItem('buynow')))
		}
		else{
			oPay={};
			for( let i in oUser)
			{
				oPay[i]=oUser[i];
			}
			oPay.goods.push(JSON.parse(localStorage.getItem('buynow')))
		}
		oUser.pay=oPay;
		localStorage.setItem('pay',JSON.stringify(oPay));
		localStorage.setItem('user',JSON.stringify(oUser));
		console.log(JSON.parse(localStorage.getItem('user')))
		console.log(JSON.parse(localStorage.getItem('pay')))
		console.log(JSON.parse(localStorage.getItem('buynow')))
		//加上数量！！！！！！-
		
		window.open('pay.html?pay=0')
	}
	texiao();
	function texiao() {
		/*var offset = $("#icon-cart").offset();*/
		var offset =600;
		console.log(offset);
		$("#jiaru").click(function(event) {
		
			var img = $(this).parent().children('img').attr('src'); //获取当前点击图片链接
			var flyer = $('<img class="flyer-img" src="' + img + '">'); //抛物体对象
			flyer.fly({
				start: {
					left: event.pageX, //抛物体起点横坐标
					top: event.pageY ////抛物体起点纵坐标
				},
				end: {
					left: offset.left + 10, //抛物体终点横坐标
					top: offset.top + 10, //抛物体终点纵坐标
				},
				onEnd: function() {
					$("#tip").show().animate({
						width: '200px'
					}, 300).fadeOut(500); //成功加入购物车动画效果
					this.destory(); //销毁抛物体
				}
			});
		});
	}

}

function getshangpin() {
	var leixing = getUrlParam('leixing');
	$.ajax({
		type: "get",
		async: false,
		url: 'data/' + leixing + '.json',
		dataType: "json",
		success: function(res) {
			var str = "<ul class=''>";
			console.log(res);
			$.each(res.shop_detail, function(idx, val) {
				str += "<li><a href='shop-detail.html?shopId=" + val.id + "&leixing=" + leixing + "' ><div class='box'><img src='" +
					val.xiao_url + "'/><div><div class='clear'><h4>" + val.price + "</h4><h5>" + Math.floor(Math.random() * (100 - 0 + 1) + 0) +
					"人付款</h5></div><p>" + val.name + "</p><span>" + val.address + "</span></a></li>";
			});
			str += "</ul>";
			$('.shangpin').append(str);
		},
		error: function() {
			alert(error)
		}
	});
	$('#footer').load('footer.html');
}
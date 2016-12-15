$(function() {

	function luckyDraw(serverData) {
		$("#run").rotate({
			duration: 3000,
			//转动时间 
			angle: 0,
			//默认角度
			animateTo: 360 * 6 + serverData.rotate,
			//转动角度 
			easing: $.easing.easeOutSine,
			callback: function() {
				alert(serverData.results);
				$("#btn_run").attr('disabled', false).css("cursor", "pointer");
			}
		});
	}

	var awardsList = [{
		id: 0,
		results: '很抱歉你没有中奖！',
		"isHasChance": "true",
		rotate: 30
	}, {
		id: 1,
		results: '哇！恭喜你中了一等奖！',
		"isHasChance": "false",
		rotate: 0
	}, {
		id: 2,
		results: '哇！恭喜你中了二等奖！',
		"isHasChance": "false",
		rotate: 235
	}, {
		id: 3,
		results: '哇！恭喜你中了三等奖！',
		"isHasChance": "false",
		rotate: 125
	}]

	function luckyDrawResult() {
		$.ajax({
			type: 'get',
			//这里写服务端的获奖结果函数
			url: '/getLuckyDraw/getServerResult',
			dataType: 'json',
			cache: false,
			error: function(result) {
				//没有server，把转盘结果写error事件里面：
				var lv = Math.floor(Math.random(4) * 4);
				var serverData = result.status == 404 ? awardsList[lv] : result.data;
				luckyDraw(serverData);
			},
			success: function() {
				return false;
			}
		});
	}

	$("#btn_run").click(function() {
		$("#btn_run").attr('disabled', true).css("cursor", "default");
		luckyDrawResult();
	});

});
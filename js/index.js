$(document).ready(function() {

	//切换登录注册
	$(document).delegate(".Login", "click", function() {
			$(this).addClass("btn-success").siblings(".register").removeClass("btn-success")
			$(".log-in").removeClass("hide");
			$(".regist-er").addClass("hide"); 
		})
		//切换登录注册
	$(document).delegate(".register", "click", function() {
		$(this).addClass("btn-success").siblings(".Login").removeClass("btn-success")
		$(".regist-er").removeClass("hide");
		$(".log-in").addClass("hide");
	})

	//验证邮箱
	$(document).delegate(".email", "blur", function() {
			var emailStr = $(this).val();
			var checkStr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			if(checkStr.test(emailStr)) {
				$(".emailError").addClass("hide")
			} else {
				$(".emailError").text("* 邮箱格式错误！").removeClass("hide")
			}
			var contrastr = JSON.parse(localStorage.getItem("arr"));
			for(var i=0;i<contrastr.length;i++){
				var thisItem = contrastr[i];
				var eStr = thisItem.split(",")[0];
				if(emailStr==eStr){
					$(".emailError").text("* 邮箱已被注册！").removeClass("hide")
				}
			}
		})
		//验证密码
	$(document).delegate(".reg-psd", "blur", function() {
			var psdStr = $(this).val();
			var checkStr = /^[a-zA-Z0-9]{6,10}$/;
			if(checkStr.test(psdStr)) {
				$(".psdError").addClass("hide")
			} else {
				$(".psdError").removeClass("hide")
			}
		})
		//再次验证密码
	$(document).delegate(".again-psd", "blur", function() {
			var psdStr = $(this).val();
			var checkStr = $(".reg-psd").val();
			if(checkStr == psdStr) {
				$(".againError").addClass("hide")
			} else {
				$(".againError").removeClass("hide")
			}
		})
		//提交
	$(document).delegate(".regBtn", "click", function() {
			var email = $(".email").val();
			var psd = $(".reg-psd").val();
			var contrastr = JSON.parse(localStorage.getItem("arr"));
			for(var i=0;i<contrastr.length;i++){
				var thisItem = contrastr[i];
				var eStr = thisItem.split(",")[0]
				if(email==eStr){
					$(".emailError").text("* 邮箱已被注册！").removeClass("hide");
					return;
				}
			}
			if(!$(".emailError").hasClass("hide") || !$(".psdError").hasClass("hide") || !$(".againError").hasClass("hide")||email==""||psd=="") {
				return;
			} else {
				var a = email+","+psd;
				var arr =JSON.parse(localStorage.getItem("arr"));
				arr.push(a)
				arr = JSON.stringify(arr);
				localStorage.setItem("arr",arr);
				$(".email").val("");
				$(".reg-psd").val("");
				$(".again-psd").val("");
				alert("注册成功")
			}
		})

		//邮箱登录checked
		$(document).delegate(".signBtn ", "click", function() {
			var E_Val = $(".emailLog").val();
			var Psd_Val = $(".emailPsd").val();
			var arrStr = localStorage.getItem("arr")
			var contrastr = JSON.parse(arrStr);
			if(arrStr=="[]"){
				$(".userError").text("* 该用户不存在！请核对用户名或者重新注册").removeClass("hide");
			}
			for(var i=0;i<contrastr.length;i++){
				var thisItem = contrastr[i];
				var eStr = thisItem.split(",")[0];
				var psd = thisItem.split(",")[1];
				if(E_Val==eStr){
					$(".userError").addClass("hide");
					if(Psd_Val==psd){
						alert("登录成功")
					}else {
						alert("密码错误")
					}
					return;
				}else {
					$(".userError").text("* 该用户不存在！请核对用户名或者重新注册").removeClass("hide");
				}
			}
			
		})

})
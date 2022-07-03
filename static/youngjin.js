/*영진님만 쓰는 js*/

$(document).ready(function() {
	popup_close()
});

function popup_on() {
	$("#popup_box").show();
	$("#popup_mask").fadeIn(100);
}

function popup_close() {
	$("#popup_box").hide();
	$("#popup_mask").fadeOut(100);
}

function popup_posting() {
	$.ajax({
		type: "POST",
		url: "/test",
		data: {sample_give: '데이터전송'},
		success: function (response) {
			alert(response['msg'])
			popup_close()
			window.location.reload()
		}
	})
}
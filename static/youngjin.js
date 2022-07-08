/*영진님만 쓰는 js*/

$(document).ready(function() {
	popup_close()
	review_get()
});

function popup_on(obj) {
	$('#popup_title').empty()
	let movie_title = $(obj).parent().children().first().text()
	$('#popup_title').append(movie_title)

	$("#popup_box").show();
	$("#popup_mask").fadeIn(100);
}

function popup_close() {
	$("#popup_box").hide();
	$("#popup_mask").fadeOut(100);
}

function popup_posting() {
	let name = $('#popup_title').text()
	let date = $('#date_select').val()
	let star = $('#popup_star').val()
	let comment = $('#popup_comment').val()

	$.ajax({
		type: "POST",
		url: "/reviews",
		data: {name_give: name, date_give: date, star_give: star, comment_give: comment},
		success: function (response) {
			alert(response['msg'])
			popup_close()
			window.location.reload()
		}
	})
}

function review_get() {
	$.ajax({
    type: "GET",
    url: "/reviews",
    data: {},
    success: function(response){
   		let popup_rows = response['reviews']
		for(let i = 0; i < popup_rows.length; i++) {
			let name = popup_rows[i]['name']
			let date = popup_rows[i]['date']
			let star = popup_rows[i]['star']
			let comment = popup_rows[i]['comment']

			let star_image = '⭐'.repeat(star)

			let temp_html = `<div class="card mb-3">
								<div class="row g-0">
									<div class="col-md-12">
										<div class="card-body">
											<h5 class="card-title">${name} <span class="card_date">${date}</span></h5>
											<p class="card-star">${star_image}</p>
											<p class="card-text">${comment}</p>
										</div>
									</div>
								</div>
							</div>`
			$('#review_div').append(temp_html)
		}
    }
  })
}
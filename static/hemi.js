
	$(document).ready(function () {
            getList();
        });
	function getList(){
		$.ajax({
			type: "GET",
			url: "/getList",
			data: {},
			success: function (response){
				let movies = response['movies'];
				for (let i = 0; i < movies.length; i++) {
					let movie = movies[i];
					let title = movie['title'];
					let text = movie['text'];
					let date = movie['date'];

					let temp_html = `<div class="row g-0">
							<div class="col-md-4">
								<img src="이미지"
									 class="img-fluid rounded-start" alt="포스터" style="max-height: 30vh;width: 20vw">
							</div>
							<div class="col-md-8">
								<div class="card-body">
									<h5 class="card-title">${title}</h5>
									<p class="card-text">
										${text}………
									</p>
									<p class="card-text"><small class="text-muted">${date} 개봉</small></p>
									<button onclick="popup_on()" type="button" class="btn btn-success" id="go_review">리뷰쓰기</button>
								</div>
							</div>
						</div>`
					$('#wish_div').append(temp_html)


				}
			}
		})
	}


	function getData(obj) {
		let img = $(obj).prev(".a"['src']).val();
		let title = $(obj).prev(".rank_wrap").children("[name=movie_title]").val();
		let text = $(obj).prev(".rank_wrap").children("[name=movie_text]").val();
		let date = $(obj).prev(".rank_wrap").children("[name=movie_date]").val();

		console.log(title, text, date)

		$.ajax({
			type: "POST",
			url: "/getList",
			data: { title_give : title, text_give : text, date_give : date, img_give : img},
			success: function (response){
				console.log(response)
				window.location.reload()
			}
		})
	}



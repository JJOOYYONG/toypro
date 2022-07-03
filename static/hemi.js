/*혜미님 만 쓰는 js*/

/*화살표 눌렀을때, input 정보 가져오기*/
function getData(obj){
	 let movie_title = $(obj).prev(".rank_wrap").children("[name=movie_title]").val();
	 let movie_text = $(obj).prev(".rank_wrap").children("[name=movie_text]").val();
	 let movie_date = $(obj).prev(".rank_wrap").children("[name=movie_date]").val();
}

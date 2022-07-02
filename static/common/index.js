/*프로젝트 공통으로 사용되는 js*/
$(document).ready(function (){
	slide();
})

//영화 이미지 슬라이드
function slide() {
	new Swiper('.swiper-container', {

		slidesPerView: 5, // 동시에 보여줄 슬라이드 갯수
		spaceBetween: 5, // 슬라이드간 간격
		slidesPerGroup: 5, // 그룹으로 묶을 수, slidesPerView 와 같은 값을 지정하는게 좋음


		loopFillGroupWithBlank: true,

		loop: true, // 무한 반복

		navigation: { // 네비게이션
			nextEl: '.next', // 다음 버튼 클래스명
			prevEl: '.prev', // 이번 버튼 클래스명
		},
	});
}

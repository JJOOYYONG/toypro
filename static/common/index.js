/*프로젝트 공통으로 사용되는 js*/
$(document).ready(function (){
	slide();
})

//영화 이미지 슬라이드
function slide() {
	new Swiper('.swiper-container', {
		slidesPerView: 'auto', // 동시에 보여줄 슬라이드 갯수
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

function getRankList(){
	let url = "http://www.cgv.co.kr/movies/?lt=1&ft=0";
	$.ajax({
		url :"/getRankList",
		type:"post",
		data:{"url" : url},
		success:function (response){
			console.log(response);
		}
	});
}

//getRankList()파이썬 여기다 붙여둠
// from flask import Flask, render_template, request, jsonify
// app = Flask(__name__)
//
// from pymongo import MongoClient
// import certifi
//
// ca = certifi.where()
// client = MongoClient('mongodb+srv://sparta:sparta@cluster0.vygyl.mongodb.net/?retryWrites=true&w=majority', tlsCAFile=ca)
// db = client.dbsparta
//
// import requests
// from bs4 import BeautifulSoup
//
// headers = {'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}
//
//
// @app.route('/')
// def home():
//    return render_template('index.html')
//
// @app.route('/getRankList',methods=['POST'])
// def RankList():
//    url_receive = request.form['url']
//
//    data = requests.get(url_receive, headers=headers)
//    soup = BeautifulSoup(data.text, 'html.parser')
//    list = soup.select("#contents > div.wrap-movie-chart > div.sect-movie-chart > ol > li")
//    array = []
//
//    for item in list:
//       title = item.select_one('div.box-contents > a > strong').text.strip()
//       rank = item.select_one('div.box-image > strong').text.strip()
//       img = item.select_one('div.box-image > a > span > img')['src']
//       date = item.select_one('div.box-contents > span.txt-info > strong').text.strip()
//
//       array.append({'title':title,'rank':rank,'img':img,'date':date})
//
//
//    return jsonify({'result': 'success', 'list':array})
//
// if __name__ == '__main__':
//    app.run('0.0.0.0', port=5000, debug=True)



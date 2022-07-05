/*원용님만 쓰는 js*/

$(document).ready(function () {
    getRankList();
});

function getRankList() {
    let url = "https://movie.daum.net/ranking/boxoffice/weekly";
    $.ajax({
        url: "/getRankList",
        type: "post",
        data: {"url": url},
        success: function (response) {

            let rows = response['list']
            for (let i = 0; i < rows.length; i++) {
                let img = rows[i]['img'];
                let title = rows[i]['title'];
                let text = rows[i]['text'];
                let date = rows[i]['date'];
                let rank = rows[i]['rank'];

                let temp_html = ``;
                //이미지 없는 영화는 png 이미지로 대체
                if(img =="NONE"){
                    temp_html = `<div class="slide_div">
                                      <img src="../static/img/no_img.png"alt="${title}" style="height: 316px;"/>
                                      <div class="rank_wrap">
                                      <p class="rank">${rank}</p>
                                      <span class="non_img_title">${title}</span>
                                      <input type="hidden" name="movie_title" value="${title}"/>
                                      <input type="hidden" name="movie_text" value="${text}"/>
                                      <input type="hidden" name="movie_date" value="${date}"/>
                                      </div><div class="hover_text" onclick="getData(this);">
                                      <i class="fa-solid fa-circle-arrow-up"></i>
                                      </div>
                                    </div>`
                }else{
                    temp_html = `<div class="slide_div">
                                      <img src="${img}"alt="영화이미지"/>
                                      <div class="rank_wrap">
                                      <p class="rank">${rank}</p>
                                      <input type="hidden" name="movie_title" value="${title}"/>
                                      <input type="hidden" name="movie_text" value="${text}"/>
                                      <input type="hidden" name="movie_date" value="${date}"/>
                                      </div><div class="hover_text" onclick="getData(this);">
                                      <i class="fa-solid fa-circle-arrow-up"></i>
                                      </div>
                                    </div>`
                }
                $('#slide').append(temp_html);
            }
            slide();
        }
    });
}

//영화 이미지 슬라이드
function slide() {
    $('#slide').slick({
        slidesToShow: 5,
        initialSlide:0,
        focusOnSelect: true,
        dots: false,
        nextArrow: $('.next'),
        prevArrow: $('.prev'),
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 1
                }
            }
        ]
    });
}





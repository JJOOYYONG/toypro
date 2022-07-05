/*원용님만 쓰는 js*/

    $(document).ready(function(){
         getRankList()
                    })

    function getRankList(){
        let url = "https://movie.daum.net/ranking/boxoffice/weekly";
        $.ajax({
            url :"/getRankList",
            type:"post",
            data:{"url" : url},
            success:function (response){
                console.log(response);
                $('#slide').empty()
                let rows = response['list']
                for (let i = 0; i < rows.length; i++) {
                    let img = rows[i]['img'];
                    console.log(img);
                    let title = rows[i]['title'];
                    let text = rows[i]['text'];
                    let date = rows[i]['date'];
                    let rank = rows[i]['rank']

                    let temp_html =`<div class="img-wrapper swiper-slide">
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
                $('#slide>.swiper-wrapper').append(temp_html)
                }
            }
        });
    }




from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

from pymongo import MongoClient
import certifi

ca = certifi.where()
client = MongoClient('mongodb+srv://test:sparta@cluster0.9qdtqor.mongodb.net/Cluster0?retryWrites=true&w=majority', tlsCAFile=ca)
db = client.dbsparta

import requests
from bs4 import BeautifulSoup

headers = {'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}


@app.route('/')
def home():
   return render_template('index.html')

#웹크롤링_원용
@app.route('/getRankList', methods=['POST'])
def RankList():
    url_receive = request.form["url"]

    data = requests.get(url_receive, headers=headers)
    soup = BeautifulSoup(data.text, 'html.parser')
    movies = soup.select('#mainContent > div > div.box_boxoffice > ol > li')
    array = []

    for movie in movies:
        title = movie.select_one('div > div.thumb_cont > strong > a').text
        date = movie.select_one('div > div.thumb_cont > span > span:nth-child(1) > span').text
        text = movie.select_one('div > div.thumb_item > div.poster_info > a').text[:150].strip()
        rank = movie.select_one('div > div.thumb_item > div.poster_movie > span.rank_num').text
        tag = movie.select_one('div.thumb_item > div.poster_movie > img')

        if tag is not None:
            img = tag["src"]
        else:
            img = "NONE"

        array.append({'title': title, 'date': date, 'text': text, 'img': img, 'rank': rank})

    return jsonify({'result': 'success', 'list': array})

# 위시리스트 저장_혜미
@app.route("/getList", methods=["POST"])
def list_post():
    title_receive = request.form['title_give']
    text_receive = request.form['text_give']
    date_receive = request.form['date_give']
    img_receive = request.form['img_give']

    doc = {
        'title': title_receive,
        'text': text_receive,
        'date': date_receive,
        'img': img_receive
    }
    db.getList.insert_one(doc)

    return jsonify({'msg': '이동 완료'})
# 위시리스트 호출 _ 혜미
@app.route("/getList", methods=["GET"])
def list_get():
    movie_list = list(db.getList.find({},{'_id':False}))
    return jsonify({'movies':movie_list})



if __name__=='__main__':
    app.run('0.0.0.0',post=5000,debug=True)
from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

from pymongo import MongoClient
import certifi

ca = certifi.where()
client = MongoClient('mongodb+srv://sparta:sparta@cluster0.vygyl.mongodb.net/?retryWrites=true&w=majority', tlsCAFile=ca)
db = client.dbsparta

import requests
from bs4 import BeautifulSoup

headers = {'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}


@app.route('/')
def home():
   return render_template('index.html')

@app.route('/getRankList', methods=['POST'])
def RankList():
    url_receive = request.form["url"]

    data = requests.get(url_receive, headers=headers)
    soup = BeautifulSoup(data.text, 'html.parser')
    movies = soup.select('#mainContent > div > div.box_boxoffice > ol > li')
    array = []

    for movie in movies:
        tag = movie.select_one('div.thumb_item > div.poster_movie > img')
        if tag is not None:
            title = movie.select_one('div > div.thumb_cont > strong > a').text
            date = movie.select_one('div > div.thumb_cont > span > span:nth-child(1) > span').text
            text = movie.select_one('div > div.thumb_item > div.poster_info > a').text[:140].strip()
            img = tag["src"]
            rank = movie.select_one('div > div.thumb_item > div.poster_movie > span.rank_num').text

            array.append({'title': title, 'date': date, 'text': text, 'img': img, 'rank': rank})

    return jsonify({'result': 'success', 'list': array})

if __name__=='__main__':
    app.run('0.0.0.0',post=5000,debug=True)
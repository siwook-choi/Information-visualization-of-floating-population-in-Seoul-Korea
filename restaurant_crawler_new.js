var enum_food = [
    { id: 1, name: "韓国料理" },
    { id: 2, name: "洋食" },
    { id: 3, name: "アジア料理" },
    { id: 4, name: "和食" },
    { id: 5, name: "中国料理" },
    { id: 6, name: "屋台料理" },
    { id: 7, name: "カフェ" },
    { id: 8, name: "バイキング" },
    { id: 9, name: "etc" }
];

var fs = require('fs');
var path = require('path');

filePath = path.join(__dirname, 'code.json');

data = fs.readFileSync(filePath, { encoding: 'utf-8' });

var name_list = JSON.parse(data);

var food_data = [];
var request_count = 0;
var chrome_count = 0;

var express = require('express');
var app = express();
var client_id = 'Dv6G4itHrbePj8BEGQVy';
var client_secret = 'b87uiwCm3X';
var api_url = 'https://openapi.naver.com/v1/search/local.json';


getData();
async function getData() {
    for (address of name_list) {
        var request = require('request');

        var options = {
            headers : {
                "X-Naver-Client-Id" : client_id,
                "X-Naver-Client-Secret" : client_secret
            },
            encoding: "utf-8",
            method : 'get',
            url : 'https://openapi.naver.com/v1/search/local.json',
            qs : {
              query : address["DO_NM"] + address["CT_NM"] + address["H_DNG_NM"] + " 한식",
              display : 30,
              start : 2,
              sort : "random"
            }
        }
        request(options, function(err, res, html){
            console.log(html);
        })
        break;

        /*
        var food_object = { 'id': address["H_DNG_CD"] };
        food_data.push(food_object);


        await request.get()
        */
    };
    return "done";
}
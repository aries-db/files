// ==UserScript==
// @name          4chan image download helper script
// @version       0.0.1.2026.03.24
// @match         https://boards.4chan.org/*
// @author        https://github.com/aries-db
// @description   download images from 4chan threads
// @downloadURL   https://github.com/aries-db/files/raw/refs/heads/main/firefox/vms-4chan-dl-helper.user.js
// ==/UserScript==

class mybestclass{

  posts_array = new Array;

  constructor(){
    console.log('4chan image download helper script -- script initiated successfully !')
    console.log('0.0.1.2026.03.24');
    this._fill_posts();

  }

   _fill_posts(){
     this.posts_array = document.querySelectorAll(".postContainer") ;
     console.log('found ' + this.posts_array.length + ' posts on this page');
  }
}

mbc = new mybestclass()

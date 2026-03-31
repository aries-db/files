// ==UserScript==
// @name          4chan image download helper script
// @version       0.0.0.2024.07.16
// @match         https://boards.4chan.org/*
// @author        https://github.com/aries-db
// @description   download images from 4chan threads
// @downloadURL   https://github.com/aries-db/files/raw/refs/heads/main/firefox/vms-4chan-dl-helper.user.js
// ==/UserScript==
// 7/16/2024, 10:12:15 AM
link_list = new Array;
old_list = new Array;
link_list.push('### ' + document.title);


window.abc = copyToClipboard;
window.download_as_file = download_as_file;

function download_as_file(){
  link_list.push('\n');
  download("4chan-aria-input-list-" + link_list.length + "-" + Date.now() + ".txt",link_list.join('\n'));
  show_message('file downloaded') ;
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text+'\n').then(function() {
    // document.title = 'YES! Async: Copying to clipboard was successful!' ;
    show_message('copied at ' + (x = new Date(), x.getHours()+':'+x.getMinutes() +':'+ x.getSeconds() ));
    show_message('Async: Copying to clipboard was successful!');
  }, function(err) {
    show_message('FFF OHNO! Async: Could not copy text: '+  err );
    show_message('Async: Could not copy text: ', err);
  });
}
function print_links() {
    document.write("<pre>");
    link_list.forEach((function(e) {
        document.write(e + '\n') ;
    }))
    document.write("<\pre>") ;
    document.title = 'links.done........................................' ;
}


document.querySelectorAll(".postContainer").forEach((function(e, n) {
    e.addEventListener("click", (function(event) {

      it = e.querySelector(".download-button");
      if (!it) return ;


      if (event.ctrlKey) {
        // Code to execute when Ctrl + Left Click occurs
        console.log('Ctrl + Left Click detected!');
        index = link_list.indexOf(it.href);
        if (index > -1) {
            link_list.splice(index, 1);
            show_message('- ' + it.href);
            it.style.filter = "opacity(1)";
            e.querySelector("input[type=checkbox]").checked = false ;
        }
       // event.preventDefault();
    } else {
        // Code to execute for a regular left click
        console.log('Regular Left Click detected.');
        if (link_list.indexOf(it.href) === -1) {
            link_list.push(it.href) ;
        }
        show_message('+ ' + it.href);
        it.style.filter = "opacity(0.3)";
        e.querySelector("input[type=checkbox]").checked = true ;
    }

    }))
}))
function show_message(message){
  document.dispatchEvent(new CustomEvent('CreateNotification', {
              detail: {
                type: 'info',
                content: message,
                lifetime: 1
              }
            }));

}

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

function save_backup(){
   if ( localStorage.getItem("lines") )
            old_list =  JSON.parse(localStorage.getItem("lines"));
    // old_list.push('# -- old');
    old_list = old_list.concat(link_list);
    localStorage.setItem("lines", JSON.stringify(old_list));
    document.title = 'saved ' + old_list.length.toString() + ' items';
}

document.addEventListener("keydown", (function(e) {
    if (113 == e.keyCode) { // f2 copy to clipbpard+show list
        copyToClipboard(link_list.join('\n'));
        // print_links();
        //link_list.push('\n');
        // save_backup();
    }
    if (115 == e.keyCode) { // f4 save file
      /* old f4
        copyToClipboard(link_list.join('\n'));
        link_list.push('\n');
        download("4cdn-" + Date.now() + ".txt",link_list.join('\n'));
      */
      save_backup() ;
    }
   if (119 == e.keyCode){ // f8 copy to cbd + clear
     copyToClipboard(old_list.join('\n'));
     old_list = [] ;
     document.title = 'cleated ' + old_list.length.toString() + ' items';
   }

/*
    if ( localStorage.getItem('lines') )
                old_list = localStorage.getItem('lines').split('|') ;
    link_list = old_list.concat(link_list) ;
    localStorage.setItem('lines',old_list.join('|'));
    */

}));

/*
 * old_array = localStorage.getItem('lines').split('\n') ;
 * combined = old_array.concat(link_list) ;
 *
 * */

//str.split("/").slice(0, -1).join("/")
// Start file download.



// https://www.toptal.com/developers/keycode
//
//
     // download(link_list, 'myfilename.txt', 'text/plain');
        // e.childNodes[1].style.backgroundColor = "rgb(183, 183, 185) "; // "#949af1"
        // document.querySelector('.navLinksBot').innerHTML+='<button value="links" onclick=print_links >sdfsdfsdf</button>'
//bottom_line = document.querySelector("div.navLinks:nth-child(3) > a:nth-child(4)").parentElement ;
// bottom_line = document.querySelector('.adl');
// aa = document.createElement('A');
// aa.innerText = "click here to download your file";
// aa.setAttribute('id', 'a');

// bb = document.createElement('button');
// bb.innerText = "Create file ";
// bb.onclick = "download(link_list, 'myfilename.txt', 'text/plain')"

// window.addEventListener('load', function() {

//     el = document.querySelector('#togglePostFormLink').parentElement.innerHTML;
//     el = '<a href="" id="a"> click here to download your file</a>' + '<button onclick="download(\'file text\', \'myfilename.txt\', \'text/plain\')">Create file</button>'

// }, false);
// function download(text, name, type) {
//     var a = document.getElementById("aa");
//     var file = new Blob([text], {
//         type: type
//     });
//     a.href = URL.createObjectURL(file);
//     a.download = name;
// }

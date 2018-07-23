window.onload = function() {
  // RANDOM WIKI
  document.getElementById('randomBtn').addEventListener('click', function() {
    // open blank window onclick to prevent popup blocker
    var randomWiki = window.open('', '_blank');
    
    var xhr = new XMLHttpRequest;
    xhr.open('GET', 'https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/wiki/Special:Random', true);
    //identifying user-agent per api
    // xhr.setRequestHeader('Api-User-Agent', 'wikiViewer');
    xhr.onload = function() {
      if (this.status == 200) {
        // set url of random wiki
        randomWiki.location.href = this.getResponseHeader('x-final-url');
      }
    };
    xhr.onerror = function(err) {
      console.log(err);
    } 
    xhr.send();
  });

  // SEARCH WIKIPEDIA
  document.getElementById('form').addEventListener('submit', function(e) {
    e.preventDefault();

    var xhr = new XMLHttpRequest;
    var q = document.getElementById('search').value;
    

    xhr.open('GET', 'https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&prop=info&inprop=url&origin=*&srlimit=30&srsearch=' + q, true);
    xhr.onload = function() {
      if (this.status == 200) {
        var response = JSON.parse(this.responseText);
        var data = response.query.search;
        console.log(data);
        var output = '';

        for (var i = 0; i <  data.length; i++) {
          output += '<ul><li>' + 
          '<h3>' + data[i].title + '</h3>' +
          '<p>' + data[i].snippet + '... &nbsp;' +
          '<a href="https://en.wikipedia.org/wiki?curid=' + data[i].pageid + '"target=-blank>Read more</a>' +
          '</p></li></ul>';
        }

        document.getElementById('wiki').innerHTML = output;

        // document.getElementById('wiki').addEventListener('click', function() {
        //   var url = 'https://en.wikipedia.org/wiki?curid=' + data[i].pageid;
        //   var openWiki = window.open('', '_blank');
          
        //   for (var i = 0; i < data.length; i++) {
        //   var openWiki = window.open('', '_blank');
        //   var url = 'https://en.wikipedia.org/wiki?curid=' + data[i].pageid;
          
        //   window.open('https://en.wikipedia.org/wiki?curid=' + data[i].pageid, '_blank');
        //   openWiki.location.href = 'https://en.wikipedia.org/wiki?curid=' + this.data[i].pageid;
        //   }
        // });
      }
    };
    xhr.onerror = function(err) {
      console.log(err);
    } 
    xhr.send();


  });

  // SEARCH WIKIPEDIA - jquery: not-working yet
  // $('#form').submit(function(e){
  //   e.preventDefault();
  //   var q = $('#search').value;
  //   $.ajax({
  //     url: 'https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php',
  //     data: {
  //         action: 'query',
  //         format: 'json',
  //         list: 'search',
  //         // srsearch: 'q',
  //     },
  //     datatype: 'jsonp',
  //     success: function (data) {
  //       console.log(data);
  //     }
  //   }); 
  // });

  
}
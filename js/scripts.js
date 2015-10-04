// https://www.googleapis.com/blogger/v3/blogs/35068669 self link de fragmentosargentinos
// AIzaSyAKXPP5xfNBjA_ZnJsIT5HdZhT7V0AqI90 mi API key

var API_KEY = 'AIzaSyAKXPP5xfNBjA_ZnJsIT5HdZhT7V0AqI90';
var BlogSelfId = '35068669';
var BlogInfoUri = 'https://www.googleapis.com/blogger/v3/blogs/byurl?url=http://fragmentosargentinos.blogspot.com.ar/&key=AIzaSyAKXPP5xfNBjA_ZnJsIT5HdZhT7V0AqI90';
var BlogPostsUri = 'https://www.googleapis.com/blogger/v3/blogs/' + BlogSelfId + '/posts?key=' + API_KEY;

$(document).ready(function () {

    var nextPageToken = "";
    
    function getPageData(page) {

        $.getJSON(page)

        .done(function (data) {

            nextPageToken = data.nextPageToken;

            for (var h = 0; h < data.items.length; h++) {

                $postHtml = $(data.items[h].content);

                function getTextNodesIn(node, includeWhitespaceNodes) {
                    var textNodes = [], nonWhitespaceMatcher = /\S/;

                    function getTextNodes(node) {
                        if (node.nodeType == 3) {
                            if (includeWhitespaceNodes || nonWhitespaceMatcher.test(node.nodeValue.replace(/(\r\n|\n|\r)/gm, ""))) {
                                textNodes.push(node);
                            }
                        } else {
                            for (var i = 0, len = node.childNodes.length; i < len; ++i) {
                                getTextNodes(node.childNodes[i]);
                            }
                        }
                    }

                    getTextNodes(node);
                    return textNodes;
                }

                var escribir2 = "";

                $.each($postHtml, function (i, item) {

                    if (item.tagName != "STYLE") {
                        texto = getTextNodesIn(item);
                        if (texto.length) {
                            var escribir = "";
                            for (var j = 0; j < texto.length; j++) {
                                escribir += texto[j].textContent;
                            }

                            //$('<li>', { text: i + ": " + escribir }).appendTo($('.round'));
                            escribir2 += escribir + " - ";
                        }
                    }
                });

                $('<li>', { text: h + ": " + escribir2 }).appendTo($('.round'));
            }
        });

        if (nextPageToken) {
            nextPage = BlogPostsUri + "&pageToken=" + nextPageToken;
            //getPageData(nextPage);
        }
    }

    getPageData(BlogPostsUri);

});
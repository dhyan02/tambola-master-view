usedNumList = [];
document.getElementById('number-generate').addEventListener('click', function() {
    console.log('dhyan');
    console.log(JSON.stringify(usedNumList));
    if (usedNumList.length == 90) {
        console.log('chand');
        alert("All numbers are used..!");
        return;
    }
    $('#previous-num-box').text($('#number-box').text());
    const currentNum = generateNum();
    if (!usedNumList.includes(currentNum)) {
        $('#number-box').numAnim({
            endAt: currentNum
        });
    }
    updateTable(currentNum);
});

function generateTable(){
    var body = document.body,
    // tbl  = document.createElement('table');
    tbl = document.getElementById('table1');
    tbl.style.width  = '200px';
    // tbl.style.border = '1px solid black';

    let num = 1;
    for(var i = 0; i < 9; i++){
        var tr = tbl.insertRow();
        for(var j = 0; j < 10; j++){
            var td = tr.insertCell();
            td.appendChild(document.createTextNode(num));
            num++;
        }
    }
    body.appendChild(tbl);
}
generateTable();

function generateNum () {
    var number = Math.random() * (90) + 1;
    number = Math.floor(number);
    while (usedNumList.includes(number)) {
        number = Math.random() * (90) + 1;
        number = Math.floor(number);
    }
    return number;
};

function updateTable(currentNum) {
    setTimeout(function() {
        rowNumber = getRowNumber(currentNum);
        colNumber = getColNumber(currentNum);
        var dummy = document.getElementById('table1').rows[parseInt(rowNumber)].cells;
        dummy[parseInt(colNumber)].style["background-color"] = "#85C1E9";
        dummy[parseInt(colNumber)].style["color"] = "blue";
        dummy[parseInt(colNumber)].style["font-weight"] = "bold";
    }, 700)
    
}

function getRowNumber(currentNum) {
    let m = currentNum/10;
    if (currentNum % 10 === 0)
        return (m-1);
    return m;
}

function getColNumber(currentNum) {
    let n = currentNum % 10;
    if (currentNum%10 === 0)
        return 9;
    return (n-1);
}

// For random number effect in jquery: https://stackoverflow.com/questions/8363916/random-number-effect-in-jquery
// Here, we are creating a new method 'numAnim' and this can be chained to the jQuery() function..
// (function($) {
    jQuery.fn.extend({
        numAnim: function(options) {
            if ( ! this.length)
                return false;

            this.defaults = {
                endAt: 100,
                endAtString: '100',
                numClass: 'autogen-num',
                duration: 0.7,   // seconds
                interval: 50  // ms
            };
            var settings = $.extend({}, this.defaults, options);

            var $num = $('<span/>', {
                'class': settings.numClass 
            });

            if (settings.endAt.toString().length === 1) {
                endAtString = settings.endAt.toString();
                endAtString = '0' + endAtString;
            } else {
                endAtString = settings.endAt.toString();
            }

            return this.each(function() {
                var $this = $(this);

                // Wrap each number in a tag.
                var frag = document.createDocumentFragment(),
                    numLen = settings.endAt.toString().length;
                for (x = 0; x < 2; x++) {
                    var rand_num = Math.floor( Math.random() * 10 );
                    frag.appendChild( $num.clone().text(rand_num)[0] )
                }
                $this.empty().append(frag);

                var get_next_num = function(num) {
                    ++num;
                    if (num > 9) return 0;
                    return num;
                };

                // Iterate each number.
                $this.find('.' + settings.numClass).each(function() {
                    var $num = $(this),
                        num = parseInt( $num.text() );

                    var interval = setInterval( function() {
                        num = get_next_num(num);
                        $num.text(num);
                    }, settings.interval);

                    setTimeout( function() {
                        clearInterval(interval);
                    }, settings.duration * 1000 - settings.interval);
                });

                setTimeout( function() {
                    // $this.text( settings.endAt.toString() );
                    $this.text(endAtString);
                    // $("#num-" + settings.endAt).addClass("generated");
                    usedNumList.push(settings.endAt);
                }, settings.duration * 1000);
            });
        }
    });
// })(jQuery);

// window.location.reload();
window.onbeforeunload = function() {
    return "Data will be lost if you leave the page, are you sure?";
}

document.getElementById('reload-board').addEventListener('click', function() {
    releaseTable();
});

document.getElementById('refresh-page').addEventListener('click', function() {
    window.location.reload();
});

function releaseTable(){
    for(var rowNumber = 0; rowNumber < 9; rowNumber++){
        for(var colNumber = 0; colNumber < 10; colNumber++){
            var dummy = document.getElementById('table1').rows[parseInt(rowNumber)].cells;
            dummy[parseInt(colNumber)].style["color"] = "black";
            dummy[parseInt(colNumber)].style["background-color"] = "#EEE";
        }
    }
    $('#number-box').text(00);
    $('#previous-num-box').text(00);
    usedNumList.length = 0;
};

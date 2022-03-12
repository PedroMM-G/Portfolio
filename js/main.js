//ninivert, September 2016

/*VARIABLES*/

canvas = document.getElementsByTagName('canvas')[0];
canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;

var ctx = canvas.getContext('2d');



/*Modify options here*/

//possible characters that will appear
var characterList = ['node.js', 'mysql', 'html', 'c#', 'c', 'java', 'pyspark', 'data', 'css', 'javascript', 'mvc', 'engenharia', 'informação', 'tableau', 'postman', 'talend', 'redes', 'android studio', 'hdfs', 'vps'];

//stocks possible character attributes
var layers = {
    n: 5, //number of layers
    letters: [120, 100, 80, 60, 40], //letters per layer (starting from the deepest layer)
    coef: [1, 0.8, 0.6, 0.4, 0.2], //how much the letters move from the mouse (starting from the deepest layer)
    size: [10, 12, 14, 16, 18], //font size of the letters (starting from the deepest layer)
    color: ['#5a5a5a', '#737373', '#808080', '#8d8d8d', '#a6a6a6'], //color of the letters (starting from the deepest layer)
    font: 'Courier New' //font family (of every layer)
};

/*End of options*/



var characters = [];
var mouseX = document.body.clientWidth / 2;
var mouseY = document.body.clientHeight / 2;

var rnd = {
    btwn: function (min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    },
    choose: function (list) {
        return list[rnd.btwn(0, list.length)];
    }
};



/*LETTER DRAWING*/

function drawLetter(char) {
    ctx.font = char.size + 'px ' + char.font;
    ctx.fillStyle = char.color;

    var x = char.posX + (mouseX - canvas.width / 2) * char.coef;
    var y = char.posY + (mouseY - canvas.height / 2) * char.coef;

    ctx.fillText(char.char, x, y);
}



/*ANIMATION*/

document.onmousemove = function (ev) {
    mouseX = ev.pageX - canvas.offsetLeft;
    mouseY = ev.pageY - canvas.offsetTop;

    if (window.requestAnimationFrame) {
        requestAnimationFrame(update);
    } else {
        update();
    }
};

function update() {
    clear();
    render();
}

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function render() {
    for (var i = 0; i < characters.length; i++) {
        drawLetter(characters[i]);
    }
}



/*INITIALIZE*/

function createLetters() {
    for (var i = 0; i < layers.n; i++) {
        for (var j = 0; j < layers.letters[i]; j++) {

            var character = rnd.choose(characterList);
            var x = rnd.btwn(0, canvas.width);
            var y = rnd.btwn(0, canvas.height);

            characters.push({
                char: character,
                font: layers.font,
                size: layers.size[i],
                color: layers.color[i],
                layer: i,
                coef: layers.coef[i],
                posX: x,
                posY: y
            });

        }
    }
}

createLetters();
update();



/*REAJUST CANVAS AFTER RESIZE*/

window.onresize = function () {
    location.reload();
};

document.getElementById('close').onclick = function () {
    this.parentElement.style.visibility = 'hidden';
    this.parentElement.style.opacity = '0';
}


$(window).load(function () {
    $(".trigger_popup_fricc").click(function () {
        $('.hover_bkgr_fricc').show();
    });
    $('.hover_bkgr_fricc').click(function () {
        $('.hover_bkgr_fricc').hide();
    });
    $('.popupCloseButton').click(function () {
        $('.hover_bkgr_fricc').hide();
    });
});

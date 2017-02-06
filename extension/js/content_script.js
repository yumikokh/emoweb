// クリックして適応
let $target = null;
let timer = null;
let clickFlg = true;
$(document).on('click', (ev) => {
    console.log(clickFlg, 'click')
    if (!clickFlg) return;
    clickFlg = false;
    chrome.runtime.sendMessage({
        from: 'content'
    });

    $target = $(ev.target);


    timer = setTimeout(() => {
        clearTimeout(timer);
        clickFlg = true;
    }, 1000);
})


// ポップアップから変更
let isInitial = true;
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.type == 'initial' && isInitial) {
        isInitial = false;
        const title = $('title').text();
        $('title').text('ようこそ！' + title + 'のホームページへ');
    }
    if (msg.from !== 'popup') return;

    const dice = Math.random();
    console.log(msg.type);

    switch (msg.type) {
        case 'link':
            $('a').removeClass().addClass('blue-link_emo');
            break;
        case 'marquee':
            if (dice > 0.3) {
                $target.wrap('<marquee />');
            } else if (dice > 0.6) {
                $target.wrap('<marquee behavior="alternate"/>');
            } else {
                $target.wrap('<marquee direction="up" />');
            }

            break;
        case 'counter':
            if ($target.hasClass('counter_emo')) return;
            const $counterDiv = $('<div />').addClass('counter_emo').html('<p>踏み逃げ禁止!!!  キリ番報告→<a href="http://www3.rocketbbs.com/601/yumikokh.html" target="_blank">■</a></p>')
            $target.append($counterDiv);
            break;
        case 'table':
            let tableClass = null;
            if (dice > 0.3) {
                tableClass = 'table1_emo';
            } else if (dice > 0.6) {
                tableClass = 'table2_emo';
            } else {
                tableClass = 'table3_emo';
            }
            const parent = $target.parent()[0].nodeName;
            if (parent == 'DL' || parent == 'UL' || parent == 'TABLE') {
                $target.parent().addClass(tableClass);
            } else {
                $target.addClass(tableClass);
            }
            break;
        case 'bg':
            $target.css('background', '');
            if (dice > 0.3) {
                $target.addClass('bg1_emo');
            } else if (dice > 0.6) {
                $target.addClass('bg2_emo');
            } else {
                $target.addClass('bg3_emo');
            }
            break;
        case 'rainbow':
            console.log('rainbow')
            makeRainbow($target);
            break;
        case 'access':
            const $a = $('<a />').addClass('access_emo').attr({ 'target': '_blank', 'href': 'http://www.ninja.co.jp/analyze/' });
            $('body').append($a);
            break;
        case 'small':
            $('*').addClass('small_emo');
            break;
        case 'banner':
            insertBanner($target);
            break;
        case 'clap':
          $target.append(`<form action="http://clap.webclap.com/clap.php?id=yumikokh" method="post" target="_blank" style="margin:0px;"><input type="submit" value="拍手ボタン" onclick="window.open('http://clap.webclap.com/clap.php?id=yumikokh','webclap','toolbar=no,location=no,directories=no,status=no,scrollbars=yes,resizable=yes');return false;"></form>`)
        break;
    }
})

const makeRainbow = ($target) => {
    const COLORS = [
        'red', 'orange', 'yellow', 'green', 'blue', 'navy', 'purple'
    ];
    $target.each(function(index) {
        var text = $(this).text();
        var html = "";
        for (var i = 0; i < text.length; i++) {
            html += "<span style='color: " + COLORS[i % COLORS.length] + "'>" + text[i] + "</span>";
        }
        $(this).html(html);
    });
}

const insertBanner = ($target) => {
    const $div = $('<div />').addClass('banner_emo');
    // const $frame = $('<div />');
    $target.append($div);
    let i = 20;
    let width = 31;
    const timer = setInterval(() => {
        if (i < 0) {
            clearInterval(timer);
        }
        width += 31;
        $div.width(width);
        i--;
        console.log(i)
    }, 30);


}

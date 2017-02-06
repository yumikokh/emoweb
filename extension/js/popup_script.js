const $submitBtn = $('#decoBtn');
const $decoList = $('#decoList');
let currentType = null;
const canWindowClick = () => {
    return !(currentType == 'link' || currentType == 'access' || currentType == 'small');
};

$decoList.on('change', (ev) => {
    $decoList.find('option').each(function(index) {
        if (this.selected) {
            currentType = this.value;
            console.log(currentType, 'currentType');
            return;
        }
    })
    if (!canWindowClick()) {
        showSubmitBtn();
    } else {
        hideSubmitBtn();
    }
})

// submitをおしてContentに送信
$submitBtn.on('click', (ev) => {
    if (!canWindowClick()) {
        chrome.tabs.query({ active: true }, (tab) => {
            chrome.tabs.sendMessage(tab[0].id, { from: 'popup', type: currentType });
        })
    }

});


// 最初だけ
let isInitial = true;
chrome.tabs.query({ active: true, currentWindow: true }, (tab) => {
    if (isInitial) {
        isInitial = false;
        chrome.tabs.sendMessage(tab[0].id, { from: 'popup', type: 'initial' });
    }
})

// リスナー
chrome.runtime.onMessage.addListener((msg, sender, adaptStyles) => {
    console.log(currentType, 'クリックされた')
    if (canWindowClick()) {
        chrome.tabs.query({ active: true }, (tab) => {
            chrome.tabs.sendMessage(tab[0].id, { from: 'popup', type: currentType });
        })
    }
})


////////////////////////////////////////////////

const showSubmitBtn = () => {
    $submitBtn.removeClass().text('みてみる');
}
const hideSubmitBtn = () => {
    $submitBtn.addClass('hide').text('画面をクリックしてね');
}

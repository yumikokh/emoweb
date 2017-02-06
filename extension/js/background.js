chrome.runtime.onMessage.addListener(function(msg, sender) {
    if (msg.from === 'content') {
        chrome.pageAction.show(sender.tab.id);
    }
});

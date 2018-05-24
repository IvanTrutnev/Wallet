
let currency = '';

chrome.runtime.onInstalled.addListener(function() {
  //prompt('Enter login', '');
});

chrome.runtime.onMessage.addListener(function(message, sender, reply) {
  alert(message.currency);
});
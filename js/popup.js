document.addEventListener('DOMContentLoaded', function() {
  const btn = document.getElementById('withdraw');
  const select = document.getElementById('dropdown-menu');
  select.addEventListener('click', function(e) {
    console.log('click')
    const currentBtn = e.target.innerText;
    const currency = document.getElementById('currency');
    currency.innerText = currentBtn;
    chrome.storage.local.set({'currency': currentBtn}, null);

    chrome.runtime.sendMessage({ undo: true })
  });
  btn.addEventListener('click', function() {
    console.log(window);
  });
});
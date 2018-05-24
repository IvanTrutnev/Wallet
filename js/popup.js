document.addEventListener('DOMContentLoaded', function() {
  const withdrawBtn = document.getElementById('withdraw');
  const depositBtn = document.getElementById('deposit');
  const closeBtn = document.getElementById('close-icon');

  const currencySelect = document.getElementById('dropdown-menu');
  const walletPopup = document.getElementById('wallet-popup');
  const depositPopup = document.getElementById('deposit-popup');

  let currentCurrency = 'USD';
  const currency = document.getElementById('currency');

  function getStorage() {
    chrome.storage.local.get(['currency'], function (result) {
      currency.innerText = result.currency;
      currentCurrency = result.currency;
    });
  }
  getStorage();

  currencySelect.addEventListener('click', function(e) {
    console.log('click');
    currentCurrency = e.target.innerText;

    currency.innerText = currentCurrency;
    chrome.storage.local.set({'currency': currentCurrency}, null);
  });

  withdrawBtn.addEventListener('click', () => {
    chrome.runtime.sendMessage({ currency: currentCurrency })
  });

  depositBtn.addEventListener('click', () => {
    document.body.setAttribute("style", "width: 750px; height: 550px;");
    walletPopup.setAttribute("style", "display: none");
    setTimeout(() => {
      depositPopup.setAttribute("style", "display: block");
    }, 150);

  });

  closeBtn.addEventListener('click', () => {
    document.body.setAttribute("style", "width: 400px; height: 300px;");
    depositPopup.setAttribute("style", "display: none");
    setTimeout(() => {
      walletPopup.setAttribute("style", "display: block");
    }, 150);
  })

});

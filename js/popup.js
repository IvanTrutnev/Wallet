const loadData = (url) => {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.send();
    xhr.addEventListener('load', () => {
      resolve(xhr.response);
    });
  })
};

let xmrValue = 4;

const fullPopup = "width: 750px; height: 550px;";
const hideElem = "display: none";
const showElem = "display: block";

document.addEventListener('DOMContentLoaded', function() {
  const withdrawOpenBtn = document.getElementById('open-withdraw');
  const depositOpenBtn = document.getElementById('open-deposit');
  const closeDepositBtn = document.getElementById('close-deposit-icon');
  const closeWithDrawBtn = document.getElementById('close-withdraw-icon');


  const currencySelect = document.getElementById('dropdown-menu');
  const walletPopup = document.getElementById('wallet-popup');
  const depositPopup = document.getElementById('deposit-popup');
  const withDrawPopup = document.getElementById('withdraw-popup');


  let currentCurrency = 'USD';
  const currency = document.getElementById('currency');

  const xmrValueElem = document.getElementById('xmr-value');
  xmrValueElem.innerText = `${xmrValue} xmr`;

  const conversionValueElem = document.getElementById('conversion-value');


  const conversionCurrency = () => {
    loadData(`https://min-api.cryptocompare.com/data/price?fsym=XMR&tsyms=${currentCurrency}`)
      .then((response) => {
        console.log(xmrValue * response[currentCurrency]);
        conversionValueElem.innerText = `${xmrValue * response[currentCurrency]} ${currentCurrency}`
      })
  };

  function getStorage() {
    chrome.storage.local.get(['currency'], function (result) {
      if(result.currency) {
        currentCurrency = result.currency;
      }
      currency.innerText = currentCurrency;
      conversionCurrency();
    });
  }
  getStorage();

  currencySelect.addEventListener('click', function(e) {
    console.log('click');
    currentCurrency = e.target.innerText;

    currency.innerText = currentCurrency;
    chrome.storage.local.set({'currency': currentCurrency}, null);

    conversionCurrency();
  });

  withdrawOpenBtn.addEventListener('click', () => {
    // chrome.runtime.sendMessage({ currency: currentCurrency })
    // var laserExtensionId = "coilccafplihcopikfcecekcbdjepeel";
    //
    // chrome.runtime.sendMessage(laserExtensionId, {getTargetData: true},
    //   function(response) {
    //     if (targetInRange(response.targetData))
    //       chrome.runtime.sendMessage(laserExtensionId, {activateLasers: true});
    //   });
    document.body.setAttribute("style", "width: 750px; height: 350px;");
    walletPopup.setAttribute("style", hideElem);
    setTimeout(() => {
      withDrawPopup.setAttribute("style", showElem);
    }, 250);
  });

  depositOpenBtn.addEventListener('click', () => {
    document.body.setAttribute("style", "width: 750px; height: 550px;");
    walletPopup.setAttribute("style", hideElem);
    setTimeout(() => {
      depositPopup.setAttribute("style", showElem);
    }, 250);
    // chrome.tabs.create({'url': chrome.extension.getURL('index.html'), "selected": true}, function(tab) {
    //   // Tab opened.
    // });
  });

  closeDepositBtn.addEventListener('click', () => {
    document.body.setAttribute("style", "width: 300px; height: 250px;");
    depositPopup.setAttribute("style", hideElem);
    setTimeout(() => {
      walletPopup.setAttribute("style", showElem);
    }, 250);
  });

  closeWithDrawBtn.addEventListener('click', () => {
    document.body.setAttribute("style", "width: 300px; height: 250px;");
    withDrawPopup.setAttribute("style", hideElem);
    setTimeout(() => {
      walletPopup.setAttribute("style", showElem);
    }, 250);
  });


});

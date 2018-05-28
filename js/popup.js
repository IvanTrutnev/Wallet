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

document.addEventListener('DOMContentLoaded', function() {
  const withdrawBtn = document.getElementById('withdraw');
  const depositBtn = document.getElementById('deposit');
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

  withdrawBtn.addEventListener('click', () => {
    // chrome.runtime.sendMessage({ currency: currentCurrency })
    // var laserExtensionId = "coilccafplihcopikfcecekcbdjepeel";
    //
    // chrome.runtime.sendMessage(laserExtensionId, {getTargetData: true},
    //   function(response) {
    //     if (targetInRange(response.targetData))
    //       chrome.runtime.sendMessage(laserExtensionId, {activateLasers: true});
    //   });
    document.body.setAttribute("style", "width: 750px; height: 550px;");
    walletPopup.setAttribute("style", "display: none");
    setTimeout(() => {
      withDrawPopup.setAttribute("style", "display: block");
    }, 250);
  });

  depositBtn.addEventListener('click', () => {
    document.body.setAttribute("style", "width: 750px; height: 550px;");
    walletPopup.setAttribute("style", "display: none");
    setTimeout(() => {
      depositPopup.setAttribute("style", "display: block");
    }, 250);

  });

  closeDepositBtn.addEventListener('click', () => {
    document.body.setAttribute("style", "width: 250px; height: 300px;");
    depositPopup.setAttribute("style", "display: none");
    setTimeout(() => {
      walletPopup.setAttribute("style", "display: block");
    }, 250);
  });

  closeWithDrawBtn.addEventListener('click', () => {
    document.body.setAttribute("style", "width: 250px; height: 300px;");
    withDrawPopup.setAttribute("style", "display: none");
    setTimeout(() => {
      walletPopup.setAttribute("style", "display: block");
    }, 250);
  });


});

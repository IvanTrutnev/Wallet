document.addEventListener('DOMContentLoaded', function() {
  const withDraw = document.getElementById('withdraw');

  withDraw.addEventListener('click', () => {
    alert('Your transaction is in progress');
  });
});

window.onload = function () {
  console.log('focus activating');
  document.querySelector('input').focus();
}

document.addEventListener('keypress', function (e) {
    if (e.isTrusted) {
      if (e.key === 'Enter') {
        document.querySelector('form').submit();
      }
    }
});

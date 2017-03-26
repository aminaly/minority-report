function beginSignUpFlow() {
  // company_name = document.getElementById('hero_desc')
  var signup = document.getElementById('creds');
  var button = document.getElementById('sign_up');
  var login = document.getElementById('log_in');

  signup.style.display = 'block';

  setTimeout(function() { // start a delay
    var text = document.getElementById('hero_desc');
    text.style.opacity = 1;
    var button = document.getElementById('sign_up');
    var login = document.getElementById('log_in');
    text.style.opacity = 1;
    var timerId = setInterval(function() { 
      var opacity = text.style.opacity;
      if (opacity == 0) {
        clearInterval(timerId);
        text.parentNode.removeChild(text);
        button.parentNode.removeChild(button);
        login.parentNode.removeChild(login);
      } else {
        text.style.opacity = opacity - 0.05;
        button.style.opacity = opacity - 0.05;
      }
    }, 1); // run every 0.1 second
  }, 0);
  setTimeout(function() { // start a delay
    var title = document.getElementById('main_landing');
    size = 100;
    title.style.height = size + 'vh';
    var timerId = setInterval(function() { 
      if (size == 10) {
        clearInterval(timerId);
      } else {
        size = size - 1;
        title.style.height = size + 'vh';
      }
    }, 1); // run every 0.1 second
  }, 0);

  setTimeout(function() { // start a delay
    var pad = document.getElementById('main_landing');
    padding = 80;
    pad.style.paddingBottom = padding + 'px';
    var timerId = setInterval(function() { 
      if (padding == 10) {
        clearInterval(timerId);
      } else {
        padding = padding - 1;
        pad.style.paddingBottom = padding + 'px';
      }
    }, 1); // run every 0.1 second
  }, 0);

  setTimeout(function() { // start a delay
    var comp = document.getElementById('comp_name');

    fontsize = 63;
    comp.style.fontSize = fontsize + 'px';
    var timerId = setInterval(function() { 
      if (fontsize == 36) {
        clearInterval(timerId);
      } else {
        fontsize = fontsize - 1;
        comp.style.fontSize = fontsize + 'px';

      }
    }, 1); // run every 0.1 second
  }, 0);
}
new p5((p) => {
  let input, button;

  p.setup = function() {
    p.createCanvas(400, 40);
    input = p.createInput();
    input.size(600, 20);
    input.position(20, 20);
    button = p.createButton('Procesar');
    button.size(80, 25);
    button.position(input.x + input.width, 20);
    button.mousePressed(sendText);
    const photoValue = getCookieValue("photo");
    input.value(photoValue);
  }

  function sendText() {
    let value = input.value();
    if (value != "") {
      const now = new Date();
      now.setTime(now.getTime() + 2 * 60 * 1000); // set expiration time 2 minutes from now
      const expires = "expires=" + now.toUTCString();
      document.cookie = "photo=" + input.value() + ";" + expires + ";path=/";

      window.location.reload();
    }
  }

  function getCookieValue(cookieName) {
    const cookies = document.cookie.split(";"); // split the cookie string into an array of cookies
    for (let i = 0; i < cookies.length; i++) {   // loop through the cookies array
      const cookie = cookies[i].trim();         // get the current cookie and remove any leading or trailing spaces
      if (cookie.startsWith(cookieName + "=")) {  // check if the cookie starts with the name we're looking for
        return cookie.substring(cookieName.length + 1, cookie.length);  // return the value of the cookie
      }
    }
    return "";  // return an empty string if the cookie is not found
  }
})
// <![CDATA[
var speed = 40; // lower number for faster
var flakes = 73; // number of flakes falling at a time
var untidy = 2; // how often do you want the flakes tidied up (high number is less often)
var sizes = 36; // maximum size of flakes in pixels
var colour = "#f7f7f7"; // colour of the snowflakes

/****************************\
*Winter Snow Flakes Effect #3*
*  (c)2013 mf2fm web-design  *
*  http://www.mf2fm.com/rv   *
* DO NOT EDIT BELOW THIS BOX *
\****************************/

var boddie;
var dx = new Array();
var xp = new Array();
var yp = new Array();
var am = new Array();
var dy = new Array();
var le = new Array();
var fs = new Array();
var flaky = new Array();
var swide = 480;
var shigh = 320;
var sleft = 0;
var starty = 0;
var offset = 0;
var tidying = 0;
var deeex = 0;
var has_focus = true;
var snowflakes = new Array(
  8727,
  10016,
  10033,
  10035,
  10036,
  10037,
  10038,
  10042,
  10043,
  10044,
  10045,
  10046,
  10051,
  10052,
  10053,
  10054,
  10055,
  10056,
  10057,
  10058,
  10059,
);
var ie_version =
  navigator.appVersion.indexOf("MSIE") != -1
    ? parseFloat(navigator.appVersion.split("MSIE")[1])
    : false;
var plow = document.createElement("img");
plow.src =
  "data:image/png;base64,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" +
  "SuQmCC";

function addLoadEvent(funky) {
  var oldonload = window.onload;
  if (typeof oldonload != "function") window.onload = funky;
  else
    window.onload = function () {
      if (oldonload) oldonload();
      funky();
    };
}

addLoadEvent(december_21);

function december_21() {
  if (document.getElementById) {
    var i;
    if (ie_version) {
      document.onfocusin = function () {
        has_focus = true;
      };
      document.onfocusout = function () {
        has_focus = false;
        sleft = 0;
      };
    } else {
      window.onfocus = function () {
        has_focus = true;
      };
      window.onblur = function () {
        has_focus = false;
        sleft = 0;
      };
    }
    window.onscroll = set_scroll;
    window.onresize = set_width;
    document.onmousemove = mouse;
    boddie = document.createElement("div");
    boddie.style.position = "fixed";
    boddie.style.bottom = "0px";
    boddie.style.left = "0px";
    boddie.style.width = "100%";
    boddie.style.overflow = "hidden";
    boddie.style.backgroundColor = "transparent";
    boddie.style.pointerEvents = "none";
    boddie.style.zIndex = "0";
    document.body.insertBefore(boddie, document.body.firstChild);
    set_width();
    plow.style.position = "absolute";
    plow.style.overflow = "hidden";
    plow.style.zIndex = 9999;
    plow.style.bottom = "0px";
    plow.style.left = "-144px";
    boddie.appendChild(plow);
    for (i = 0; i < flakes; i++) freeze_ice((Math.random() * shigh * 3) / 4);
    offset = 0;
    setInterval("winter_flakes()", speed);
  }
}

function freeze_ice(whyp) {
  starty++;
  offset++;
  var f, t;
  start_fall(starty, whyp);
  f = document.createElement("div");
  t = document.createTextNode(
    String.fromCharCode(snowflakes[starty % snowflakes.length]),
  );
  f.appendChild(t);
  t = f.style;
  t.color = colour;
  if (ie_version && ie_version < 10)
    t.filter = "glow(color=" + colour + ",strength=1)";
  else if (ie_version) t.boxShadow = "0px 0px 2x 2px " + colour;
  else t.textShadow = colour + " 0px 0px 2px";
  t.font = fs[starty] + "px sans-serif";
  t.position = "absolute";
  t.zIndex = 1000 + starty;
  t.top = yp[starty] + "px";
  t.left = xp[starty] + "px";
  t.lineHeight = fs[starty] + "px";
  flaky[starty] = f;
  boddie.appendChild(f);
}

function start_fall(i, whyp) {
  fs[i] = Math.floor(sizes * (0.25 + 0.75 * Math.random()));
  dx[i] = Math.random();
  am[i] = 8 + Math.random() * sizes * 0.75;
  dy[i] = 1 + Math.random() * 2;
  xp[i] = Math.random() * (swide - fs[i]);
  yp[i] = whyp - fs[i];
  le[i] = "falling";
}

function set_width() {
  var sw, sh;
  if (typeof window.innerWidth == "number" && window.innerWidth) {
    sw = window.innerWidth;
    sh = window.innerHeight;
  } else if (
    document.compatMode == "CSS1Compat" &&
    document.documentElement &&
    document.documentElement.clientWidth
  ) {
    sw = document.documentElement.clientWidth;
    sh = document.documentElement.clientHeight;
  } else {
    sw = document.body.clientWidth;
    sh = document.body.clientHeight;
  }
  if (sw && sh && has_focus) {
    swide = sw;
    shigh = sh;
  }
  boddie.style.height = shigh + "px";
}

function winter_flakes() {
  var i;
  var c = 0;
  for (i = 0; i < starty; i++) {
    if (flaky[i] && le[i] != "tidying") {
      if (yp[i] > shigh || xp[i] > swide || xp[i] < -fs[i]) {
        if (offset > 0) offset--;
        boddie.removeChild(flaky[i]);
        flaky[i] = false;
      } else if (yp[i] + offset / flakes < shigh - 0.7 * fs[i]) {
        yp[i] += dy[i];
        dx[i] += 0.02 + Math.random() / 20;
        xp[i] += deeex;
        flaky[i].style.top = yp[i] + "px";
        flaky[i].style.left = xp[i] + am[i] * Math.sin(dx[i]) + "px";
      } else if (le[i] == "falling") le[i] = "landed";
    }
    if (flaky[i] && le[i] == "falling") c++;
  }
  if (c < flakes) freeze_ice(0);
  if (offset > untidy * flakes && !tidying && Math.random() < 0.05)
    tidy_flakes();
}

function tidy_flakes() {
  var i;
  tidying = true;
  for (i = swide; i >= -146; i -= 2)
    setTimeout("plough(" + i + ")", speed * (swide - i));
  setTimeout("tidying=false; offset=0;", speed * (swide - i));
}

function plough(x) {
  var i, p;
  plow.style.left = x + "px";
  for (i = 0; i < starty; i++) {
    if (flaky[i] && le[i] != "falling") {
      p = xp[i] + fs[i] + am[i] * Math.sin(dx[i]) - dy[i];
      if (p < 0) {
        boddie.removeChild(flaky[i]);
        flaky[i] = false;
      } else if (p > x && p < x + 3.5) {
        le[i] = "tidying";
        xp[i] -= 2;
        if (Math.random() < 0.1) {
          yp[i]--;
          flaky[i].style.top = yp[i] + "px";
        }
        flaky[i].style.left = xp[i] + am[i] * Math.sin(dx[i]) + "px";
      } else if (p > x + 144 && yp[i] < shigh - 0.7 * fs[i]) {
        yp[i] += dy[i];
        dx[i] += 0.02 + Math.random() / 10;
        flaky[i].style.top = yp[i] + "px";
        flaky[i].style.left = xp[i] + am[i] * Math.sin(dx[i]) + "px";
      }
    }
  }
}

function set_scroll() {
  if (typeof self.pageXOffset == "number" && self.pageXoffset)
    sleft = self.pageXOffset;
  else if (document.body && document.body.scrollLeft)
    sleft = document.body.scrollLeft;
  else if (document.documentElement && document.documentElement.scrollLeft)
    sleft = document.documentElement.scrollLeft;
  else sleft = 0;
}

function mouse(e) {
  var x;
  if (e) x = e.pageX;
  else {
    x = event.x;
    set_scroll();
    x += sleft;
  }
  deeex = has_focus ? Math.floor(-1 + (3 * (x - sleft)) / swide) : 0;
}

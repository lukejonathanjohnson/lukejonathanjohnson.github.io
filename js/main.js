
var compArray = ["you're great", "you're an awesome friend",
 "wish I was more like you mate", "your family & friends are proud of you", "your outfit is dope",
"you are valued", "rate you highly", "any team would be lucky to have you",
"your potential is limitless", "you’re someone’s reason to smile", "you got this",
"you bring out the best in those around you"];
var homeArray = ['eep'];
var bubbleHeight = 30;
var vw = window.innerWidth;
var vh = window.innerHeight;
var width = 100;
var pad = 6;

var elastic = Elastic.easeOut.config(0.3, 0.3);

function choose(option) {
  if (option == 'home'){array = homeArray}
  if (option == 'comp'){array = compArray}

const rando = array[Math.floor(Math.random() * array.length)];
return rando;
}

function homeChoose(){
  const rando = choose('home');
  return rando
}

function compChoose(){
  const rando = choose('comp');
  return rando
}

function createBubble(option) {

  var element = document.createElement("div");
  document.body.appendChild(element);
  element.className = "bubble";
  //element.style.height = bubbleHeight + "px";
  element.textContent = choose(option);

  return {
    element: element,
    placed: false,
    width: width,
    height: bubbleHeight,
    left: 0,
    top: 0,
    right: width,
    bottom: bubbleHeight
  };

}

function createCompBubble(){
  createBubble('comp');
}

function createHomeBubble(){
  createBubble('home');
}

function placeBubble(bubble) {

  bubble.placed = true;
  bubble.width  = width;
  bubble.left   = randomInt(pad, vw - (bubble.width + pad));
  bubble.top    = randomInt(pad+(vh*0.1), vh - (bubble.height + pad) - (vh*0.3));
  bubble.right  = bubble.left + bubble.width;
  bubble.bottom = bubble.top  + bubble.height
}

function animateBubble(option) {
var bubble = createBubble(option)
placeBubble(bubble)

  TweenLite.set(bubble.element, {
    width: bubble.width,
    x: bubble.left,
    y: vh
  });

  var tl = new TimelineLite({ onComplete: placeBubble, onCompleteParams: [bubble] })
    .to(bubble.element, random(0.5, 2), { autoAlpha: 1, y: bubble.top, ease: elastic }, 0.1)
    .add("leave", "+=" + 1)
    .add(function() { bubble.placed = false; }, "leave") // When bubble is leaving, it is no longer placed
    .to(bubble.element, 1, { autoAlpha: 0, y: -vh }, "leave");
}

function animateHomeBubble(){
  animateBubble('home');
}

function animateCompBubble(){
  animateBubble('comp');
}


function randomInt(min, max) {
  if (max == null) { max = min; min = 0; }
  if (min > max) { var tmp = min; min = max; max = tmp; }
  return Math.floor(min + (max - min + 1) * Math.random());
}

function random(min, max) {
  if (max == null) { max = min; min = 0; }
  if (min > max) { var tmp = min; min = max; max = tmp; }
  return min + (max - min) * Math.random();
}

//after window is loaded completely
window.onload = function(){
  //hide the preloader
  $(".preloader").fadeOut(1000);
  setTimeout(() => {
    document.querySelector(".preloader").style.display = "none";
  }, 1000);
}

var pageHead = document.getElementsByClassName("page-head")[0]; //ottengo gli elementi che compongo la barra di navigazione della pagina
var threshold = pageHead.offsetHeight;
var pageNav = document.getElementsByTagName("nav")[0];
var navBarToggle = document.getElementById('navToggle');
var mobileNav = document.getElementById('mobileNav');
var pageContainers = document.getElementsByClassName('page-container');

window.addEventListener('scroll',function() {  //evento per il posizionamento della barra di navigazione dopo lo scrolling verso il basso
  var actualWidth = document.documentElement.clientWidth;
  console.log("Scrolling");
	var scrolled = window.pageYOffset;
  console.log(scrolled);
	if(scrolled >= threshold) { //se  si è superata la soglia di scrolling
        pageNav.style.position = 'fixed';
        pageNav.style.top = '0';
        pageNav.style.boxShadow = '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)';
        pageContainers[0].style.paddingTop = '60px';
        if(actualWidth > 720)  pageContainers[1].style.paddingTop = '60px';  //opzioni per il responsive design
  }
	else { //se non si è superata la soglia di scrolling
        console.log("Setting block");
        pageNav.style.position = 'unset';
        pageNav.style.boxShadow ='none';
          pageContainers[0].style.paddingTop = '20px';
          pageContainers[1].style.paddingTop = '20px';
      }
});

window.onresize = function() {
  var actualWidth = document.documentElement.clientWidth;
  if(actualWidth >= 720) mobileNav.style.display = 'none';
}

function toggleMenu(obj) {
    var hisSubMenu = obj.children[0];
    var state = hisSubMenu.style.display;
    if(state =='' || state== 'none') {
      hisSubMenu.style.display='block';
    } else {
      hisSubMenu.style.display='none';
    }
}

function toggleNav() {
  var state = mobileNav.style.display;
  if(state =='' || state== 'none') {
    mobileNav.style.display='block';
  } else {
    mobileNav.style.display='none';
  }
}

var hasSubMenus = document.getElementsByClassName('hasSubMenu');
for(var i = 0; i < hasSubMenus.length;++i) {
  var thisMenu = hasSubMenus[i];
  thisMenu.onclick = function() {toggleMenu(this);};
}

document.body.addEventListener('scroll',function(event){
    console.log(document.body.scrollTop);


});

navBarToggle.onclick = function() {toggleNav();}; // gestione dell'evento toggleNav

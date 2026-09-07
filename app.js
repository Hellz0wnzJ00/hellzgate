document.documentElement.classList.add('js');
var menuButton=document.querySelector('.burger');
var menu=document.querySelector('#main-menu');
if(menuButton && menu){
 function closeMenu(){
  menu.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded','false');
  menuButton.setAttribute('aria-label','Open navigation');
 }
 menuButton.addEventListener('click',function(){
  var open=menu.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded',String(open));
  menuButton.setAttribute('aria-label',open?'Close navigation':'Open navigation');
 });
 menu.querySelectorAll('a').forEach(function(link){link.addEventListener('click',closeMenu);});
 document.addEventListener('keydown',function(event){
  if(event.key==='Escape' && menu.classList.contains('is-open')){closeMenu();menuButton.focus();}
 });
 window.matchMedia('(min-width:901px)').addEventListener('change',closeMenu);
}
document.querySelectorAll('.shot img,.oled-card img').forEach(function(im){
function fail(){var w=im.closest('.shot,.oled-card'); if(w){im.style.display='none'; w.classList.add('imgph');}}
im.addEventListener('error', fail);
if(im.complete && im.naturalWidth===0) fail();
});

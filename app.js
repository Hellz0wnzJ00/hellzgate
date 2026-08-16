document.querySelectorAll('.shot img,.oled-card img').forEach(function(im){
function fail(){var w=im.closest('.shot,.oled-card'); if(w){im.style.display='none'; w.classList.add('imgph');}}
im.addEventListener('error', fail);
if(im.complete && im.naturalWidth===0) fail();
});

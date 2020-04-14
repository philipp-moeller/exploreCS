
function goToPage(num) {
	// display header only on first page
	document.getElementsByTagName('header').item(0).style.display = (num>0) ? 'none' : '';

	// move visible sections in viewport
	var main = document.getElementsByTagName('main').item(0);
	var columnGap = window.getComputedStyle(main,null).getPropertyValue('column-gap');
	var pageWidth = (parseInt(main.offsetWidth)+parseInt(columnGap))/2;
	for (section of main.children) {
		section.style.transform = 'translateX('+(-1)*num*pageWidth+'px)';
	}

	// display page-selector
	var footer = document.getElementsByTagName('footer').item(0);
	footer.innerHTML = '';

	var pageCount = Math.floor(main.scrollWidth/pageWidth);
	if (pageCount>num+1) {
		var next = document.createElement('a');
		next.className = 'next';
		next.setAttribute('href','#');
		next.onclick = function() { goToPage(num+2); return false; };
		footer.appendChild(next);
	}
	if (num>0) {
		var prev = document.createElement('a');
		prev.className = 'prev';
		prev.setAttribute('href','#');
		prev.onclick = function() { goToPage(num-2); return false; };
		footer.appendChild(prev);
	}
}

// inititalize book
if (typeof(drawExample)==='function') {
    drawExample();
}

goToPage(0);

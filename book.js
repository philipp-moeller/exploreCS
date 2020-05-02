
const LOREM = [
	'Lorem ipsum dolor sit amet, consectetur adipisici elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
	'Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.',
	'Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.',
	'Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.',
	'Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis.',
	'At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, At accusam aliquyam diam diam dolore dolores duo eirmod eos erat, et nonumy sed tempor et et invidunt justo labore Stet clita ea et gubergren, kasd magna no rebum. sanctus sea sed takimata ut vero voluptua. est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.',
	'Consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'
];

function loremIpsum(num) {
	var section = document.createElement('section');
	section.className = 'lorem-ipsum';
	var h2 = document.createElement('h2');
	var heading = LOREM[num%LOREM.length].split(' ').splice(num%13,Math.max(2,num%7)).join(' ');
	h2.textContent = heading.charAt(0).toUpperCase()+heading.slice(1);
	section.appendChild(h2);
	for (str of num.toString().split('')) {
		var p = document.createElement('p');
		p.textContent = LOREM[parseInt(str)%LOREM.length];
		section.appendChild(p);
	}
	return section;
}

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

	var left = document.createElement('span');
	left.className = 'page-number';
	left.textContent = '- '+(num+1)+' -';
	footer.appendChild(left);

	var right = document.createElement('span');
	right.className = 'page-number';
	right.textContent = '- '+(num+2)+' -';
	footer.appendChild(right);
}

// extend book if needed
var main = document.getElementsByTagName('main').item(0);
var firstSection = main.children.item(0);
if (main.getAttribute('data-before')!=null) {
	for (num of main.getAttribute('data-before').split(',')) {
		main.insertBefore(loremIpsum(parseInt(num)),firstSection);
	}
}
if (main.getAttribute('data-after')!=null) {
	for (num of main.getAttribute('data-after').split(',')) {
		main.appendChild(loremIpsum(parseInt(num)));
	}
}

// draw example if present
if (typeof(drawExample)==='function') {
    drawExample();
}

// draw closing icon if not present
var body = document.getElementsByTagName('body').item(0);
var closeable = false;
for (elem of body.children) {
	if (elem.className=='close')
		closeable = true;
}

if (!closeable) {
	var close = document.createElement('a');
	close.className = 'close';
	close.setAttribute('href','#');
	close.onclick = function() { window.history.back(); return false; };
	close.textContent = 'x';
	body.appendChild(close);
}

window.addEventListener('load',function() { goToPage(0); },false);

(function context() {
    'use strict';

    var DOM = {
        footer: document.getElementById('footer'),
        header: document.getElementById('header'),
        hammer: document.getElementById('hammer')
    };
    var RENDERED = {};

    RENDERED.barAction = nunjucks.render('_templates/bar-action.tpl.html', {});
    RENDERED.navAction = nunjucks.render('_templates/navbar.tpl.html', {});
    RENDERED.hammerAct = nunjucks.render('_templates/hammer.tpl.html', {});

    DOM.footer.innerHTML = RENDERED.barAction;
    DOM.header.innerHTML = RENDERED.navAction;
    DOM.hammer.innerHTML = RENDERED.hammerAct;

    var els = document.getElementById('elsHammer');
    var m = new Hammer(els);

	m.on('swipeleft swiperight swipeup swipedown', function (ev) {
		switch(ev.type) {
			case 'swipeleft':
				els.textContent = 'TO LEFT';
			break;
			case 'swiperight':
				els.textContent = 'TO RIGHT';
			break;
		}
	});

})();

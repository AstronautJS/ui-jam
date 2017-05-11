(function context() {
    'use strict';

    var DOM = {
        footer: document.getElementById('footer'),
        navbar: document.getElementById('navbar')
    };
    var RENDERED = {};


    RENDERED.barAction = nunjucks.render('_templates/bar-action.tpl.html', {});
    RENDERED.navAction = nunjucks.render('_templates/navbar.tpl.html', {});

    DOM.footer.innerHTML = RENDERED.barAction;
    DOM.navbar.innerHTML = RENDERED.navAction;
})();

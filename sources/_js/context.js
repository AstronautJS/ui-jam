(function context() {
    'use strict';

    var DOM = {
        footer: document.getElementById('footer'),
        header: document.getElementById('header')
    };
    var RENDERED = {};


    RENDERED.barAction = nunjucks.render('_templates/bar-action.tpl.html', {});
    RENDERED.navAction = nunjucks.render('_templates/navbar.tpl.html', {});

    DOM.footer.innerHTML = RENDERED.barAction;
    DOM.header.innerHTML = RENDERED.navAction;
})();

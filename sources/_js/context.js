(function context() {
    'use strict';

    var DOM = {
        header: document.getElementById('header'),
        footer: document.getElementById('footer')    
    };
    var RENDERED = {};

    
    RENDERED.barAction = nunjucks.render('_templates/bar-action.tpl.html', {});
    DOM.footer.innerHTML = RENDERED.barAction;
})();

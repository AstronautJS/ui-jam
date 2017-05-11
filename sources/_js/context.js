(function context() {
    'use strict';
    
    var FUNCTION = {};
    var RENDERED = {};
    var DOM = {
        header: document.getElementById('header'),
        mainContainer: document.getElementById('mainContainer'),
        btnReject: document.getElementById('btnReject'),
        btnAccept: document.getElementById('btnAccept')
    };
    var PAGESTATUS = {
        home: 'home',
        listCategory: 'listCategory'
    };
    var currentPage = 'home';


    //////////////////////////////////////////////////    
    
    
    FUNCTION.addCategoryInBar = function() {
        var hammerElement = document.getElementById('hammer');
        var hammerCategory = hammerElement.getAttribute('data-category');

		FUNCTION.renderCategoryBar(hammerCategory);
    };
    
    FUNCTION.renderCategoryBar = function(category) {
        console.log('#category', category);
        
        var scrollBar = document.getElementById('scrollBar');
        var categoryBarItem = nunjucks.render('_templates/place-bar-category.tpl.html', {});
        
        scrollBar.innerHTML += categoryBarItem;
    };
    

    //////////////////////////////////////////////////
    
    RENDERED.hammer = nunjucks.render('_templates/hammer.tpl.html', {});
    DOM.mainContainer.innerHTML = RENDERED.hammer;

    var hammer = new Hammer(DOM.mainContainer);
	hammer.on('swipeleft swiperight', function (ev) {
		switch(ev.type) {
			case 'swipeleft':
			    console.log('esquerda');
			break;
			case 'swiperight':
                FUNCTION.addCategoryInBar();
			break;
		}
	});


    /////////////////////////////////////////////////


    DOM.btnReject.addEventListener('click', function() {
        console.log('reject');
    });
    
    DOM.btnAccept.addEventListener('click', function() {
        console.log('accept');
        FUNCTION.addCategoryInBar();
    });

            
    DOM.header.addEventListener('click', function(e) {
        var element = e.target;
        var parentParent = element.parentNode.parentNode;
        
        if(parentParent.className === 'item-bar-category') {
            console.log('dale');
        }
    });

})();

(function context() {
    'use strict';
    
    var FUNCTION = {};
    var RENDERED = {};
    var DOM = {
        body: document.getElementById('body'),
        header: document.getElementById('header'),
        listCollection: document.getElementById('listCollection'),
        mainContainer: document.getElementById('mainContainer'),
        secondaryContainer: document.getElementById('secondaryContainer'),
        btnCancel: document.getElementById('btnCancel'),
        btnReject: document.getElementById('btnReject'),
        btnAccept: document.getElementById('btnAccept'),

        loginContent: document.getElementById('loginScreen'),
        btnEnter: document.getElementById('btnEnter'), 
    };
    var PAGESTATUS = {
        home: 'home',
        listCategory: 'listCategory'
    };
    var currentPage = 'home';


    //////////////////////////////////////////////////


    FUNCTION.setStatusPage = function(stats) {
        DOM.body.setAttribute('data-page', stats);
    };

    FUNCTION.getStatusPage = function() {
        return DOM.body.getAttribute('data-page');
    };
    
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


    FUNCTION.setStatusPage(PAGESTATUS.home);
    
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
    
    
    btnEnter.addEventListener('click', function() {
        $(DOM.loginContent).fadeOut();
        setTimeout(function(){
            DOM.loginContent.remove();
        }, 300);
    });


    DOM.btnCancel.addEventListener('click', function() {
        FUNCTION.setStatusPage(PAGESTATUS.home);

        DOM.mainContainer.classList.remove('display-none');
        DOM.secondaryContainer.classList.add('display-none');
    });

    DOM.btnReject.addEventListener('click', function() {
        console.log('reject');
    });
    
    DOM.btnAccept.addEventListener('click', function() {
        FUNCTION.addCategoryInBar();
    });

            
    DOM.header.addEventListener('click', function(e) {
        var element = e.target;
        var parentParent = element.parentNode.parentNode;
        var listRendered = nunjucks.render('_templates/place-list.tpl.html', {});

        if(parentParent.className !== 'item-bar-category') {
            return;
        }

        FUNCTION.setStatusPage(PAGESTATUS.listCategory);

        DOM.mainContainer.classList.add('display-none');
        DOM.secondaryContainer.classList.remove('display-none');

        DOM.listCollection.innerHTML = listRendered;
    });

})();

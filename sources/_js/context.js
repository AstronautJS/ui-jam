(function context() {
    'use strict';
    
    var FUNCTION = {};
    var RENDERED = {};
    var DOM = {
        body: document.getElementById('body'),
        header: document.getElementById('header'),
        footer: document.getElementById('footer'),
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
    var currentIndex = 1;
    var categoryResponse;


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

		FUNCTION.renderCategoryBar();
    };
    
    FUNCTION.renderCategoryBar = function() {
        var scrollBar = document.getElementById('scrollBar');
        var categoryBarItem = nunjucks.render('_templates/place-bar-category.tpl.html', categoryResponse[currentIndex - 1]);

        scrollBar.innerHTML += categoryBarItem;
    };
    

    //////////////////////////////////////////////////


    FUNCTION.setStatusPage(PAGESTATUS.home);

    var hammer = new Hammer(DOM.mainContainer);
    hammer.on('swipeleft swiperight', function (ev) {
		switch(ev.type) {
			case 'swipeleft':
                if(currentIndex > 10) {
                    return;
                }

                DOM.hammer.querySelector('.row[data-index="'+ currentIndex +'"]').remove();

                currentIndex++;
                
                if(DOM.hammer.querySelector('.row[data-index="'+ currentIndex +'"]')){
                    DOM.hammer.querySelector('.row[data-index="'+ currentIndex +'"]').style.display = 'block';
                }

			break;
			case 'swiperight':
                if(currentIndex > 10) {
                    return;
                }
                
                FUNCTION.addCategoryInBar();
                DOM.header.style.top = 0;
                
                DOM.hammer.querySelector('.row[data-index="'+ currentIndex +'"]').remove();

                currentIndex++;
                
                if(DOM.hammer.querySelector('.row[data-index="'+ currentIndex +'"]')){
                    DOM.hammer.querySelector('.row[data-index="'+ currentIndex +'"]').style.display = 'block';
                }
            break;
		}
	});

    http.get('category', function(response) {
        if(response.status === 'success') {
            categoryResponse = response.data;

            RENDERED.hammer = nunjucks.render('_templates/hammer.tpl.html', response);
            DOM.mainContainer.innerHTML = RENDERED.hammer;
            
            DOM.hammer = document.getElementById('hammer');
            DOM.hammer.querySelector('.row[data-index="'+ currentIndex +'"]').style.display = 'block';
        }
    });


    /////////////////////////////////////////////////
    
    
    btnEnter.addEventListener('click', function() {
        $(DOM.loginContent).fadeOut();
        
        setTimeout(function(){
            DOM.loginContent.remove();
        }, 300);
        
        DOM.footer.style.bottom = 0;
    });


    DOM.btnCancel.addEventListener('click', function() {
        FUNCTION.setStatusPage(PAGESTATUS.home);

        DOM.mainContainer.classList.remove('display-none');
        DOM.secondaryContainer.classList.add('display-none');
    });

    DOM.btnReject.addEventListener('click', function() {
        if(currentIndex > 10) {
            return;
        }

        DOM.hammer.querySelector('.row[data-index="'+ currentIndex +'"]').remove();

        currentIndex++;
        
        if(DOM.hammer.querySelector('.row[data-index="'+ currentIndex +'"]')){
            DOM.hammer.querySelector('.row[data-index="'+ currentIndex +'"]').style.display = 'block';
        }

    });
    
    DOM.btnAccept.addEventListener('click', function() {
        if(currentIndex > 10) {
            return;
        }

        FUNCTION.addCategoryInBar();
        DOM.header.style.top = 0;
        
        DOM.hammer.querySelector('.row[data-index="'+ currentIndex +'"]').remove();

        currentIndex++;
        
        if(DOM.hammer.querySelector('.row[data-index="'+ currentIndex +'"]')){
            DOM.hammer.querySelector('.row[data-index="'+ currentIndex +'"]').style.display = 'block';
        }
    });

            
    DOM.header.addEventListener('click', function(e) {
        var element = e.target;
        var parentParent = element.parentNode.parentNode;
        var listRendered;
        var id;

        if(parentParent.className !== 'item-bar-category') {
            return;
        }

        id = parentParent.id;

        http.get('place/' + id, function(response) {
            if(response.status === 'success') {
                listRendered = nunjucks.render('_templates/place-list.tpl.html', response);

                FUNCTION.setStatusPage(PAGESTATUS.listCategory);

                DOM.mainContainer.classList.add('display-none');
                DOM.secondaryContainer.classList.remove('display-none');

                DOM.listCollection.innerHTML = listRendered;
            }
        });
    });
})();

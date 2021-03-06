$(document).ready(function(){
	$('.flexslider').flexslider({
 	  animation: "slide",
    animationLoop: false,
    controlNav: false,
    directionNav: true,
    reverse: true,
    prevText: "",
    nextText: "",
    // slideshow: false,
    touch: false,
    // itemWidth: 300,
    // itemMargin: 20,
    // minItems: 1,
    // maxItems: 2
  });

	var getWindowSize = function() {
		return $(window).width();
	}

	// Store viewport width as a function
  // so it can be retrieved at any time
  var viewportWidth = function(){
    var width = $(window).width();
    return width;
  }

  // Is it a large screen?
  var isLarge = function(){
      return viewportWidth() >= 880  ? true : false;
  }

	/*****
   * Mobile Nav Toggle
  ******/
	var primaryNav = $('.primary-nav');
	var menuToggle = $('#menu-toggle');

	menuToggle.click(function(e){
    if (isLarge() == false){
      e.preventDefault();
      primaryNav.addClass('mobile-nav').toggle();
    }
  });

	var setMenuState = function(){
		if (isLarge()) {
			primaryNav.show().removeClass('mobile-nav');
		} else {
			primaryNav.hide().addClass('mobile-nav');
		}
	}

	setMenuState();

	$(window).resize(function(){
		setMenuState();
	});

  /*****
   * Toggle Search
  ******/
  var searchToggle = $('#search-toggle');
  searchToggle.click(function() {
    $('#utility').toggleClass('active');
		$('form#search input[type="text"]').focus();
  });

 /******
   * Filter products based on Product Type and Topic Type selection
   ******/

  // Define product elements
  var productType = $('#product-type'),
      topic       = $('#topic'),
      products    = $('.product');

  // Listen for change on product-type and topic selects
  productType.add(topic).change(function(){

    // Let's fish for this one since we are setting
    // the value on the change event
    var type  = $('#product-type').val();
    var topic = $('#topic').val();

    // If type and topic are all
    if (type === "all" && topic === "all") {

      // Show all products
      products.fadeIn();
    } else {

      //If not all types and topics loop over the products array
      for (var i=0; i<products.length; i++) {

        // If type and topic match an item
        if ($(products[i]).data("topic").toLowerCase().indexOf(topic) !== -1 && $(products[i]).data("type").toLowerCase().indexOf(type) !== -1) {
          $(products[i]).fadeIn();

          // If only topic matches an item
        } else if ( type === "all" && $(products[i]).data("topic").toLowerCase().indexOf(topic) !== -1) {
          $(products[i]).fadeIn();

          // If only type matches an item
        } else if ($(products[i]).data("type").toLowerCase().indexOf(type) !== -1 && topic === "all") {
          $(products[i]).fadeIn();

          // Hide items we don't need
        } else  {
          $(products[i]).fadeOut();
        }
      }
    }
  });


  // Enable the chosen plugin on .chosen-select
  $(".chosen-select").chosen({width: "80%"}).change(function(){
	    if (this.selectedIndex!==0) {
	      window.location.href = this.value;
	    }
  });

	/******
		* Populate newsletter sign up with email
		******/
		var newsletterEmail = window.location.search.replace('?email=', '').replace('%40', '@');
		$('#mce-EMAIL').attr('value', newsletterEmail);
});

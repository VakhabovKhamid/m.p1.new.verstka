(function($) {
	$.fn.tabs = function( body , colback = false){
		var boddy = $(body);
		var navs = $(this).find('a');
		navs.click(function(e){
			e.preventDefault();
			var id = $(this).attr('href');
			$(this).parent().addClass('active').parent().find('li').not($(this).parent()).removeClass('active');
			boddy.each(function(){
				$(this).hide();
			});
			$(body+id).show();
      if (colback) {
        colback();
      }
		});
	}
})(jQuery);


$.fn.hasAttr = function(name) {  
   return this.attr(name) !== undefined;
};

function showModal(modal) {
		modal.fadeIn();
		$('body').addClass('openModal');
	}
function hideModal(modal) {
	modal.fadeOut();
	$('body').removeClass('openModal');
}

$(document).ready(function(){

	$R('.textarea', {
		plugins: ['table', 'alignment', 'counter'],
    imageUpload: '/ajax/redactor/core/uploadImage/',
    fileUpload: '/ajax/redactor/core/uploadFile/'
	});

	$('.btnModal').click(function(e){
		e.preventDefault();
		var modal = $(this).attr('data-modal');
		if ($(modal).length > 0) {
			showModal($(modal));
		}else{
			console.log('Объект не найден!')
		}
	});
	$('.btnDropDown').click(function(e){
		e.preventDefault();
		var modal = $(this).attr('data-dropdow');
		if ($(modal).length > 0) {
			$(modal).toggleClass('show');
		}else{
			console.log('Объект не найден!')
		}
	});

	$('.modalWindowMask, .modalWindowClose').click(function(){
		hideModal($(this).parents('.modalWindow'));
	});

	$('#js-toggle-navBar').click(function(e){
		e.preventDefault();
		$('#mainWrap').toggleClass('js-short-navbar');
	});
	
	$('.styler').styler({
		selectSmartPositioning: false,
	});

	$('.js-datepicker').datepicker({
	  format: "dd.mm.yyyy",
	  language: "ru",
	  doneBtn: true
	});

	$('.js-datepicker-inline').datepicker({
	  format: "dd.mm.yyyy",
	  language: "ru",
	  doneBtn: false,
	  inputs: $('.range-start, .range-end')
	}).on('changeDate', changeDate);
  var minDate;
  var maxDate;
  var lastDate;
	function changeDate(e){
		var selected = new Date(e.date);
		if (!lastDate) {
			minDate = selected;
			maxDate = selected;
		}else{
			if (selected.getTime() < minDate.getTime()) {
				minDate = selected;
			}
			maxDate = selected;
		}
		$('#statisticInputDateRange .start').val(dateformat(minDate));
	  $('#statisticInputDateRange .end').val(dateformat(maxDate));
	  lastDate = new Date(e.date);
	}
	function dateformat(date) {
		var day = (date.getDate() < 10?'0'+date.getDate():date.getDate());
	  var month = (date.getMonth() < 10?'0'+date.getMonth():date.getMonth());
	  var year = date.getFullYear();
	  return day+'.'+month+'.'+year;
	}

	$('#statisticInputDateRange input').change(function(e){
		if ($(this).hasClass('start')) {
			var start = $(this).val();
			console.log(start);
			$('.js-datepicker-inline').datepicker('setDates', [new Date(start), new Date()]);
		}
	});

	$('.filterList label input').change(function(){
		if ($(this).prop('checked')) {
			$(this).parents('.filterList').addClass('checked');
		}else{
			$(this).parents('.filterList').removeClass('checked');
		}
		$(this).parents('.filterList').find('.styler').styler('refresh');
	});

	$('.mainNav a.dropDownItem').click(function(e){
		e.preventDefault();
		var nav = $(this).attr('href');
		if($(this).parent().hasClass('active')){
			$(nav).hide();
			$(this).parent().removeClass('active');
			$('#navMask').remove();
		}else{
			$(nav).show();
			$(this).parent().addClass('active');
			if (!$('#navMask').length) {
				var navMask = $('<div id="navMask"></div>');
				$('body').append(navMask);
				hideSubNav(navMask);
			}
		}
	});

	function hideSubNav(btn){
		btn.click(function(){
			$('.sumNavBar').hide();
			$('.mainNav a.dropDownItem').parent().removeClass('active');
			$('#navMask').remove();
		});
	}

	$('.field input').on('input', function(){
		var currentLen = $(this).parents('.field').find('.currentLength');
		if (currentLen.length) {
			var valLen = $(this).val().length;
			currentLen.text(valLen);
		}
	});

	$('.date_format').inputmask("00.00.0000");

	$(document).keyup(function(e) {
	  if (e.keyCode === 27){
	  	hideModal($('.modalWindow'));
	  }
	});

});
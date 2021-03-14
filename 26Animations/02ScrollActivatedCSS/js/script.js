$(document).ready(function(){
	$(window).scroll(function(event){
		var y = $(this).scrollTop();
		if (y>=300) {
			$('#first').addClass('animate');
			$('#third').addClass('animate');
		}else {
		 $('#first').removeClass('animate');
		 $('#third').removeClass('animate');
		}
	});
});
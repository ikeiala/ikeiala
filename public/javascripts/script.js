document.addEventListener('DOMContentLoaded', () => {

  console.log('IronGenerator JS imported successfully!');
  const log = document.getElementById(`logbutton`)
  const login = document.getElementById(`login`)
  const shadowed = document.getElementById("shadowed")
 
  const sign = document.getElementById(`signupbutton`)
  const signup = document.getElementById(`signup`)
  const searchYearDateInput = document.getElementById(`search-year-date-input`)

 
  const signup_loginbutton = document.getElementById("signup_loginbutton")
  const calendar = document.getElementById("v-cal")

  calendar.style.display = "none";

  searchYearDateInput.onclick = () => {
    if (calendar.style.display === "none"){
      calendar.style.display = "block";
    } else {
      calendar.style.display = "none";
    }
  }

  log.onclick = e => {
    e.preventDefault()
    login.style.display = "block"
    shadowed.style.display = "block"
  }
 
  sign.onclick = e => {
    e.preventDefault()
    login.style.display = "none"
    signup.style.display = "block"
  }

  signup_loginbutton.onclick = e => {
    e.preventDefault()
    signup.style.display = "none"
    login.style.display = "block"
  }

 }, false);

//Formularios de login y signup:

var right = $('.right');
var left = $('.left');
$('.r-btn').on('click', function(event){
		right.addClass('r-active');
		right.removeClass('r-inactive');
		/* right.css('top', '667px'); */
		right.css('transform', 'rotate(-31deg) translate(-650px, 115px)');
		right.css('transition', '0.4s ease-in-out');
		$(this).fadeOut(100);
		$('.r-disc').fadeOut(400);
		$('.l-btn').fadeIn(400);
		$('.l-disc').fadeIn(400);
		left.addClass('l-active');
		left.removeClass('l-inactive');
		left.css('transform', 'rotate(-31deg) translate(-60px, -184px)');
		left.css('transition', '0.4s ease-in-out');
});

$('.l-btn').on('click', function(event){
		right.addClass('r-inactive');
		right.removeClass('r-active');
		right.css('transform', 'rotate(-31deg) translate(-50px, 116px)');
		right.css('transition', '0.4s ease-in-out');
		$(this).fadeOut(100);
		$('.l-disc').fadeOut(400);
		$('.r-btn').fadeIn(400);
		$('.r-disc').fadeIn(400);
		left.addClass('l-active');
		left.removeClass('l-inactive');
		left.css('transform', 'rotate(-31deg) translate(-660px, -184px)');
		left.css('transition', '0.4s ease-in-out');
});

$(document).on('click', '.pass-view', function(event){
	var $open = $(this).children('.fa-eye');
	var $close = $(this).children('.fa-eye-slash');
	var $pass = $(this).siblings('.pass');
	if($open.is(':visible')){
		$close.show();
		$open.hide();
		$pass.attr('type', 'text');
	} else {
		$close.hide();
		$open.show();
		$pass.attr('type', 'password');
	}
});

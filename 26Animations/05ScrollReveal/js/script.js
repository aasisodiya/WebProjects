// Template Code Start
"use strict"
// Just for Fun!
console.log('%c Stop Right There! ', 'background: #222; color: orange;font-size:20px');
console.log('%c You Shall Not Pass! ', 'background: #222; color: red; font-size:40px');
// Template Code End

setTimeout(() => {
    $('#message').hide();
}, 5000);

$(window).scroll(function () {
    let documentHeight = $(document).height();
    let windowHeight = $(window).height();
    let scrollableDistance = documentHeight - windowHeight;
    let stepHeight = (scrollableDistance) / 8;
    // Why divide by 8? Because we have 4 containers in 1 window height and
    // the division by 8 helps us to calculate the mid of scroll for each container to display on
    var scroll = Math.ceil($(window).scrollTop());

    // Below code is to resolve android chrome issue
    if (navigator.userAgent.toLocaleLowerCase().toString().indexOf('android') > 0) {
        scroll += 57;
    }

    let activeIndex = Math.floor(scroll / stepHeight);
    // Below code allows for last element to stay visible when you scroll till end
    if (activeIndex == $('.container').length) {
        activeIndex = $('.container').length - 1;
    }
    // console.debug(
    //     "documentHeight:",documentHeight,
    //     "windowHeight:",windowHeight,
    //     "scrollableDistance:",scrollableDistance,
    //     "stepHeight:",stepHeight,
    //     "scroll:",scroll,
    //     "activeIndex:",activeIndex,
    //     "Math.floor(scroll / stepHeight):",Math.floor(scroll / stepHeight),
    //     "$('.container').length:",$('.container').length
    // );
    $('.leftcurtain').css({ left: 0 });
    $('.leftcurtain:eq(' + activeIndex + ')').css({ left: '-50vw' });
    $('.rightcurtain').css({ right: 0 });
    $('.rightcurtain:eq(' + activeIndex + ')').css({ right: '-50vw' });
})

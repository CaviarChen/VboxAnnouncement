const sections = ['announcement', 'timeline', 'images'];

function updateNavbar() {
    let id = window.location.hash.substr(1);
    $("[id^='nav-']").removeClass('active');
    $('#nav-'+id).addClass('active');
}

sections.forEach(function(sec) {
    var waypoints = $('#'+sec).waypoint(function(direction) {
        window.location.hash = this.element.id;
        updateNavbar();
    })
});

$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      let target = $(this.hash);
      let hash = this.hash.substr(1);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 500, function() {
            window.location.hash = hash;
            updateNavbar();
        });
      }
    }
  });
(function($){
  'use strict';
  
  $('.query').each(function(i, l){
    
    $(l).on('click', function(event) {
      event.preventDefault();
  
      var el = $(this),
        a = el.children('a'),
        t = el.children('textarea'),
        p = el.children('pre.response'),
        data = t && t.val() && t.val().indexOf('{') == 0 ? JSON.parse(t.val()) : '',
        method = a.attr('method'),
        path = a.attr('href');
  
      p.removeClass('error')
      p.html()
      $.ajax({
        method: method,
        url: path,
        data: data
      }).done(function( msg ) {
        p.html(JSON.stringify(msg));
      }).fail(function( jqXHR, textStatus ) {
        p.html(JSON.stringify(textStatus));
        p.addClass('error')
      });
      console.log(data)
      console.log(method)
      console.log(path)
    })
    
    
    
    
    
  })
  
})(jQuery)
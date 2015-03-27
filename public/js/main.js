$(document).ready(function() {
  console.log("ready!");

  form1 = $('.signup-form.form-1');
  form2 = $('.signup-form.form-2');
  form3 = $('.signup-form.form-3');

  function link(f1, f2, f) {
    var form = f1.find('form');
    form.validator().on('submit', function(event) {
      if (!event.isDefaultPrevented()) { 

        console.log("clicked!");

        f($(this),
          function() {
            f1.hide();
            f2.show();
          }, 
          function(textStatus, err) {
            form.find('.error-block').html("Could not submit form, error: " + err);
          });

        event.preventDefault();
      }
    });
  }

  link(form1, form2, signup);
  link(form2, form3, add_details);

  // GA buttons
  $('.fst-cta').click(function() {
    ga('send', 'event', 'button', 'click', 'first cta');
  });
  
  $('.snd-cta').click(function() {
    ga('send', 'event', 'button', 'click', 'second cta');
  });

  $('#signup-modal').on('show.bs.modal', function (e) {
    ga('send', 'event', 'modal', 'show');
  });

  $('#signup-modal').on('hide.bs.modal', function (e) {
    ga('send', 'event', 'modal', 'hide');
  });

  $('.facebook').click(function() {
    ga('send', 'event', 'button', 'click', 'facebook');
  });

  $('.twitter').click(function() {
    ga('send', 'event', 'button', 'click', 'twitter');
  });

});

function signup(form_data, success, error) {
  function wrapped_success() {
    ga('send', 'event', 'form', 'submit', 'first');
    success.apply(this, arguments);
  }
  $.ajax({ 
           url: '/ajax/signup',
           type: 'POST',
           cache: false, 
           data: form_data.serialize(), 
           success: wrapped_success, 
           error: function(jqXHR, textStatus, err){
               error(textStatus, err);
           }
        });
}

function add_details(form_data, success, error) {
  function wrapped_success() {
    ga('send', 'event', 'form', 'submit', 'second');
    success.apply(this, arguments);
  }
  $.ajax({ 
           url: '/ajax/add_details',
           type: 'POST',
           cache: false, 
           data: form_data.serialize(), 
           success: wrapped_success, 
           error: function(jqXHR, textStatus, err){
               error(textStatus, err);
           }
        });
}

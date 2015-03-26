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

  var selector = $('select.selector');
  if (!selector) {
    console.error("Could not find a selector.");
  }
  
  var selectables = $('.selectable')
    
  selectables.click(function() {
    var selectable = $(this);
    var select_id = selectable.data('select-id');
    if (!select_id) {
      console.error("Must specify a select-id for a selectable.");
    }

    toggle(selector, select_id);
  });

  selectables.each(function() {
    var selectable = $(this);
    var select_id = selectable.data('select-id');
    if (!select_id) {
      console.error("Must specify a select-id for a selectable.");
    }

    selector.change(function() {
      var selector = $(this);
      var vals = selector.val() || [];
      if (vals.indexOf(select_id) === -1) {
        selectable.removeClass('selected');
      } else {
        selectable.addClass('selected');
      }
      
      var other_cities = $(".other-cities");
      if (vals.indexOf("other") === -1) {
        other_cities.hide();
      } else {
        other_cities.show();
      }
    });
  });


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

function toggle(selector, select_id) {
  var vals = selector.val() || [];
  var i = vals.indexOf(select_id);
  if (i === -1) {
    vals.push(select_id);
  } else {
    vals.splice(i, 1);
  }
  selector.val(vals);
  selector.change();
}

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

var citynames = new Bloodhound({
  name: 'animals',
  local: [{ val: 'dog' }, { val: 'pig' }, { val: 'moose' }],
  remote: 'http://example.com/animals?q=%QUERY',
  datumTokenizer: function(d) {
    return Bloodhound.tokenizers.whitespace(d.val);
  },
  queryTokenizer: Bloodhound.tokenizers.whitespace
});
citynames.initialize();

$('#tag-input').tagsinput({
  typeaheadjs: {
    name: 'citynames',
    displayKey: 'name',
    valueKey: 'name',
    source: citynames.ttAdapter()
  }
});

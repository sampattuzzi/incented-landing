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

  $('.selectable').click(function() {
    var selectable = $(this);
    var select_id = selectable.data('select-id');
    if (!select_id) {
      console.error("Must specify a select-id for a selectable.");
    }
    var selector = $('select.selector');
    if (!selector) {
      console.error("Could not find a selector.");
    }
    if (selectable.hasClass('selected')) {
      var vals = selector.val();
      var i = vals.indexOf(select_id);
      vals.splice(i, 1) //Remove index i
      selector.val(vals);
  
      selectable.removeClass('selected');
    } else {
      var vals = selector.val() || [];
      vals.push(select_id);
      selector.val(vals);
      
      selectable.addClass('selected');
    }
  });
});

function signup(form_data, success, error) {
  $.ajax({ 
           url: '/ajax/signup',
           type: 'POST',
           cache: false, 
           data: form_data.serialize(), 
           success: success, 
           error: function(jqXHR, textStatus, err){
               error(textStatus, err);
           }
        });
}

function add_details(form_data, success, error) {
  $.ajax({ 
           url: '/ajax/add_details',
           type: 'POST',
           cache: false, 
           data: form_data.serialize(), 
           success: success, 
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

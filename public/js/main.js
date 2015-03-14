$(document).ready(function() {
  console.log("ready!");

  form1 = $('.signup-form.form-1');
  form2 = $('.signup-form.form-2');
  form3 = $('.signup-form.form-3');

  function link(f1, f2) {
    form = f1.find('form');
    form.validator().on('submit', function(event) {
      if (!event.isDefaultPrevented()) { 

        console.log("clicked!");
        f1.hide();
        f2.show();

        event.preventDefault();
      }
    });
  }

  link(form1, form2);
  link(form2, form3);

  $('.selectable').click(function() {
    selectable = $(this);
    if (selectable.hasClass('selected')) {
      selectable.removeClass('selected');
    } else {
      selectable.addClass('selected');
    }
  });
});

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

function serialize_object(form_selector) {
    var formdata = $(form_selector).serializeArray();
    var data = {};
    _.each(formdata, function(element){
    // Return all of the values of the object's properties.
      var value = _.values(element);
    // name : value 
      data[value[0]] = value[1];
    });
    return data;
}
function validate_item(json) {
    return _.every(_.values(json));
}
var items = [];

$(function() {
    var item_list_template = _.template(
        $("script#item_list_template").html()
    );
    var list_params = {
        items: items
    };
    $("div#container").append(item_list_template(list_params));

    $(document).on('click', 'button#add_item_submit', function (e) {
        var obj = serialize_object("form#item_add_form");
        var validated = validate_item(obj);
        console.log(obj);
        console.log(validated);
        if(validated) {
            items.push(obj);
            
        }
        return false;
    });
});

/*

var base_template_info;
    $.ajax({
        url: 'static/base_template.js',
        method: 'GET',
        contentType: 'text',
        mimeType: 'text/plain; charset=x-user-defined',
        success: function (data) {
            base_template_info = data;
        }
    });

//*/

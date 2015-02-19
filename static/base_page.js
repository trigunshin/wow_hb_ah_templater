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
    /*
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
    // */


    var Item = Backbone.Model.extend({
        idAttribute: '_id',
        urlRoot: "",
        /*
        schema: {
            item_id: 'Text'
        //}/*/
        schema: {
            item_id: 'Text',
            buy: {
                buyout: 'Text',
                amount: 'Text',
                additive: 'Text'
            },
            sell: {
                min_buyout: 'Text',
                max_buyout: 'Text',
                run_time: 'Text',
                stack_size: 'Text',
                ignore_stacks_below: 'Text',
                amount: 'Text',
                bid_percent: 'Text',
                undercut_percent: 'Text'
            }
        }
        //*/
    });
    var Items = Backbone.Collection.extend({
        model: Item,
        url: ""
    });
    var ItemInfoView = Backbone.Marionette.ItemView.extend({
        initialize: function() {
            this.listenTo(this.model, 'destroy', this.remove);
        },
        template: "#item_info_template",
        tagName: "div",
        className: 'item_info',
        events: {
            'click span#item_remove': 'removeItem'
        },
        removeItem: function() {
            console.log('removing item w/id:'+ this.model.get('item_id'));
            this.model.destroy();
        }
    });
    var ItemsView = Backbone.Marionette.CollectionView.extend({
        initialize: function() {
        },
        tagName: "div",
        childView: ItemInfoView,
        template: "#item_data_template"
    });


    var items = new Items([
        {
            item_id: 'abc123',
            buy: {
                buyout: '1g1s1c'
            }
        },
        {
            item_id: 'test',
            buy: {
                buyout: '1g1s1c'
            }
        }
    ]);
    var MyApp = new Backbone.Marionette.Application();
    MyApp.addRegions({
      mainRegion: "#content"
    });

    MyApp.addInitializer(function(options){
      var itemsView = new ItemsView({
        collection: options.items
      });
      MyApp.mainRegion.show(itemsView);
    });

    MyApp.start({items: items});
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

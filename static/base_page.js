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

$(function() {
    var Item = Backbone.Model.extend({
        idAttribute: '_id',
        urlRoot: "",
        schema: {
            item_id: 'Text',
            buy_buyout: 'Text',
            buy_amount: 'Text',
            buy_additive: 'Text',

            sell_min_buyout: 'Text',
            sell_max_buyout: 'Text',
            sell_run_time: 'Text',
            sell_stack_size: 'Text',
            sell_ignore_stacks_below: 'Text',
            sell_amount: 'Text',
            sell_bid_percent: 'Text',
            sell_undercut_percent: 'Text'
        }
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
        events: {
            'click button#btn_delete': 'delete_item',
        },
        delete_item: function(e) {
            this.model.destroy();
        }
    });
    var ItemsView = Backbone.Marionette.CompositeView.extend({
        tagName: "div",
        id: 'item_accordion',
        className: 'panel-group wat',
        attributes: {
            'role': 'tablist',
            'aria-multiselectable': 'true'
        },
        childView: ItemInfoView,
        template: "#item_data_template",
    });

    var ItemOutputView = Backbone.Marionette.ItemView.extend({
        initialize: function() {},
        template: "#item_output_template",
        tagName: "div",
        events: {}
    });

    var CreateItemView = Backbone.Marionette.ItemView.extend({
        initialize: function(starting_items) {
            this.currency_regex = /(\d+[Gg])?(\d{1,2}[Ss])?(\d{1,2}[Cc])?/;
            var validate_keys = _.keys(new Item().schema);
            // don't validate boolean field
            this.validate_keys = _.filter(validate_keys, function(k) {return k!=='buy_additive';});
        },
        template: "#item_add_template",
        tagName: "div",
        events: {
            'click button#add_item_submit': 'add_item'
        },
        field_is_not_blank: function(attributes, field) {
            return (attributes[field] && attributes[field].length > 0);
        },
        show_failed_validation: function(field_id) {
            $('div#'+field_id).addClass('has-error');
        },
        validate_item: function(item) {
            // for each field, check that the attributes value isn't blank
            //var greediest_match = item.attributes.buy_buyout.match(this.currency_regex);
            //console.log(greediest_match[0]);

            // clear prior validation
            _.each(this.validate_keys, function(key) {$('div#'+key).removeClass('has-error');});

            var not_blank = _.partial(this.field_is_not_blank, item.attributes, _);
            var failed_fields = _.reject(this.validate_keys, not_blank);
            _.each(failed_fields, this.show_failed_validation);

            return failed_fields.length === 0;
        },
        add_item: function(e) {
            var form_data = serialize_object('form#item_add_form');

            if(form_data.buy_additive === 'on') {
                form_data.buy_additive = "True";
            } else {
                form_data.buy_additive = "False";
            }

            var cur_item = new Item(form_data);
            if(this.validate_item(cur_item)) {
                items.push(cur_item);
            }
            e.preventDefault();
        }
    });

    var items = new Items([{
        item_id: 'item_id',
        buy_buyout: 'buy_buyout',
        buy_amount: 'buy_amount',
        buy_additive: 'True',

        sell_min_buyout: 'sell_min_buyout',
        sell_max_buyout: 'sell_max_buyout',
        sell_run_time: 'sell_run_time',
        sell_stack_size: 'sell_stack_size',
        sell_ignore_stacks_below: 'sell_ignore_stacks_below',
        sell_amount: 'sell_amount',
        sell_bid_percent: 'sell_bid_percent',
        sell_undercut_percent: 'sell_undercut_percent'
    }]);
    var MyApp = new Backbone.Marionette.Application();
    MyApp.addRegions({
      item_output: "#item_output_anchor",
      item_list: "#item_list_anchor",
      item_add_form: '#item_add_form_anchor'
    });

    MyApp.addInitializer(function(options){
      var itemsView = new ItemsView({
        collection: options.items
      });
      MyApp.item_list.show(itemsView);

      var createView = new CreateItemView();
      MyApp.item_add_form.show(createView);

      var outputView = new ItemOutputView();
      MyApp.item_output.show(outputView);
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

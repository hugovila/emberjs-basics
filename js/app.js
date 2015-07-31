/*global alert */

var Ember, App;

App = Ember.Application.create();

App.friends = [
    { id: 1, firstName: "John", lastName: "", about: "Funny" },
    { id: 2, firstName: "Mary", lastName: "", about: "Smart" },
    { id: 3, firstName: "Henry", lastName: "", about: "Kind" }
];

App.Router.map(function () {
    // put your routes here
    'use strict';
    this.route('about'); /* AboutRoute, AboutController, AboutView, about */
    this.route('contact');

    this.resource('friends', function () {
        this.resource('issues');
        this.route('about', {path: "/:friends_id/about"});
        this.route('new');
    });

    this.resource('failures', function () {
        this.route('details');
    });
});

App.IndexRoute = Ember.Route.extend({
    model: function () {
        'use strict';
        return ['red', 'yellow', 'blue', 'orange'];
    }
});

App.FriendsRoute = Ember.Route.extend({
    model: function () {
        'use strict';
        return App.friends;
    }
});

App.FriendsIndexRoute = Ember.Route.extend({
    model: function () {
        'use strict';
        return ['Pedro', 'Mateo', 'Juan', 'Lucas', 'José'];
    }
});

App.FriendsAboutRoute = Ember.Route.extend({
    model: function (params) {
        'use strict';
        return App.friends.findBy('id', parseInt(params.friends_id, 10));
    }
});

App.FriendsNewRoute = Ember.Route.extend({
    model: function () {
        'use strict';
        return {id: App.friends.length + 1, firstName: "", lastName: "", about: ""};
    }
});

App.FriendsNewController = Ember.Controller.extend({
    needs: 'friends',
    isInvalid: true,

    validForm: function () {
        'use strict';
        if (this.get('model.firstName') !== "" && this.get('model.lastName') !== "") {
            this.set('isInvalid', false);
        } else {
            this.set('isInvalid', true);
        }
    }.observes('model.firstName', 'model.lastName'),

    isBombon: 'Chocolate',
    actions: {
        create: function () {
            'use strict';
            var newFriend = Ember.copy(this.model);
            this.get('controllers.friends').addObject(newFriend);
            this.transitionToRoute('friends');
        }
    }
});

App.FailuresIndexRoute = Ember.Route.extend({
    model: function () {
        'use strict';
        return ['Pedro', 'Santiago', 'Andrés', 'Juan', 'Felipe', 'Bartolomé', 'Tomás', 'Mateo', 'Simón', 'Matías'];
    }
});

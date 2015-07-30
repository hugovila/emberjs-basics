var Ember, App;

App = Ember.Application.create();

App.friends = [
    { id: 1, name: "John", about: "Funny" },
    { id: 2, name: "Mary", about: "Smart" },
    { id: 3, name: "Henry", about: "Kind" }
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
    },
    actions: {
        create: function () {
            'use strict';
            alert('Hi');
        }
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
        return {firstName: "", lastName: "", about: ""};
    }
});

App.FriendsNewController = Ember.ObjectController.extend({

});

App.FailuresIndexRoute = Ember.Route.extend({
    model: function () {
        'use strict';
        return ['Pedro', 'Santiago', 'Andrés', 'Juan', 'Felipe', 'Bartolomé', 'Tomás', 'Mateo', 'Simón', 'Matías'];
    }
});

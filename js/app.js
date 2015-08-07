/*global alert, console */

var Ember, App, DS;

App = Ember.Application.create();

App.ApplicationAdapter =  DS.RESTAdapter.extend({
    host: 'http://localhost:4567'
});

App.Friend = DS.Model.extend({
    firstName: DS.attr(),
    lastName: DS.attr(),
    about: DS.attr('string'),
    best: DS.attr('boolean'),
    birthday: DS.attr('date'),

    age: function () {
        'use strict';
        var birth = this.get('birthday'),
            today = new Date(),
            age = today.getFullYear() - birth.getFullYear(),
            month = today.getMonth() - birth.getMonth();
        if (month < 0 || (month === 0 && today.getDate() - birth.getDate())) { age = age - 1; }
        return age;
    }.property('birthday')
});

// App.friends = [
//     App.Friend.create({ id: 1, firstName: "John",  lastName: "", best: true,  birthday: new Date('1982-06-21'), about: "Funny" }),
//     App.Friend.create({ id: 2, firstName: "Mary",  lastName: "", best: true,  birthday: new Date('1982-06-21'), about: "Smart" }),
//     App.Friend.create({ id: 3, firstName: "Henry", lastName: "", best: false, birthday: new Date('1982-06-21'), about: "Kind"  })
// ];

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
        return this.store.find('friend'); /* GET /friends */
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
        return this.store.find('friend', params.friend_id);
    }
});

App.FriendsNewRoute = Ember.Route.extend({
    model: function () {
        'use strict';
        return { firstName: "", lastName: "", about: "" };
    }
});

App.FriendsController = Ember.ArrayController.extend({
    bestNumber: function () {
        'use strict';
        return this.filterBy('best', true).get('length');
    }.property('this.@each.best')
});

App.FriendsNewController = Ember.Controller.extend({
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
            var newFriend = this.store.createRecord('friend', {
                firstName: this.get('model.firstName'),
                lastName: this.get('model.lastName'),
                about: this.get('model.about')
            }),
                controller = this;

            newFriend.save().then(function () {
                controller.transitionToRoute('friends');
            });
        }
    }
});

App.FailuresIndexRoute = Ember.Route.extend({
    model: function () {
        'use strict';
        return ['Pedro', 'Santiago', 'Andrés', 'Juan', 'Felipe', 'Bartolomé', 'Tomás', 'Mateo', 'Simón', 'Matías'];
    }
});

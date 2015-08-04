/*global alert, console */

var Ember, App, Me;

App = Ember.Application.create();

Me = Ember.Object.create({
    username: "louis",
    fullName: "Louis Armstrong",
    about: "American jazz trumpeter and singer"
});

App.ApplicationRoute = Ember.Route.extend({
    model: function () {
        'use strict';
        return Me;
    }
});

App.UserCardComponent = Ember.Component.extend({
  tagName: 'a',
  classNames: ['card', 'user', 'text-capitalize'],
  attributeBindings: ['customHref:href'],
  customHref: 'https://en.wikipedia.org/wiki/Louis_Armstrong',
  classNameBindings: 'isEnabled:enabled:disabled',
  isEnabled: false
});

App.Router.map(function () {
    // put your routes here

});

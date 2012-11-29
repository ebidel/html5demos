var Tabs = Ember.Application.create({
   rootElement: '#ember-tabs',
   ready: function() {
     //document.querySelector(Tabs.rootElement + ' h2').click(); // Select first tab.
   }
});

Tabs.toggleActive = function(el) {
  $(this.rootElement + ' ' + el.nodeName.toLowerCase()).removeClass('active');
  $(el).addClass('active');
}

Tabs.contentStateManager = Ember.StateManager.create({
  rootElement: Tabs.rootElement + ' .contents',
  initialState: 'firstTab',

  showFirst: function(manager, e) {
    manager.goToState('firstTab');
    Tabs.toggleActive(e.target);
  },

  showSecond: function(manager, e) {
    manager.goToState('secondTab');
    Tabs.toggleActive(e.target);
  },

  firstTab: Ember.ViewState.create({
    view: Ember.View.extend({
      templateName: 'first'
    })
  }),

  secondTab: Ember.ViewState.create({
    view: Ember.View.extend({
      templateName: 'second'
    })
  })
});

//Tabs.contentStateManager.goToState('firstTab');


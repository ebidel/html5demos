var SLIDE_CONFIG = {
  // Slide settings
  settings: {
    title: 'Polymer',
    subtitle: 'building modern apps on web components',
    // eventInfo: {
    //   title: 'BDConf',
    //   date: '7/23/2013'
    // },
    useBuilds: true, // Default: true. False will turn off slide animation builds.
    usePrettify: false, // Controlled in app.js 
    enableSlideAreas: true, // Default: true. False turns off the click areas on either slide of the slides.
    enableTouch: true, // Default: true. If touch support should enabled. Note: the device must support touch.
    //analytics: 'UA-XXXXXXXX-1', // TODO: Using this breaks GA for some reason (probably requirejs). Update your tracking code in template.html instead.
    favIcon: '/images/logos/chrome_logo.png',
    fonts: [
      'Open Sans:regular,semibold,italic,italicsemibold',
      'Source Code Pro',
      'Architects Daughter'
    ],
    //theme: ['mytheme'], // Add your own custom themes or styles in /theme/css. Leave off the .css extension.
  },

  // Author information
  presenters: [{
    name: 'Eric Bidelman',
    //company: 'Chrome Team',
    gplus: 'http://google.com/+EricBidelman',
    twitter: '@ebidel',
    www: 'http://ericbidelman.com',
    github: 'http://github.com/ebidel'
  }]
};


export default [
  {
    id: 'intro',
    attachTo: '.MuiButtonBase-root MuiButton-root MuiButton-text',
    beforeShowPromise: function () {
      return new Promise(function (resolve) {
        setTimeout(function () {
          window.scrollTo(0, 0);
          resolve();
        }, 500);
      });
    },
    buttons: [
      {
        classes: 'shepherd-button-secondary',
        text: 'Exit',
        type: 'cancel'
      },
      {
        classes: 'shepherd-button-primary',
        text: 'Back',
        type: 'back'
      },
      {
        classes: 'shepherd-button-primary',
        text: 'Next',
        type: 'next'
      }
    ],
    classes: '.MuiContainer-root MuiContainer-maxWidthLg',
    highlightClass: 'highlight',
    scrollTo: false,
    cancelIcon: {
      enabled: true,
    },
    title: 'Welcome to React-Shepherd!',
    text: ['React-Shepherd is a JavaScript library for guiding users through your React app.'],
    when: {
      show: () => {
        console.log('show step');
      },
      hide: () => {
        console.log('hide step');
      }
    }
  },
  // ...
];
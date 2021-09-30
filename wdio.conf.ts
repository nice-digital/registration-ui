const allure = require('allure-commandline');

export const config: WebdriverIO.Config = {
  // Use devtools to control Chrome when we're running tests locally
  // Avoids issues with having the wrong ChromeDriver installed via selenium-standalone when Chrome updates every 6 weeks.
  // We need to use webdriver protocol in Docker because we use the selenium grid.
  automationProtocol: 'devtools',

  maxInstances: 1,
  path: '/wd/hub',

  specs: ['./functional-tests/features/**/login.feature'],

  capabilities: [
    {
      browserName: 'chrome',
      'goog:chromeOptions': {
        args: [
          '--window-size=1366,768',
          '--headless',
          '--disable-dev-shm-usage',
          '--no-sandbox',
          '--disable-gpu',
          '--disable-setuid-sandbox',
        ],
      },
    },
  ],

  logLevel: 'error',

  baseUrl: 'http://localhost:8000/',
  reporters: [
    'spec',
    [
      'allure',
      {
        useCucumberStepReporter: true,
        // Turn on screenshot reporting for error shots
        disableWebdriverScreenshotsReporting: false,
      },
    ],
  ].filter(Boolean) as WebdriverIO.Config['reporters'],

  framework: 'cucumber',
  cucumberOpts: {
    require: [
      './functional-tests/steps/**/*.ts',
      './node_modules/@nice-digital/wdio-cucumber-steps/lib',
    ],
    tagExpression: 'not @pending', // See https://docs.cucumber.io/tag-expressions/
    timeout: 15000,
  },

  // afterStep: async function (_test, _scenario, { error }) {
  //   // Take screenshots on error, these end up in the Allure reports
  //   if (error) await browser.takeScreenshot();
  // },

  autoCompileOpts: {
    autoCompile: true,
    // see https://github.com/TypeStrong/ts-node#cli-and-programmatic-options
    // for all available options
    tsNodeOpts: {
      transpileOnly: true,
      project: 'tsconfig.json',
    },
  },
  onComplete: function () {
    const reportError = new Error('Could not generate Allure report');
    const generation = allure(['generate', 'allure-results', '--clean']);
    return new Promise<void>((resolve, reject) => {
      const generationTimeout = setTimeout(() => reject(reportError), 5000);

      generation.on('exit', function (exitCode: number) {
        clearTimeout(generationTimeout);

        if (exitCode !== 0) {
          return reject(reportError);
        }

        console.log('Allure report successfully generated');
        resolve();
      });
    });
  },
};

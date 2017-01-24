var conf = require('../../nightwatch.conf.js');

module.exports = {
    'Standard File Upload': function (browser) {
        browser
            .url('http://localhost:8080')
            .waitForElementVisible('body', 1000)
            .waitForElementVisible('label.step_1_button--upload', 1000)
            .pause(1000)
            .saveScreenshot(conf.imgpath(browser) + 'step_0.png')
            .setValue('input#fileUploder', require('path').resolve(__dirname + '/test.csv'))
            .pause(1000)
            .waitForElementNotPresent('label.step_1_button--upload', 1000)
            .assert.containsText('.step_1_button__proceed', 'PROCEED')
            .waitForElementVisible('button.step_1_button__proceed', 1000)
            .saveScreenshot(conf.imgpath(browser) + 'step_1.png')
            .pause(1000)
            .click('button.step_1_button__proceed')
            .waitForElementVisible('#timer', 1000)
            .saveScreenshot(conf.imgpath(browser) + 'step_3.png')
            .waitForElementNotPresent('button.step_1_button__proceed', 1000)
            .waitForElementNotPresent('#timer', 1000)
            .waitForElementVisible('.step_4_button__return', 1000)
            .assert.containsText('.step_4_button__return', 'RESTART')
            .saveScreenshot(conf.imgpath(browser) + 'step_4.png')
            .pause(1000)
            .click('.step_4_button__return')
            .waitForElementNotPresent('.step_4_button__return', 1000)
            .waitForElementVisible('label.step_1_button--upload', 1000)
            .pause(1000)
            .end();

            // .waitForElementVisible('.step_4_button__return', 1000)
            // .assert.containsText('.step_4_button__return', 'RETURN')
            // .pause(1000)
            // .click('.step_4_button__return')
            // .pause(1000)
            // .waitForElementVisible('label.step_1_button--upload', 1000)
        //    .end();
    }
};

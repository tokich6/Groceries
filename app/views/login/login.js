var frameModule = require('tns-core-modules/ui/frame');
var UserViewModel = require('../../shared/view-models/user-view-model');
var dialogModule = require('tns-core-modules/ui/dialogs');

var user = new UserViewModel({
    email: 'example@gmail.com',
    password: 'password'
});

var page;
var email;

exports.loaded = function (args) {
    page = args.object;

    if (page.ios) {
        var navigationBar = frameModule.topmost().ios.controller.navigationBar;
        navigationBar.barStyle = UIBarStyle.UIBarStyleBlack;
    }

    page.bindingContext = user;
}

exports.signIn = function () {
    user.login()
        .catch(function (error) {
            console.log(error);
            dialogModule.alert({
                message: 'Unfortunately we could not find your account',
                okButtonText: 'OK'
            });
            return Promise.reject();
        })
        .then(function () {
            frameModule.topmost().navigate('views/list/list');
        });
}

exports.register = function () {
    var topmost = frameModule.topmost();
    topmost.navigate('views/register/register');
}
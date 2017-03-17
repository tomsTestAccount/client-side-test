"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var rt_authentication_service_1 = require("../app/_services/rt-authentication.service");
var common_1 = require("@angular/common");
//import { Overlay, overlayConfigFactory } from 'angular2-modal';
//import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap/';
var css = require('./css/app.component.css!text');
var AppComponent = (function () {
    function AppComponent(_router, _authenticationService, _location) {
        var _this = this;
        this._router = _router;
        this._authenticationService = _authenticationService;
        this._location = _location;
        this.progressBar_value = 0;
        this.progressBar_mode = 'determinate';
        this.subscription = _authenticationService.userDisplayName$.subscribe(function (newDisplayName) {
            _this.displayname = newDisplayName;
        });
        _authenticationService.getProgressValue().subscribe(function (value) { return _this.progressBar_value = value; });
        _authenticationService.getProgressMode().subscribe(function (mode) { return _this.progressBar_mode = mode; });
    }
    /*
    toggleLoginModal():void{
        this.bShowModal = !this.bShowModal;
        this.toggleLoginModal.emit(this.bShowModal);
    }
    */
    AppComponent.prototype.showLoginModal = function () {
        console.log("In app.componet before navigate to 'login' _location=", this._location.path());
        if (this._authenticationService.isAuthenticated())
            this._router.navigate(['/login', 'out', this._location.path()]);
        else
            this._router.navigate(['/login', 'in', this._location.path()]);
    };
    AppComponent.prototype.routeTo = function (route) {
        this._router.navigate([route]);
    };
    AppComponent.prototype.ngOnDestroy = function () {
        // prevent memory leak when component destroyed
        this.subscription.unsubscribe();
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        template: "\n\t\t<!-- changing for aot-compiler\n\t\t<button (click)=\"toggleHeading()\">Toggle Heading</button>\n\t\t<h1 *ngIf=\"showHeading\">My First Angular App</h1>\n\t\t-->\n\t\t\n\t\t<div class=\"container\">\n\t\t\n\t\t\t<header>\n\t\t\t\t<!--\n\t\t\t\t<div class=\"header_images\">\n\t\t\t\t<img id=\"headerImg\" src=\"/images/kopfbild.png\" alt=\"lmu_logos\">\n\t\t\t\t</div>\n\t\t\t\t-->\n\t\t\t\t<div class=\"header_images_container\">\n\t\t\t\t\t<div  class=\"header_images_item\">\n\t\t\t\t\t\t<a href=\"http://www.uni-muenchen.de\">\n\t\t\t\t\t\t\t<img  src=\"/images/header_images/lmu1.png\" alt=\"lmu_logo_1\">\n\t\t\t\t\t\t</a>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div  class=\"header_images_item\">\n\t\t\t\t\t\t<a href=\"http://www.uni-muenchen.de\">\n\t\t\t\t\t\t\t<img  src=\"/images/header_images/lmu2.png\" alt=\"lmu_logo_2\">\n\t\t\t\t\t\t</a>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div  class=\"header_images_item\">\n\t\t\t\t\t\t<a href=\"http://www.uni-muenchen.de\">\n\t\t\t\t\t\t\t<img  src=\"/images/header_images/lmu3.png\" alt=\"lmu_logo_3\">\n\t\t\t\t\t\t</a>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div  class=\"header_images_item\" id=\"header_images_item_ds\">\n\t\t\t\t\t\t<a href=\"http://www.m-datascience.mathematik-informatik-statistik.uni-muenchen.de\">\n\t\t\t\t\t\t\t<img  src=\"/images/header_images/lmu_ds.png\" alt=\"lmu_logo_ds\">\n\t\t\t\t\t\t</a>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t\n\t\t\t\t\n\t\t\t\t\t\t\t\t\n\t\t\t\t<div class=\"header_row\" id=\"header_row_menu_userInfo\">\n\t\t\t\t\n\t\t\t\t\t<div id=\"header_menu_column\">\n\t\t\t\t\t\n\t\t\t\t\t\t<div class=\"header_userInfo_field\">\n\t\t\t\t\t\t\t<div class=\"header_userInfo_item_button\"  [mdMenuTriggerFor]=\"mainmenu\">\n\t\t\t\t\t\t   \t\t\n\t\t\t\t\t\t   \t\t<i class=\"mdi mdi-menu mdi-24px\"></i>\n\t\t\t\t\t\t   </div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t  \n\t\t\t\t\t\t<md-menu #mainmenu=\"mdMenu\">\n\t\t\t\t\t\t\t<button md-menu-item   (click)=\"routeTo('startPage')\"> startPage  </button>\n\t\t\t\t\t\t\t<button md-menu-item  *ngIf=\"_authenticationService.isAuthenticated()\"  (click)=\"routeTo('userApplication')\"> User Application form </button>\n\t\t\t\t\t\t\t<button  md-menu-item *ngIf=\"!_authenticationService.isAuthenticated()\"  (click)=\"showLoginModal()\"> Login </button>\n\t\t\t\t\t\t\t<button  md-menu-item *ngIf=\"_authenticationService.isAuthenticated()\"  (click)=\"showLoginModal()\"> Logout </button>\n\t\t\t\t\t\t</md-menu>\n\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\n\t\t\t\t\t</div>\n\t\t\t\t\t<div id=\"header_userInfo_column\">\n\t\t\t\t\t\t<div *ngIf=\"!_authenticationService.isAuthenticated()\" class=\"header_userInfo_field\" (click)=\"showLoginModal()\">\n\t\t\t\t\n\t\t\t\t\t\t\t<!--\n\t\t\t\t\t\t\t<md-icon >\n\t\t\t\t\t\t\t\tperson\n\t\t\t\t\t\t\t</md-icon>\n\t\t\t\t\t\t\t-->\n\t\t\t\t\t\t\t<!--<button md-button>Login</button>-->\n\t\t\t\t\t\t\t<div class=\"header_userInfo_item\">\n\t\t\t\t\t\t\t\t<i class=\"mdi mdi-account-outline\"></i>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<div class=\"header_userInfo_item\">|</div>\n\t\t\t\t\t\t\t<div class=\"header_userInfo_item_button\">Login</div>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div *ngIf=\"_authenticationService.isAuthenticated()\"  class=\"header_userInfo_field\" (click)=\"showLoginModal()\">\n\t\t\t\t\n\t\t\t\t\t\t\t<!--\n\t\t\t\t\t\t\t<md-icon >\n\t\t\t\t\t\t\t\tperson\n\t\t\t\t\t\t\t</md-icon>\n\t\t\t\t\t\t\t-->\n\t\t\t\t\t\t\t<!--<button md-button>Login</button>-->\n\t\t\t\t\t\t\t<div class=\"header_userInfo_item\">\n\t\t\t\t\t\t\t\t<i class=\"mdi mdi-account\"></i>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<!--<div class=\"header_userInfo_item\">{{authenticationService._currentUser.lastName}},{{authenticationService._currentUser.firstName}}</div>-->\n\t\t\t\t\t\t\t<div class=\"header_userInfo_item\">{{displayname}}</div>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<div class=\"header_userInfo_item\" >|</div>\n\t\t\t\t\t\t\t<div class=\"header_userInfo_item_button\">Logout</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\n\t\t\t\t\t\t<!--\n\t\t\t\t\t\t<div class=\"loginOut_but\" class=\"header_userInfo_field\">\n\t\t\t\t\t\t\t<div class=\"loginOut_button\" (click)=\"showLoginModal()\">\n\t\t\t\t\t\t\t\t<span *ngIf=\"authenticationService.isAuthenticated()\">Logout</span>\n\t\t\t\t\t\t\t\t<span *ngIf=\"!authenticationService.isAuthenticated()\">Login</span>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t-->\n\t\t\t\t\t\t\n\t\t\t\t\t</div>\n\t\t\t\t\t\n\t\t\t\t</div>\n\t\t\t\t<!--\n\t\t\t\t<div class=\"header_row\">\n\t\t\t\n\t\t\t\t</div>\n\t\t\t\t-->\n\t\t\t</header>\n\t\t\n\t\t  \n\t\t\t\n\t\t\t<div> <!--class=\"card\" id=\"startPageCard\">-->\n\t\t\t\n\t\t\t\t<!--\n\t\t\t\t<rt-login-form *ngIf=\"bShowModal\" (showLoginModal)=\"OnToggleLoginModal\"></rt-login-form>\n\t\t\t\t\n\t\t\t\t<rt-login-form #loginModalChild></rt-login-form>\n\t\t\t\t\n\t\t\t\t-->\n\t\t\t\t\n\t\t\t\t<md-progress-bar color=\"accent\" mode=\"{{progressBar_mode}}\" value=\"{{progressBar_value}}\"></md-progress-bar>\n\t\t\t\t\n\t\t\t\t<div class=\"content-main\"> \t\t\t\n\t\t\t\t\t\t<router-outlet></router-outlet>\n\t\t\t\t</div>\n\t\t\t\n\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\n\t\t\t<footer>\n\t\t\t\t<div id=\"lmuFooter\">\n\t\t\t\t\n\t\t\t\t\t<div class=\"footerItem\">\n\t\t\t\t\t\t<a class=\"a_lmu\"  href=\"http://test-datascience.ifi.lmu.de/impressum\" title=\"Impressum\"> Impressum </a>\n\t\t\t\t\t</div>\n\t\t\t\t\t\n\t\t\t\t\t<div class=\"footerItem\">\n\t\t\t\t\t\t<a class=\"a_lmu\"  href=\"http://test-datascience.ifi.lmu.de/datenschutz\" title=\"Datenschutz\"> Datenschutz </a>\n\t\t\t\t\t</div>\n\t\t\t\t\t\n\t\t\t\t\t<div class=\"footerItem\">\n\t\t\t\t\t\t<a class=\"a_lmu\" href=\"http://test-datascience.ifi.lmu.de/contact-info\" title=\"Kontakt\"> Kontakt </a>\n\t\t\t\t\t</div>\n\t\t\t\t\n\t\t\t\t</div>\n\t\t\t</footer>\n\t\t</div>\n\t\t\n\t\t",
        //providers: [Modal],
        //styleUrls: ['app/css/app.component.css']
        styles: [css]
    }),
    __metadata("design:paramtypes", [router_1.Router,
        rt_authentication_service_1.AuthenticationService,
        common_1.Location])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map
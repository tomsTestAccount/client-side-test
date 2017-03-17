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
var http_1 = require("@angular/http");
var router_1 = require("@angular/router");
require("rxjs/add/operator/map");
var Subject_1 = require("rxjs/Subject");
var rt_rest_service_1 = require("./rt-rest.service");
/*
class cCurrentUser  {
    token:string;
    email:string;
};
*/
var dbgPrint = false;
var dbgPrint_user = false;
var dbgPrint_login = false;
var dbgPrint_setFormObj = true;
var dbgPrint_getFormObj = false;
var AuthenticationService = (function () {
    function AuthenticationService(http, _rtRestService) {
        /*
        this.auth_getCurrentUser();
        this.auth_getFormObject();
        this.isAuthenticated();
        */
        this.http = http;
        this._rtRestService = _rtRestService;
        this._authenicated = false;
        this._currentUser = null;
        this._currentFormObj = null;
        this._currentToken = null;
        this._currentUserId = null;
        // Observable string sources for displayname
        this.userDisplayNameSrc = new Subject_1.Subject();
        // Observable string streams
        this.userDisplayName$ = this.userDisplayNameSrc.asObservable();
        //------------------------------------------------------------------------------------------------------------------
        this.progressValue = new Subject_1.Subject();
        this.progressMode = new Subject_1.Subject();
        if (dbgPrint)
            console.log("_authenicated=", this._authenicated);
        if (dbgPrint)
            console.log("_currentUser=", this._currentUser);
        if (dbgPrint)
            console.log("_currentFormObj=", this._currentFormObj);
    }
    AuthenticationService.prototype.getProgressValue = function () {
        return this.progressValue.asObservable();
    };
    AuthenticationService.prototype.setProgressValue = function (newValue) {
        //this.progressValue = newValue;
        this.progressValue.next(newValue);
    };
    AuthenticationService.prototype.getProgressMode = function () {
        return this.progressMode.asObservable();
    };
    AuthenticationService.prototype.setProgressMode = function (newMode) {
        //this.progressValue = newValue;
        if (newMode === 'indeterminate')
            this.setProgressValue(0);
        this.progressMode.next(newMode);
    };
    //------------------------------------------------------------------------------------------------------------------
    AuthenticationService.prototype.login_getToken = function (userId, password) {
        var _this = this;
        //return this.http.post('/api/authenticate', JSON.stringify({ email: email, password: password }))
        //this.setProgressValue(0);
        this.setProgressMode('indeterminate');
        return new Promise(function (resolve, reject) {
            _this._rtRestService.restPost_login(userId, password)
                .subscribe(function (response) {
                if (dbgPrint_login)
                    console.log("In auth,response=", response);
                //if (response.token)
                if (response.hasOwnProperty('token')) {
                    var token = response['token'];
                    _this.setCurrentToken_local(token);
                    _this._currentUserId = userId;
                    _this.auth_getFormObject();
                    //this.setProgressValue(100);
                    _this.setProgressMode('determinate');
                    resolve(token);
                }
                else
                    reject("Server-Error, response object is invalid");
            }, function (err) {
                // Log errors are catched in REST-Service
                //console.log(err);
                if (dbgPrint_login)
                    console.log("In authService login, User NOT found !!! an uaObj for current user at server, err=", err);
                reject(err);
            }); //.toPromise();
        });
    };
    AuthenticationService.prototype.auth_getUserData = function () {
        var _this = this;
        if (this._currentUserId && this._currentToken) {
            return new Promise(function (resolve, reject) {
                _this._rtRestService.restGet_getUserData(_this._currentUserId, _this._currentToken)
                    .subscribe(function (response) {
                    console.log("In auth_getUserData, response=", response);
                    _this.setCurrentUser_local(response);
                    resolve(response);
                }, function (err) {
                    console.log("In auth_getUserData, error=", err);
                    reject(err);
                });
            });
        }
    };
    AuthenticationService.prototype.setDisplayName = function (name) {
        this.userDisplayNameSrc.next(name);
    };
    AuthenticationService.prototype.logout = function () {
        console.log("In authService-logout");
        // remove user from local storage to log user out
        localStorage.setItem('lmu_evfmsd_currentUser', null);
        localStorage.setItem('lmu_evfmsd_token', null);
        localStorage.setItem('currentUaObject', null);
        // Service message commands
        this.setDisplayName("");
        this._currentToken = "";
        this._authenicated = false;
        this._currentFormObj = null;
        this._currentUser = null;
    };
    AuthenticationService.prototype.isAuthenticated = function () {
        //if (this._currentUserId && this._currentToken)
        this.auth_getCurrentUser();
        if (this._currentUser) {
            //console.log("in isAuthenticated , this._currentUser=",this._currentUser);
            // for reloading page with valid currentUser
            if (this._currentToken) {
                this._authenicated = true;
                if (this._currentUser.fullname.length > 0)
                    this.setDisplayName(this._currentUser.fullname);
                else
                    this.setDisplayName(this._currentUser.username);
            }
        }
        //console.log("In AuthenticationService, isAuthenticated, _authenicated= ",this._authenicated);
        return this._authenicated;
    };
    //-----------------------------------------------------------------------------------------------------------------
    AuthenticationService.prototype.setCurrentUser_local = function (user) {
        var retValue = false;
        if (dbgPrint_user)
            console.log("In AuthenticationService,setCurrentUser_local: user=", user);
        var tempString = user;
        //JSON.stringify(tempString);
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('lmu_evfmsd_currentUser', JSON.stringify(tempString));
        this._currentUser = user;
        //if (JSON.parse(localStorage.getItem('currentUser'))) retValue=true;
        if (dbgPrint_user)
            console.log("In AuthenticationService,setCurrentUser_local: this._currentUser=", this._currentUser);
        return retValue;
    };
    AuthenticationService.prototype.setCurrentToken_local = function (token) {
        var retValue = false;
        console.log("In AuthenticationService,setCurrentToken_local: token=", token);
        var tempString = token;
        //JSON.stringify(tempString);
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('lmu_evfmsd_token', JSON.stringify(tempString));
        this._currentToken = token;
        //console.log("In AuthenticationService,setCurrentToken_local: token=",this._currentToken);
        return retValue;
    };
    AuthenticationService.prototype.auth_getCurrentUser = function () {
        if (dbgPrint_user)
            console.log("In auth_getCurrentUser");
        this._currentUser = (JSON.parse(localStorage.getItem('lmu_evfmsd_currentUser')));
        return this._currentUser;
    };
    //-----------------------------------------------------------------------------------------------------------------
    AuthenticationService.prototype.auth_getFormObject = function () {
        var _this = this;
        if (dbgPrint_getFormObj)
            console.log("In authService 1,auth_getFormObject,this._currentFormObj=", this._currentFormObj);
        if (dbgPrint_getFormObj)
            console.log("In authService 1,auth_getFormObject,localStorage.getItem('currentUaObject'=", localStorage.getItem('currentUaObject'));
        if ((!this._currentFormObj)
            || (this._currentFormObj === null)
            || (typeof this._currentFormObj !== 'object')
            || (Object.keys(this._currentFormObj).length === 0)) {
            var tmpUa = localStorage.getItem('currentUaObject');
            if ((!tmpUa)
                || (tmpUa === null)
                || (typeof tmpUa !== 'object')
                || (Object.keys(tmpUa).length === 0)) {
                if (dbgPrint_getFormObj)
                    console.log("tmpUa 1=", tmpUa);
                this.auth_getFormObject_Server(this._currentUser)
                    .then(function (response) {
                    if (response) {
                        if (dbgPrint_getFormObj)
                            console.log("In auth_getFormObject,after auth_getFormObject_Server response=", response, "this._currentFormObj=", _this._currentFormObj);
                        //this.auth_setFormObj(this._currentFormObj);
                        return response;
                    }
                    /*else {
                        }
                        if (dbgPrint_getFormObj) console.log("In auth_getFormObject,after auth_getFormObject_Server response=", response);
                        //this.auth_setFormObj({});
                        */
                })
                    .catch(function (exp) {
                    console.log("in auth_getFormObject, error at auth_getFormObject_Server , err=", exp);
                    //this.auth_setFormObj({});
                    return {};
                });
            }
            else {
                //this.auth_setFormObj(tmpUa);
                this._currentFormObj = JSON.parse(tmpUa);
                return this._currentFormObj;
            }
        }
        else
            return this._currentFormObj;
    };
    AuthenticationService.prototype.auth_getFormObject_Server = function (currentUser) {
        var _this = this;
        if (dbgPrint_getFormObj)
            console.log("1 In  rt-auth-service: auth_getFormObject_Server ,currentUser=", currentUser);
        var retValue = false;
        return new Promise(function (resolve, reject) {
            _this._rtRestService.restGet_formObject(_this._currentUserId, _this._currentToken)
                .subscribe(function (response) {
                // if (dbgPrint_getFormObj) console.log("In auth_getFormObject_Server after rest-call, response=",response);
                var uaObject = response; //JSON.parse(response);
                if (dbgPrint_getFormObj)
                    console.log("In auth_getFormObject_Server after rest-call, uaObject=", uaObject);
                if (!uaObject || Object.keys(uaObject).length === 0) {
                    uaObject = {
                        subFormGroup_apd: {},
                        subFormGroup_ac: {},
                        subFormGroup_ac2: {},
                        subFormGroup_oi: {},
                    };
                    if (dbgPrint_getFormObj)
                        console.log("1 NOT found !!! an uaObj for current user at server");
                }
                else {
                    var tmpObj = uaObject;
                    //uaObject = JSON.parse(tmpObj);
                    if (dbgPrint_getFormObj)
                        console.log("Found uaObj for current user at server, =", uaObject);
                    if (typeof uaObject !== 'object') {
                        uaObject = {
                            subFormGroup_apd: {},
                            subFormGroup_ac: {},
                            subFormGroup_ac2: {},
                            subFormGroup_oi: {},
                        };
                        if (dbgPrint_getFormObj)
                            console.log("Found uaObj for current user at server,but s not an object.\ " +
                                "So we have redefine it=", uaObject);
                    }
                }
                _this.auth_setFormObj(uaObject);
                resolve(true);
            }, function (err) {
                // Log errors are catched in REST-Service
                //console.log(err);
                if (dbgPrint_getFormObj)
                    console.log("2 NOT found !!! an uaObj for current user at server, err=", err);
                reject(false);
            });
        });
    };
    //------------------------------------------------------------------------------------------------------------
    AuthenticationService.prototype.auth_setFormObj = function (uaObj, sendToServer) {
        if (sendToServer === void 0) { sendToServer = false; }
        //console.log("In authService, auth_setFormObj 1:given uaObj=",uaObj);
        if (typeof uaObj !== 'object')
            uaObj = JSON.parse(uaObj);
        this._currentFormObj = uaObj;
        if (dbgPrint_setFormObj)
            console.log("In authService, auth_setFormObj 2 ,this._currentFormObj=", this._currentFormObj);
        //Important --> localStorage use json-format
        var tmpString = JSON.stringify(uaObj);
        tmpString = tmpString.replace(/\//g, '-');
        if (dbgPrint_setFormObj)
            console.log("In auth_setFormObj, tmpString", tmpString);
        //this._currentUser['uaObj'] = tmpString;
        //this.setCurrentUser_local(this._currentUser);
        //let tmpString = this._currentFormObj;
        localStorage.setItem('currentUaObject', tmpString); //JSON.stringify(tmpString));
        if (sendToServer)
            this.auth_setFormObj_Server(tmpString);
    };
    AuthenticationService.prototype.auth_setFormObj_Server = function (stringifyObj) {
        //var localStorage_formObj = localStorage.getItem('currentUaObject');
        this._rtRestService.restPost_formObject(this._currentUserId, this._currentToken, this._currentFormObj)
            .subscribe(function (data) { console.log("set UaObj to server successfull with data=", data); }, //this.data = data, // Reach here if res.status >= 200 && <= 299
        function (err) { console.log("set UaObj to server failure , err=", err); }); // Reach here if fails;
        /*
        if (dbgPrint_setFormObj) console.log("In auth_setFormObj_Server this._currentUser",this._currentUser);
        if (dbgPrint_setFormObj) console.log("In auth_setFormObj_Server stringifyObj=",stringifyObj);

        this._rtRestService.restPost_setUaObject(this._currentUser,stringifyObj)
            .subscribe(
                (data) => {console.log("set UaObj to server successfull with data=",data)}, //this.data = data, // Reach here if res.status >= 200 && <= 299
                (err) => {console.log("set UaObj to server failure , err=",err)}); // Reach here if fails;
*/
    };
    return AuthenticationService;
}());
AuthenticationService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http,
        rt_rest_service_1.RestService])
], AuthenticationService);
exports.AuthenticationService = AuthenticationService;
var AuthGuard = (function () {
    function AuthGuard(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    AuthGuard.prototype.canActivate = function (route, state) {
        var url = state.url;
        return this.checkLogin(url);
    };
    AuthGuard.prototype.checkLogin = function (url) {
        if (dbgPrint)
            console.log("in AuthGuard, checklogin, this.authService.isAuthenticated()= ", this.authService.isAuthenticated());
        if (this.authService.isAuthenticated()) {
            return true;
        }
        else {
            //console.log("in AuthGuard, checklogin : false");
            // Store the attempted URL for redirecting
            //this.authService.redirectUrl = url;
            // Navigate to the login page with extras
            this.router.navigate(['/login', 'in']);
            return false;
        }
    };
    return AuthGuard;
}());
AuthGuard = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [AuthenticationService, router_1.Router])
], AuthGuard);
exports.AuthGuard = AuthGuard;
//# sourceMappingURL=rt-authentication.service.js.map
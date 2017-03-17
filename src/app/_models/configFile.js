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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require("@angular/core");
var port = 8443;
var dbgPrint = false;
var ServerConfigs = (function () {
    function ServerConfigs(_window) {
        this._window = _window;
        this.host = _window.location.toString();
        var splitString = this.host.split('/');
        console.log("splitString=", splitString);
        var protocol = splitString[0];
        var host_port = splitString[2].split(':');
        if (dbgPrint)
            console.log("host_port=", host_port);
        var host = "";
        var port = "";
        if (host_port.length > 1) {
            host = host_port[0];
            port = host_port[1];
        }
        else
            host = splitString[2];
        if (protocol == 'http:')
            port = '8080';
        else
            port = '8443';
        this.serverURL = protocol + '//' + host + ':' + port + '/Plone';
        if (dbgPrint)
            console.log("serverURL=", this.serverURL);
        exports.constSrvUrl = this.serverURL;
    }
    ServerConfigs.prototype.get_serverConfigs = function () {
        var srvObj = {
            url: this.serverURL,
            host: this.host
        };
        return srvObj;
    };
    return ServerConfigs;
}());
ServerConfigs = __decorate([
    __param(0, core_1.Inject(Window)),
    __metadata("design:paramtypes", [Window])
], ServerConfigs);
exports.ServerConfigs = ServerConfigs;
exports.RunningConfigs = {
    runWithFakeBackend: false
};
//# sourceMappingURL=configFile.js.map
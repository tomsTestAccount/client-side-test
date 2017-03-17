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
var forms_1 = require("@angular/forms");
var rt_form_validators_service_1 = require("../_services/rt-form-validators.service");
var core_1 = require("@angular/core");
var cFormObject = (function () {
    function cFormObject(formgroup, formEntries) {
        this.formgroup = formgroup;
        this.formEntries = formEntries;
    }
    return cFormObject;
}());
exports.cFormObject = cFormObject;
var RtFormService = (function () {
    function RtFormService() {
        this.rtValidators = new rt_form_validators_service_1.rtFormValidators;
    }
    RtFormService.prototype.buildFormObject = function (form, entries) {
        return new cFormObject(form, entries);
    };
    RtFormService.prototype.toFormGroup = function (entries) {
        //console.log("entries=",entries);
        var group = {};
        //console.log("this.currentForm=", this.currentForm.entries);
        //'address2': ['', Validators.compose([Validators.required,Validators.minLength(3)])],
        entries.forEach(function (entry) {
            //console.log("entry=", entry.key);
            if (entry.key.type == 'fileUpload' || entry.key.type == 'grid-box-add') {
                group[entry.key] = new forms_1.FormControl(entry.key.defaultValue || [], entry.key.validators);
            }
            else {
                group[entry.key] = new forms_1.FormControl(entry.key.defaultValue || '', entry.key.validators);
            }
        });
        return new forms_1.FormGroup(group);
        //return new FormArray(group);
    };
    return RtFormService;
}());
RtFormService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], RtFormService);
exports.RtFormService = RtFormService;
//# sourceMappingURL=rt-forms.service.js.map
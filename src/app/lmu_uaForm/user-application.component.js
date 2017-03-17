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
var forms_1 = require("@angular/forms");
var rt_form_validators_service_1 = require("../_services/rt-form-validators.service");
var lmu_ua_formList_1 = require("../_models/lmu_ua_formList");
var router_1 = require("@angular/router");
var rt_authentication_service_1 = require("../_services/rt-authentication.service");
//import { CountryList} from '../_models/countries';
var dbgPrint = true;
var html = require('./user-application.component.html!text');
var css = require('./user-application.component.css!text');
var UserApplicationComponent = (function () {
    //-------------------------------------------------------------------------------------------------------------------
    function UserApplicationComponent(_fb, 
        //private _rtRestService:UserService,
        _authService, _router) {
        this._fb = _fb;
        this._authService = _authService;
        this._router = _router;
        //countries:any;
        //qApd_answered = 0;
        this.ua_sections = [
            { title: " Applicant\'s Personal Details",
                name: "dbComp_User_apd",
                answerMissing: 0 },
            { title: "Previous Education",
                name: "dbComp_User_pe",
                answerMissing: 0 },
            /*
              { title:  "Other Previous Education (optional)",
              name :  "dbComp_User_ope",
                  answerMissing : 0},
            */
            { title: "Essay and other information",
                name: "dbComp_User_oi",
                answerMissing: 0 }
        ];
        this.lmu_ua_form = new lmu_ua_formList_1.lmu_ua_formList();
        this.rtValidators = new rt_form_validators_service_1.rtFormValidators;
        this.dbgIsOpen = false;
        this.dbgPrint = false;
        this.dbgFormValues = false;
        this.changeDetected = false;
        this.status_apd = false;
        if (dbgPrint)
            console.log("In UserApplicationComponent constructor");
        //this.countries = CountryList;
        this.apd_formObj = this.lmu_ua_form.buildFormObject_apd();
        this.ac_formObj = this.lmu_ua_form.buildFormObject_ac();
        this.ac2_formObj = this.lmu_ua_form.buildFormObject_ac2();
        this.oi_formObj = this.lmu_ua_form.buildFormObject_oi();
        /*
        // we will initialize our main-lmu-ua-form in lmu_ua_formList
        this.main_lmu_ua_form = this._fb.group({

            subFormGroup_apd: this._fb.group([this.apd_formObj.formgroup,Validators.required]),
            subFormGroup_ac: this._fb.group([this.ac_formObj.formgroup,Validators.required]),
            subFormGroup_oi: this._fb.group([this.oi_formObj.formgroup,Validators.required]),
            subFormGroup_ac2: this._fb.group([this.ac2_formObj.formgroup,Validators.required])

        });
        */
        this.main_lmu_ua_form = this.lmu_ua_form.get_mainForm();
        var currentUser = this._authService.auth_getCurrentUser();
        if (dbgPrint)
            console.log("In user-application ngOnInit , currentUser=", currentUser);
        //timeout(2000);
        this.currentUaObj = this._authService.auth_getFormObject();
        if (dbgPrint)
            console.log("In user-application ngOnInit , currentUaObject=", this.currentUaObj);
        /*
        if (Object.keys(this.currentUaObj).length === 0) //check if empty
        {

            this._authService.getUaObjectByRest(currentUser);
        }
        else //if (!this.changeDetected)
        {
            this.setFormValues_AlreadyFilled();
        }
        */
        if (this.currentUaObj) {
            if (Object.keys(this.currentUaObj).length !== 0) {
                if (dbgPrint)
                    console.log("In user-application ngOnInit: this.main_lmu_ua_form=", this.main_lmu_ua_form);
                this.setFormValues_AlreadyFilled();
            }
        }
        //this.main_lmu_ua_form.valueChanges.subscribe(data => this.formValueChanged(data));
    }
    ;
    /*formValueChanged(data:any)
    {
        console.log("value changed, this.main_lmu_ua_form=",this.main_lmu_ua_form);
        this.changeDetected = true;
    }
    */
    UserApplicationComponent.prototype.ngOnInit = function () {
        if (this.dbgPrint)
            console.log("In user-application ngOnInit!");
        /*this.userdataservice.getUserModel(1).then(
            usermodel => this.usermodel = usermodel);
            */
        this.uasubmit = false;
        /*
        this._router.events.subscribe(path => {
            console.log('path = ', path);
        });
         */
    };
    UserApplicationComponent.prototype.setFormValues_AlreadyFilled = function () {
        if (this.dbgFormValues) {
            console.log("In setFormValues_AlreadyFilled,this.main_lmu_ua_form.controls=", this.main_lmu_ua_form.controls);
            console.log("In setFormValues_AlreadyFilled,this.currentUaObj=", this.currentUaObj);
            console.log("In setFormValues_AlreadyFilled,this.currentUaObj.subFormGroup_apd=", this.currentUaObj.subFormGroup_apd);
            console.log("In setFormValues_AlreadyFilled,this.currentUaObj.subFormGroup_ac=", this.currentUaObj.subFormGroup_ac);
            console.log("In setFormValues_AlreadyFilled,this.currentUaObj.subFormGroup_ac2=", this.currentUaObj.subFormGroup_ac2);
            console.log("In setFormValues_AlreadyFilled,this.currentUaObj.subFormGroup_oi=", this.currentUaObj.subFormGroup_oi);
        }
        this.main_lmu_ua_form.controls['subFormGroup_apd'].patchValue(this.currentUaObj.subFormGroup_apd);
        this.main_lmu_ua_form.controls['subFormGroup_ac'].patchValue(this.currentUaObj.subFormGroup_ac);
        this.main_lmu_ua_form.controls['subFormGroup_oi'].patchValue(this.currentUaObj.subFormGroup_oi);
        this.main_lmu_ua_form.controls['subFormGroup_ac2'].patchValue(this.currentUaObj.subFormGroup_ac2);
    };
    UserApplicationComponent.prototype.select_comp4User = function (current_ua_sec) {
        if (dbgPrint)
            console.log("In select_comp4User, current_dbComp_user=", current_ua_sec);
        this.curr_ua_sec = current_ua_sec;
    };
    UserApplicationComponent.prototype.saveFormObj = function () {
        //this._rtRestService.setUaObject(this._authService.auth_getCurrentUser(),this.main_lmu_ua_form.value);
        if (dbgPrint)
            console.log("In saveFormObj, this.main_lmu_ua_form.value=", this.main_lmu_ua_form.value);
        this._authService.auth_setFormObj(this.main_lmu_ua_form.value, true);
        this.changeDetected = false;
    };
    UserApplicationComponent.prototype.onFormEvent_apd = function (status_apd) {
        //TODO: olny call this function when value was changed --> form
        this.uasubmit = status_apd;
        this.ua_sections[0]['answerMissing']++;
        if (dbgPrint)
            console.log("In onFormEvent_apd this.uasubmit= ", this.uasubmit);
    };
    //LmuUserApdComponent.get
    //---------------------- dbg
    UserApplicationComponent.prototype.showDbg = function () {
        //console.log("this.main_lmu_ua_form=",this.main_lmu_ua_form);
        var currUsers = JSON.parse(localStorage.getItem('users'));
        console.log("In showDbg, localStorage.getItem('users')=", currUsers);
        var currUserObj = JSON.parse(localStorage.getItem('currentUser'));
        console.log("In showDbg, localStorage.getItem('currUserObj')=", currUserObj);
        //this._authService.auth_getFormObject();
        var currUaObj = JSON.parse(localStorage.getItem('currentUaObject'));
        console.log("In showDbg, localStorage.getItem('currentUaObject')=", currUaObj);
        //currUaObj = JSON.parse(localStorage.getItem('currentUaObject'));
    };
    return UserApplicationComponent;
}());
UserApplicationComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'my-userApplication',
        template: html,
        styles: [css]
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder,
        rt_authentication_service_1.AuthenticationService,
        router_1.Router])
], UserApplicationComponent);
exports.UserApplicationComponent = UserApplicationComponent;
//# sourceMappingURL=user-application.component.js.map
//import { NgModule }      		from '@angular/core';

import { Component,OnInit,HostListener,Input,OnChanges,SimpleChange } from '@angular/core';
import {Validators, FormGroup,FormControl,FormBuilder,FormArray} from '@angular/forms';


import {rtFormValidators}  from '../_services/rt-form-validators.service';
import {lmu_ua_formList} from'../_models/lmu_ua_formList';
import { RtFormService ,cFormObject} from '../_services/rt-forms.service';

//import {UserService} from '../_services/rt-user.service';
import { User } from '../_models/user';

import {Router,ActivatedRoute} from '@angular/router';

import {AuthenticationService} from  '../_services/rt-authentication.service';

//import { CountryList} from '../_models/countries';


const dbgPrint = true;

//for animations
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/core';
import {isNullOrUndefined} from "util";
import {timeout} from "rxjs/operator/timeout";

//var html = require('./user-application.component.html!text');
//var css = require('./user-application.component.css!text');

@Component({
	//moduleId: module.id,
	selector: 'my-userApplication',
   // template:html,
  templateUrl: 'user-application.component.html',
  //  styles:[css]

	styleUrls: ['user-application.component.css'],
	//for animations
	/*animations: [
		trigger('hoverState', [
			state('inactive', style({
				//backgroundColor: '#eee',
				transform: 'scale(1)'
			})),
			state('active',   style({
				//backgroundColor: '#cfd8dc',
				transform: 'scale(1.1)'
			})),
		transition('inactive => active', animate('100ms ease-in')),
		transition('active => inactive', animate('100ms ease-out'))
		])
	]
	*/

})




export class UserApplicationComponent implements OnInit {

	//usermodel : UserModel; // = {uid:42,surname : "Dampf", givenName : "hans", gender : 'male', dateOfBirth : { day:1, month:4, year:1980}};

	uasubmit : boolean;

	//countries:any;
	//qApd_answered = 0;

	ua_sections  = [
            { title: " Applicant\'s Personal Details",
              name : "dbComp_User_apd",
              answerMissing : 0},
            { title: "Previous Education",
              name :  "dbComp_User_pe",
                answerMissing : 0},
            /*
              { title:  "Other Previous Education (optional)",
              name :  "dbComp_User_ope",
                  answerMissing : 0},
            */
              { title:  "Essay and other information",
              name :  "dbComp_User_oi",
                  answerMissing : 0}
    ];


	curr_ua_sec : string;


	//------------------------------------------
	main_lmu_ua_form : FormGroup;
	lmu_ua_form= new lmu_ua_formList();
	rtValidators = new rtFormValidators;
	//-------------------------------------------

	currentFormObject:cFormObject;
	ac_formObj:cFormObject;
    ac2_formObj:cFormObject;
	apd_formObj:cFormObject;
	oi_formObj:cFormObject;


	dbgIsOpen = false;

	currentUaObj:any;

	dbgPrint =false;


    dbgFormValues =false;

	changeDetected=false;

	//-------------------------------------------------------------------------------------------------------------------

	constructor(private _fb: FormBuilder,
				//private _rtRestService:UserService,
				private _authService:AuthenticationService,
				private _router:Router
						)
    {

        if (dbgPrint) console.log("In UserApplicationComponent constructor");

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

		let currentUser= this._authService.auth_getCurrentUser();
        if (dbgPrint) console.log("In user-application ngOnInit , currentUser=",currentUser);


        //timeout(2000);

		this.currentUaObj = this._authService.auth_getFormObject();


        if (dbgPrint) console.log("In user-application ngOnInit , currentUaObject=",this.currentUaObj);


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
                if (dbgPrint) console.log("In user-application ngOnInit: this.main_lmu_ua_form=", this.main_lmu_ua_form);
                this.setFormValues_AlreadyFilled();
            }
        }
        //this.main_lmu_ua_form.valueChanges.subscribe(data => this.formValueChanged(data));

	};


	/*formValueChanged(data:any)
	{
		console.log("value changed, this.main_lmu_ua_form=",this.main_lmu_ua_form);
		this.changeDetected = true;
	}
	*/


	ngOnInit(): void {


        if (this.dbgPrint) console.log("In user-application ngOnInit!");

		/*this.userdataservice.getUserModel(1).then(
			usermodel => this.usermodel = usermodel);
			*/

		this.uasubmit = false;

    var cookies = document.cookie;

    console.log("cookies = ",document.cookie);

		/*
		this._router.events.subscribe(path => {
			console.log('path = ', path);
		});
         */
	}

	setFormValues_AlreadyFilled()
	{
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

	}

	select_comp4User(current_ua_sec: string)
	{
        if (dbgPrint) console.log("In select_comp4User, current_dbComp_user=",current_ua_sec);
		this.curr_ua_sec = current_ua_sec;
	}

	saveFormObj()
	{

		//this._rtRestService.setUaObject(this._authService.auth_getCurrentUser(),this.main_lmu_ua_form.value);

        if (dbgPrint) console.log("In saveFormObj, this.main_lmu_ua_form.value=",this.main_lmu_ua_form.value);

        this._authService.auth_setFormObj(this.main_lmu_ua_form.value,true);
		this.changeDetected = false;
	}





	status_apd: boolean = false;
	onFormEvent_apd(status_apd)
	{
		//TODO: olny call this function when value was changed --> form

		this.uasubmit = status_apd;
		this.ua_sections[0]['answerMissing']++;
        if (dbgPrint) console.log("In onFormEvent_apd this.uasubmit= ",this.uasubmit);
	}



	//LmuUserApdComponent.get


	//---------------------- dbg

	showDbg(){
		//console.log("this.main_lmu_ua_form=",this.main_lmu_ua_form);
		let currUsers = JSON.parse(localStorage.getItem('users'));
        console.log("In showDbg, localStorage.getItem('users')=",currUsers);

        let currUserObj = JSON.parse(localStorage.getItem('currentUser'));
        console.log("In showDbg, localStorage.getItem('currUserObj')=",currUserObj);


        //this._authService.auth_getFormObject();
        let currUaObj = JSON.parse(localStorage.getItem('currentUaObject'));
        console.log("In showDbg, localStorage.getItem('currentUaObject')=",currUaObj);

        //currUaObj = JSON.parse(localStorage.getItem('currentUaObject'));

	}

}

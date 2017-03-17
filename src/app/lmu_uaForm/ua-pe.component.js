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
var html = require('./ua-pe.component.html!text');
var LmuUserPeComponent = (function () {
    function LmuUserPeComponent(fb) {
        /*this.countries = CountryList;

        this.dbgIsOpen = false;
        //file-upload init
        this.zone = new NgZone({ enableLongStackTrace: false });

        this.uploadedData_Degree = new Array(); //TODO: load via restApi (Mock first)
        this.options_degreeUpload= {
            url: 'http://localhost:3001/upload',
            filterExtensions: true,
            allowedExtensions: ['application/pdf'],
            calculateSpeed: true,
        };
        this.uploadedData_transcriptOrOtherGrades = new Array();
        this.options_transcriptOrOtherGrades = {
            url: 'http://localhost:3001/upload',
            filterExtensions: true,
            allowedExtensions: ['application/pdf','image/jpeg','image/png' ],
            calculateSpeed: true,
        }
        //this.avgr2_courseList = Avgr2Obj[];
        //this.avgr2_newCourseObj = {name:"",ects:0,grade:0};

        this.avgr2_courseList = new Array() ;
        this.avgr2_courseComplete = false;


        this.avgr3_courseList = new Array() ;
        this.avgr3_courseComplete = false;


        this.uploadedData_proofEnglish = new Array();
        this.options_proofEnglish = {
            url: 'http://localhost:3001/upload',
            filterExtensions: true,
            allowedExtensions: ['application/pdf','image/jpeg','image/png' ],
            calculateSpeed: true,
        }
        */
        this.fb = fb;
        //--------------------------------------------
        this.showTooltip1 = false;
        this.fU_progress = 0;
        this.fU_response = {};
        this.hasBaseDropZoneOver = false;
        //-----------------------------------------------
        this.fU_progress2 = 0;
        this.fU_response2 = {};
        this.hasBaseDropZoneOver2 = false;
        this.secParagraphText_toG = ["Please provide evidence of your English Language Proficiency.",
            "Note: German proficiency is no requirement, as our program is exclusively taught and assessed in English.",
            "Different information on the website of LMU International Office may be ignored as this applies only to German programs."];
        //----------------------------------------------------
        this.fU_progress3 = 0;
        this.fU_response3 = {};
        this.hasBaseDropZoneOver3 = false;
        this.rtValidators = new rt_form_validators_service_1.rtFormValidators;
        this.lmu_ua_form = new lmu_ua_formList_1.lmu_ua_formList();
        //ac2_formObj:cFormObject;
        this.ac2Open = false;
        //----------------------------------------------------
        this.dbgPrint = false;
        //this.currentFormObject = this.lmu_ua_form.buildFormObject_ac();
        //this.ac2_formObj = this.lmu_ua_form.buildFormObject_ac2();
    }
    Object.defineProperty(LmuUserPeComponent.prototype, "setForm", {
        set: function (givenForm) {
            if (this.dbgPrint)
                console.log("givenForm=", givenForm);
            this.currentForm = givenForm.controls[0];
            //this.currentForm = givenForm;
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(LmuUserPeComponent.prototype, "setFormEntries", {
        set: function (formEntries) {
            this.currentFormEntries = formEntries;
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(LmuUserPeComponent.prototype, "setForm2", {
        set: function (givenForm) {
            this.currentForm2 = givenForm.controls[0];
            if (this.dbgPrint)
                console.log("this.currentFormObject2=", this.currentForm2);
            var formCtrls = this.currentForm2['controls'];
            for (var key in formCtrls) {
                //console.log("formCtrl = ", key);
                if (formCtrls[key].value !== '' &&
                    formCtrls[key].value !== [] &&
                    formCtrls[key].value !== 'undefined') {
                    //if (this.dbgPrint)
                    console.log("formCtrl.value = ", formCtrls[key].value, " for ", key);
                    this.ac2Open = true;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(LmuUserPeComponent.prototype, "setFormEntries2", {
        set: function (formEntries) {
            this.currentFormEntries2 = formEntries;
            if (this.dbgPrint)
                console.log("this.currentFormEntries=", this.currentFormEntries2);
        },
        enumerable: true,
        configurable: true
    });
    ;
    //---------------------------------------------------
    /*
    validateArray(c: FormControl) {


        let retValue = null;
        if (c != undefined) {

            retValue = (c.value.length == 0) ? {notA: true} : null;

            console.log("In validateArray, c=",c, ', c.value.length=', c.value.length);
        }
        return retValue

    }
    */
    /*
    ngAfterViewChecked(){
        console.log("In afterViewchecked ac this.currentFormObject=",this.currentFormObject);
    }
    */
    LmuUserPeComponent.prototype.ngOnInit = function () {
        //if (this.dbgPrint)
        if (this.dbgPrint)
            console.log("In LmuUserPeComponent,OnInit ac this.currentFormObject=", this.currentFormObject);
        if (this.dbgPrint)
            console.log("In LmuUserPeComponent,OnInit ac this.currentFormEntries=", this.currentFormEntries);
        //this.buildForm();
        //this.isDragDropAvailable();
        console.log("this.ac2Open", this.ac2Open);
    };
    /*
    buildForm(): void {


        this.peForm = this.fb.group({
            'acadEdu': ['', Validators.compose([Validators.required,Validators.minLength(3)])],
            'acadLvl': ['', Validators.compose([Validators.required,Validators.minLength(3)])],
            'acadInst': ['', Validators.compose([Validators.required,Validators.minLength(3)])],
            'degreeConferralDate': ['', Validators.compose([Validators.required,Validators.minLength(3)])],
            'copyOfDegreeCert': [[], Validators.compose([Validators.required,this.rtValidators.validateArray])],
            'degreeCertAvailable': [true, Validators.required],
            'transcriptOrOtherGrades': [[], Validators.compose([Validators.required,this.rtValidators.validateArray])],
            'avGr1_bestPerf': ['', Validators.compose([Validators.required,Validators.minLength(1)])],
            'avGr2_computationalMethods': [[], Validators.compose([Validators.required,this.rtValidators.validateArray])],
            'avGr3_dataBasedModelling': [[], Validators.compose([Validators.required,this.rtValidators.validateArray])],
            //'bachDegreeFromLMU': false,
            'typeOfInst4bach': ['', Validators.compose([Validators.required,Validators.minLength(3)])],
            'proofOfEnglishProficiency' : [[], Validators.compose([Validators.required,this.rtValidators.validateArray])]
        });


        this.peForm.statusChanges.subscribe(data => this.onFormStatusChanged(data));


        this.peForm_inner = this.fb.group({
            'name':'',
            'ects':'',
            'grade':''
        })

        this.peForm_inner.statusChanges.subscribe(data => this.onFormStatusChanged_2(data));




        this.formEntries = [
            {   formgroup : this.peForm,
                key : 'acadEdu',
                title : 'Academic Education *',
                type: 'textarea',
                required: true
            },
            {   formgroup : this.peForm,
                key : 'acadLvl',
                title : 'Academic Level *',
                type: 'textarea',
                required: true
            },
            {   formgroup : this.peForm,
                key : 'acadInst',
                title : 'Academic Institution *',
                type: 'textarea',
                required: true
            },
            {
                formgroup : this.peForm,
                key : 'degreeConferralDate',
                title : 'Degree Conferral Date *',
                type: 'date',
                required: true
            },

            {
                formgroup : this.peForm,
                key : 'copyOfDegreeCert',
                title : 'Copy of Degree Certificate (e.g. Bachelor) *',
                type: 'fileUpload',
                options: {
                    url: 'http://localhost:3001/upload',
                    filterExtensions: true,
                    allowedExtensions: ['application/pdf'],
                    calculateSpeed: true,
                    },
                required: true
            },
            {
                formgroup : this.peForm,
                key : 'transcriptOrOtherGrades',
                title : 'Transcript of Records or Other Proof of Grades *',
                type: 'fileUpload',
                options: {
                    url: 'http://localhost:3001/upload',
                    filterExtensions: true,
                    allowedExtensions: ['application/pdf','image/jpeg','image/png' ],
                    calculateSpeed: true,
                },
                required: true
            },
            {
                formgroup : this.peForm,
                key : 'avGr1_bestPerf',
                title : 'Average Grade of the Best Performance = AvGr1 *',
                type: 'number',
                secParagraphArray: [`Please calculate the average grade from the best performance (equivalent to 150 ECTS) and enter this in the field below.`,
                    `Note: Applicants whose Transcript of Records does not include ECTS: A 6-semester study program equals a workload of 180 ECTS.`,
                    `Divide this workload between the different courses you took during your study program and upload your calculation at the end of this online application in the field Other documents`],
                required: true
            },
            {
                formgroup : this.peForm,
                key : 'avGr2_computationalMethods',
                title : 'Computational Methods = AvGr2 *',
                secParagraphArray: ['Please enter the courses you attended in Computational Methods', '(this includes, for example, informatics, database-orientated methods, computational statistics, optimisation)'],
                type: 'grid-box-add',
                options: {
                    whatToAdd: 'Course', // string for the element to add
                    allCols: 7,   // realAllCols - allCols = reservedCols e.g.  9-7 = 2; 2 cols are reserved for the add-button, see the number of cols of the gridCells below
                    rowHeight: '42px',
                    gridCells: [{
                            rows: 1,
                            cols: 3,
                            title : 'Course Name',
                            //secParagraph: 'E.g.: Database Systems',
                            id: 'name', //need for iteration in component.ts, has to be distinct for that entry
                            type:'text',
                            placeHolder : 'E.g.: Database Systems'

                        },
                        {
                            rows: 1,
                            cols: 2,
                            title : 'ECTS',
                            //secParagraph:  'E.g.: 6 or 4.5',
                            id: 'ects', //need for iteration in component.ts, has to be distinct for that entry
                            type:'number',
                            placeHolder: 'E.g.: 6 or 4.5'
                        },
                        {
                            rows: 1,
                            cols: 2,
                            title : 'Grade',
                            //secParagraph:  'E.g.: 1.5',
                            id: 'grade', //need for iteration in component.ts, has to be distinct for that entry
                            type:'number',
                            placeHolder: 'E.g.: 1.5'
                        }],
                },
                required: true
            },
            {
                formgroup : this.peForm,
                key : 'avGr3_dataBasedModelling',
                title : 'Data-Based Modelling = AvGr 3 *',
                secParagraphArray: ['Please enter the courses you attended in Data-Based Modelling',' (this includes, for example, statistics, data mining, probability theory, machine learning)'],
                type: 'grid-box-add',
                options: {
                    whatToAdd: 'Course', // string for the element to add
                    allCols: 7,   //9-7 = 2; 2 cols are reserved for the add-button, see the number of cols of the gridCells below
                    rowHeight: '42px',
                    gridCells: [{
                        rows: 1,
                        cols: 3,
                        title : 'Course Name',
                        //secParagraph: 'E.g.: Database Systems',
                        id: 'name', //need for iteration in component.ts, has to be distinct for that entry
                        type:'text',
                        placeHolder : 'E.g.: Database Systems'

                    },
                        {
                            rows: 1,
                            cols: 2,
                            title : 'ECTS',
                            //secParagraph:  'E.g.: 6 or 4.5',
                            id: 'ects', //need for iteration in component.ts, has to be distinct for that entry
                            type:'number',
                            placeHolder: 'E.g.: 6 or 4.5'
                        },
                        {
                            rows: 1,
                            cols: 2,
                            title : 'Grade',
                            //secParagraph:  'E.g.: 1.5',
                            id: 'grade', //need for iteration in component.ts, has to be distinct for that entry
                            type:'number',
                            placeHolder: 'E.g.: 1.5'
                        }],
                },
                required: true
            },
            {   formgroup : this.peForm,
                key : 'typeOfInst4bach',
                title : "Institution at which Bachelor's Degree was Received *",
                type: 'select',
                options : [
                    {
                        name : 'LMU'
                    },
                    {
                        name : 'other University'
                    },
                    {
                        name : 'University of Applied Sciences'
                    },
                    {
                        name : 'Other kind of Institution'
                    }
                ],
                required: true
            },
            {
                formgroup : this.peForm,
                key : 'proofOfEnglishProficiency',
                title : 'Proof of English Language Proficiency *',
                type: 'fileUpload',
                options: {
                    url: 'http://localhost:3001/upload',
                    filterExtensions: true,
                    allowedExtensions: ['application/pdf','image/jpeg','image/png' ],
                    calculateSpeed: true,
                },
                required: true
            }
        ]
    }
    */
    LmuUserPeComponent.prototype.onFormStatusChanged = function (data) {
        var tmpStatus = false;
        if (data === 'VALID') {
            console.log("onFormStatusChanged", data);
            tmpStatus = true;
        }
        this.usermodel = this.peForm;
        //this.onFormEvent_pe.emit(tmpStatus);
    };
    LmuUserPeComponent.prototype.onFormStatusChanged_2 = function (data) {
        var tmpStatus = false;
        if (data === 'VALID') {
            console.log("onFormStatusChanged_2", data);
            tmpStatus = true;
        }
        this.avgr2Object_formModel = this.peForm_inner;
        //this.onFormEvent_pe.emit(tmpStatus);
    };
    LmuUserPeComponent.prototype.formInputValid = function (formInput) {
        return false;
    };
    LmuUserPeComponent.prototype.onChange = function (e) {
        //this.opeForm.controls.copyOfDegreeCert_ope._onChange(e);
        //(<FormControl>this.opeForm.controls['copyOfDegreeCert_ope']).patchValue(e.value);
        if (this.dbgPrint)
            console.log(this.peForm.controls['typeOfInst4bach']);
        if (this.dbgPrint)
            console.log("e=", e);
        if (this.dbgPrint)
            console.log("this.peForm=", this.peForm);
    };
    //----------- has previous degree yet section
    /*
    hasDegreeToggled(e:any):void{

        this.peForm.value.degreeCertNotAvailable = e.checked;
        console.log("peForm=",this.peForm, e);

    }
    */
    LmuUserPeComponent.prototype.toggleInfo = function (e) {
        this.showTooltip1 = !this.showTooltip1;
        e.stopPropagation();
    };
    Object.defineProperty(LmuUserPeComponent.prototype, "diagnostic", {
        //----------- for file upload -----------------------------------------------
        /*
            bIsDDavailable = false;
        
            isDragDropAvailable(){
                var div = document.createElement('div');
                this.bIsDDavailable = ('draggable' in div) || ('ondragstart' in div && 'ondrop' in div);
                //console.log("bIsDDavailable=",this.bIsDDavailable);
            }
        
            getFileSize(bytes:number):string{
                if(bytes == 0) return '0 Byte';
                var k = 1000;
                var decimals = 2;
                var dm = decimals || 3;
                var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
                var i = Math.floor(Math.log(bytes) / Math.log(k));
                return +parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
            }
        
        
            //------ for degreeCertificate
        
            handleUpload_degreeUpload(data): void {
                this.zone.run(() => {
        
                    this.hasBaseDropZoneOver = null;
        
                    this.fU_response = data;
        
                    this.fU_progress = Math.floor(data.progress.percent / 100);
        
                    if (data && data.response)
                    {
                        this.uploadedData_Degree.push(data);
                        console.log("uploaded file=",data);
                    }
                });
        
        
        
        
            }
        
            fileOverBase_degreeUpload(e:any):void {
                this.hasBaseDropZoneOver = e;
        
                //this.style.background = 'blue';
                //this.pRnd.setElementStyle(this.pEl.nativeElement, 'backgroundColor', 'green');
            }
        
        
            delete_degreeUpload(file:any):void{
                //console.log("delete file=",file);
                let index = this.uploadedData_Degree.indexOf(file);
                if (index > -1) {
                    this.uploadedData_Degree.splice(index, 1);
                }
            }
        
            //--------------- for transcript of records or other proof of grades
        
            handleUpload_transcriptOrOtherGrades(data): void {
                this.zone.run(() => {
        
                    this.hasBaseDropZoneOver2 = null;
        
                    this.fU_response2 = data;
        
                    this.fU_progress2 = Math.floor(data.progress.percent / 100);
        
                    if (data && data.response)
                    {
                        this.uploadedData_transcriptOrOtherGrades.push(data);
                        console.log("uploaded file=",data);
                    }
                });
        
        
        
        
            }
        
            fileOverBase_transcriptOrOtherGrades(e:any):void {
                this.hasBaseDropZoneOver2 = e;
        
                //this.style.background = 'blue';
                //this.pRnd.setElementStyle(this.pEl.nativeElement, 'backgroundColor', 'green');
            }
        
        
            delete_transcriptOrOtherGrades(file:any):void{
                //console.log("delete file=",file);
                let index = this.uploadedData_transcriptOrOtherGrades.indexOf(file);
                if (index > -1) {
                    this.uploadedData_transcriptOrOtherGrades.splice(index, 1);
                }
            }
        */
        //------------------- avgr2 --------------------------------------------
        /*
            addNewLine_grTbl(courseType:string):void {
        
                //let tmpObj : Avgr2Obj = {name:"",ects:0,grade:0};
                let tmpObj = {name:"",ects:0,grade:0,courseComplete:false};
        
                if (courseType == 'avgr2')
                {
                    //this.avgr2_courseList.push(tmpObj);
                    this.avgr2_newCourseObj = tmpObj;
                    this.avgr2_courseComplete = false;
                }
                else if (courseType == 'avgr3')
                {
                    //this.avgr2_courseList.push(tmpObj);
                    this.avgr3_newCourseObj = tmpObj;
                    this.avgr3_courseComplete = false;
                }
        
            }
        
            cancelNewLine_grTbl(courseType:string):void{
        
                if (courseType == 'avgr2') this.avgr2_newCourseObj = null;
                else if (courseType == 'avgr3') this.avgr3_newCourseObj = null;
            }
        
        
            addCourseToList(courseType:string):void {
                if (courseType == 'avgr2')
                {
                    this.avgr2_courseList.push(this.avgr2_newCourseObj);
                    this.avgr2_newCourseObj = null;
                }
                else if (courseType == 'avgr3')
                {
                    this.avgr3_courseList.push(this.avgr3_newCourseObj);
                    this.avgr3_newCourseObj = null;
                }
            }
        
            deleteCourseFromList(courseType:string,courseItem):void {
                if (courseType == 'avgr2') {
                    //console.log("delete courseItem=", courseItem);
                    let index = this.avgr2_courseList.indexOf(courseItem);
                    if (index > -1) {
                        this.avgr2_courseList.splice(index, 1);
                    }
                }
                else if (courseType == 'avgr3')
                {
                    //console.log("delete courseItem=", courseItem);
                    let index = this.avgr3_courseList.indexOf(courseItem);
                    if (index > -1) {
                        this.avgr3_courseList.splice(index, 1);
                    }
                }
        
            }
        
        
            change_courseName(obj:Object,evt):void{
                //console.log("change Name=", evt.target.value);
                obj['name'] =  evt.target.value;
                //console.log("change Name=", course);
                this.checkNewCourseObj(obj);
            }
        
            change_courseECTS(obj:Object,evt):void{
                //console.log("change Name=", evt.target.value);
                obj['ects'] =  evt.target.value;
                //console.log("change Name=", course);
                this.checkNewCourseObj(obj);
            }
        
            change_courseGrade(obj:Object,evt):void{
                //console.log("change Name=", evt.target.value);
                obj['grade'] =  evt.target.value;
                //console.log("change Name=", course);
                this.checkNewCourseObj(obj);
            }
        
            checkNewCourseObj(obj:Object):void{
                if (obj['name'] !='' && obj['ects']!=0 && obj['grade']!=0)
                {
                    obj['courseComplete'] = true;
                }
                else { obj['courseComplete'] = false}
            }
        */
        /*
        //------------------- proofEnglish -------------------------------------
    
        handleUpload(section:string,data): void {
            if (section=='proofEnglish') {
                this.zone.run(() => {
    
                    this.hasBaseDropZoneOver3 = null;
    
                    this.fU_response3 = data;
    
                    this.fU_progress3 = Math.floor(data.progress.percent / 100);
    
                    if (data && data.response) {
                        this.uploadedData_proofEnglish.push(data);
                        console.log("uploaded file=", data);
                    }
                });
            }
    
        }
    
        fileOverBase(section:string,e:any):void {
            if (section=='proofEnglish') {
                this.hasBaseDropZoneOver3 = e;
            }
    
        }
    
    
        deleteFile(section:string,file:any):void{
            //console.log("delete file=",file);
            if (section=='proofEnglish') {
                let index = this.uploadedData_proofEnglish.indexOf(file);
                if (index > -1) {
                    this.uploadedData_proofEnglish.splice(index, 1);
                }
            }
        }
    
    */
        //------------------- debug ---------------------------------------------
        // TODO: Remove this when we're done
        get: function () { return JSON.stringify(this.usermodel); },
        enumerable: true,
        configurable: true
    });
    LmuUserPeComponent.prototype.toggleDbg = function () {
        this.dbgIsOpen = !this.dbgIsOpen;
        console.log("this.dbgIsOpen=", this.dbgIsOpen);
    };
    return LmuUserPeComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", forms_1.FormGroup),
    __metadata("design:paramtypes", [forms_1.FormGroup])
], LmuUserPeComponent.prototype, "setForm", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array),
    __metadata("design:paramtypes", [Array])
], LmuUserPeComponent.prototype, "setFormEntries", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", forms_1.FormGroup),
    __metadata("design:paramtypes", [forms_1.FormGroup])
], LmuUserPeComponent.prototype, "setForm2", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array),
    __metadata("design:paramtypes", [Array])
], LmuUserPeComponent.prototype, "setFormEntries2", null);
LmuUserPeComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'lmu_user_pe',
        template: html,
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder])
], LmuUserPeComponent);
exports.LmuUserPeComponent = LmuUserPeComponent;
//# sourceMappingURL=ua-pe.component.js.map
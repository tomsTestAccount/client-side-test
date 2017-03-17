"use strict";
var countries_1 = require("../_models/countries");
var rt_forms_service_1 = require("../_services/rt-forms.service");
var forms_1 = require("@angular/forms");
var rt_form_validators_service_1 = require("../_services/rt-form-validators.service");
var configFile_1 = require("./configFile");
//providers:[CountryList];
//const fileUploadURL ='http://localhost:3001/upload';
//const fileUploadURL = 'http://' + ServerConfigs.fileUploadServer_ip + ':' + ServerConfigs.fileUploadServer_port + '/upload';
//srvCfg : ServerConfigs;
//const fileUploadURL = 'http://' + this.srvCfg.get_serverConfigs().url + '/upload';
//console.log("fileUploadURL=",fileUploadURL);
var fileUploadUrl = "";
function get_formEntries_apd() {
    //var formEntries_apd = [
    return [
        {
            key: 'lastname',
            title: 'Surname / Family Name *',
            type: 'text',
            validators: ' Validators.compose([Validators.required,Validators.minLength(3)])]',
            required: true
        },
        {
            key: 'firstname',
            title: 'First Name(s) / Given Name(s) *',
            type: 'text',
            validators: ' Validators.compose([Validators.required,Validators.minLength(3)])]',
            required: true
        },
        {
            key: 'gender',
            title: 'Gender *',
            type: 'select',
            validators: ' Validators.compose([Validators.required,Validators.minLength(3)])]',
            options: [
                {
                    name: 'male'
                },
                {
                    name: 'female'
                }
            ],
            required: true
        }, {
            key: 'dateOfBirth',
            title: 'Date of Birth *',
            type: 'date',
            validators: ' Validators.compose([Validators.required,Validators.minLength(3)])]',
            required: true
        },
        {
            key: 'nationality',
            title: 'Country of Nationality *',
            type: 'select',
            validators: ' Validators.compose([Validators.required,Validators.minLength(3)])]',
            options: countries_1.CountryList,
            required: true
        },
        {
            key: 'street',
            title: 'Street Name and House Number *',
            type: 'text',
            validators: ' Validators.compose([Validators.required,Validators.minLength(3)])]',
            required: true
        },
        {
            key: 'postalcode',
            title: 'Postcode / ZIP Code *',
            type: 'text',
            validators: ' Validators.compose([Validators.required,Validators.minLength(3)])]',
            required: true
        },
        {
            key: 'residence',
            title: 'Place of Residence  *',
            type: 'text',
            validators: ' Validators.compose([Validators.required,Validators.minLength(3)])]',
            required: true
        },
        {
            key: 'country',
            title: 'Country of Residence *',
            type: 'select',
            validators: ' Validators.compose([Validators.required,Validators.minLength(3)])]',
            options: countries_1.CountryList,
            required: true
        },
        {
            key: 'phone',
            title: 'Phonenumber  *',
            type: 'number',
            validators: ' Validators.compose([Validators.required,Validators.minLength(3)])]',
            required: true
        },
        {
            key: 'phone2',
            title: 'other Phonenumber  (optional)',
            type: 'number',
            validators: ' Validators.compose([Validators.required,Validators.minLength(3)])]',
            required: false
        },
        {
            key: 'email',
            title: 'Email Address *',
            type: 'email',
            validators: ' Validators.compose([Validators.required,Validators.minLength(3)])]',
            required: true
        },
        {
            key: 'email2',
            title: 'Other Email Address (optional)',
            type: 'email',
            //validators: ' Validators.compose([Validators.required,Validators.minLength(3)])]',
            required: false
        },
        {
            key: 'homepage',
            title: 'Homepage (optional)',
            type: 'text',
            //validators: ' Validators.compose([Validators.required,Validators.minLength(3)])]',
            required: false
        }
    ];
}
function get_form_ac() {
    //var formEntries_ac = [
    return [
        {
            key: 'ac_education',
            title: 'Academic Education *',
            type: 'textarea',
            validators: ' Validators.compose([Validators.required,Validators.minLength(3)])]',
            secParagraphArray: ['Please enter your previous or your current study program:'],
            required: true
        },
        {
            key: 'ac_level',
            title: 'Academic Level *',
            type: 'textarea',
            validators: ' Validators.compose([Validators.required,Validators.minLength(3)])]',
            secParagraphArray: ['Please enter the name of the academic degree you already',
                'hold or you will receive once you have finished your current studies'],
            required: true
        },
        {
            key: 'ac_institution',
            title: 'Academic Institution *',
            type: 'textarea',
            validators: ' Validators.compose([Validators.required,Validators.minLength(3)])]',
            secParagraphArray: ['Please give the exact name, location and country of the \
                               academic institution where you have received or will \
                        receive your academic degree:'],
            required: true
        }, {
            key: 'degree_conferral_date',
            title: 'Degree Conferral Date *',
            type: 'date',
            validators: ' Validators.compose([Validators.required,this.rtValidators.validateArray])]',
            secParagraphArray: ['Please indicate the date (day/month/year) in which you \
                        received or expect to receive the degree mentioned above:'],
            required: true
        },
        {
            //will not be used by rtForms mechanism --> Todo : create subForm method here for copy_of_certificate above
            key: 'degreeCertAvailable',
            title: '',
            type: 'checkbox',
            required: true
        },
        {
            key: 'copy_of_certificate',
            title: 'Copy of Degree Certificate (e.g. Bachelor) *',
            type: 'fileUpload',
            validators: ' Validators.compose([Validators.required,this.rtValidators.validateArray])]',
            secParagraphArray: ['Please upload a PDF copy of your degree certificate'],
            options: {
                url: fileUploadUrl,
                filterExtensions: true,
                allowedExtensions: ['application/pdf'],
                calculateSpeed: true,
            },
            required: true
        },
        {
            key: 'copy_of_tor',
            title: 'Transcript of Records or Other Proof of Grades *',
            type: 'fileUpload',
            validators: ' Validators.compose([Validators.required,this.rtValidators.validateArray])]',
            secParagraphArray: ['Please upload your Transcript of Records (or other proof of grades) in PDF format. \
                        The transcript must include at least 30 ECTS in Computational Methods \
                        and 30 ECTS in Data-Based Modelling (see below)'],
            options: {
                url: fileUploadUrl,
                filterExtensions: true,
                allowedExtensions: ['application/pdf', 'image/jpeg', 'image/png'],
                calculateSpeed: true,
            },
            required: true
        },
        {
            key: 'av_grade1',
            title: 'Average Grade of the Best Performance = AvGr1 *',
            type: 'number',
            validators: ' Validators.compose([Validators.required,Validators.minLength(3)])]',
            secParagraphArray: ["Please calculate the average grade from the best performance (equivalent to 150 ECTS) and enter this in the field below.",
                "Note: Applicants whose Transcript of Records does not include ECTS: A 6-semester study program equals a workload of 180 ECTS.",
                "Divide this workload between the different courses you took during your study program and upload your calculation at the end of this online application in the field Other documents"],
            required: true
        },
        {
            key: 'av_grade2',
            title: 'Computational Methods = AvGr2 *',
            validators: 'Validators.compose([Validators.required,this.rtValidators.validateCourseList])]',
            secParagraphArray: ['Please enter the courses you attended in Computational Methods', '(this includes, for example, informatics, database-orientated methods, computational statistics, optimisation)'],
            type: 'grid-box-add',
            showAverage: true,
            options: {
                whatToAdd: 'Course',
                allCols: 7,
                rowHeight: '42px',
                gridCells: [{
                        rows: 1,
                        cols: 3,
                        title: 'Course Name',
                        //secParagraph: 'E.g.: Database Systems',
                        id: 'name',
                        type: 'text',
                        placeHolder: 'E.g.: Database Systems'
                    },
                    {
                        rows: 1,
                        cols: 2,
                        title: 'ECTS',
                        //secParagraph:  'E.g.: 6 or 4.5',
                        id: 'ects',
                        type: 'number',
                        placeHolder: 'E.g.: 6 or 4.5'
                    },
                    {
                        rows: 1,
                        cols: 2,
                        title: 'Grade',
                        //secParagraph:  'E.g.: 1.5',
                        id: 'grade',
                        type: 'number',
                        placeHolder: 'E.g.: 1.5'
                    }],
            },
            required: true
        },
        {
            key: 'av_grade3',
            title: 'Data-Based Modelling = AvGr 3 *',
            secParagraphArray: ['Please enter the courses you attended in Data-Based Modelling', ' (this includes, for example, statistics, data mining, probability theory, machine learning)'],
            type: 'grid-box-add',
            validators: 'Validators.compose([Validators.required,this.rtValidators.validateCourseList])]',
            showAverage: true,
            options: {
                whatToAdd: 'Course',
                allCols: 7,
                rowHeight: '42px',
                gridCells: [{
                        rows: 1,
                        cols: 3,
                        title: 'Course Name',
                        //secParagraph: 'E.g.: Database Systems',
                        id: 'name',
                        type: 'text',
                        placeHolder: 'E.g.: Database Systems'
                    },
                    {
                        rows: 1,
                        cols: 2,
                        title: 'ECTS',
                        //secParagraph:  'E.g.: 6 or 4.5',
                        id: 'ects',
                        type: 'number',
                        placeHolder: 'E.g.: 6 or 4.5'
                    },
                    {
                        rows: 1,
                        cols: 2,
                        title: 'Grade',
                        //secParagraph:  'E.g.: 1.5',
                        id: 'grade',
                        type: 'number',
                        placeHolder: 'E.g.: 1.5'
                    }],
            },
            required: true
        },
        {
            key: 'src_bachelor',
            title: "Institution at which Bachelor's Degree was Received *",
            type: 'select',
            validators: ' Validators.compose([Validators.required,this.rtValidators.validateArray])]',
            options: [
                {
                    name: 'LMU'
                },
                {
                    name: 'other University'
                },
                {
                    name: 'University of Applied Sciences'
                },
                {
                    name: 'Other kind of Institution'
                }
            ],
            required: true
        },
        {
            key: 'lang_cert',
            title: 'Proof of English Language Proficiency *',
            type: 'fileUpload',
            validators: ' Validators.compose([Validators.required,this.rtValidators.validateArray])]',
            options: {
                url: fileUploadUrl,
                filterExtensions: true,
                allowedExtensions: ['application/pdf', 'image/jpeg', 'image/png'],
                calculateSpeed: true,
            },
            required: true
        }
    ];
}
function get_form_oi() {
    var formEntries_oi;
    return [
        {
            key: 'essay',
            title: 'Essay "Data Science * ',
            type: 'fileUpload',
            validators: ' Validators.compose([Validators.required,this.rtValidators.validateArray])]',
            secParagraphArray: ['Please submit a PDF file with an essay on Data Science in which you should look at the developments and perspectives of Data Science as well as your planned area of specialisation, and your previous experience.',
                'The essay musst not exceed 1,000 words'],
            options: {
                url: fileUploadUrl,
                filterExtensions: true,
                allowedExtensions: ['application/pdf'],
                calculateSpeed: true,
            },
            required: true
        },
        {
            key: 'further_certificates',
            title: 'Other documents *',
            type: 'fileUpload',
            validators: ' Validators.compose([Validators.required,this.rtValidators.validateArray])]',
            secParagraphArray: ['Please upload any other certificates regarding internships, vocational training, computer courses, past working experience, etc.,', ' as well as your ECTS calculation document within a single PDF file.'],
            options: {
                url: fileUploadUrl,
                filterExtensions: true,
                allowedExtensions: ['application/pdf'],
                calculateSpeed: true,
            },
            required: true
        },
        {
            key: 'other_info',
            title: 'Any other information  *',
            validators: ' Validators.compose([Validators.required,Validators.minLength(3)])]',
            type: 'textarea',
            required: true
        },
        {
            key: 'spec_interview_prov',
            title: 'Special provisions for the interview needed? (e.g. because of disability): *',
            validators: ' Validators.compose([Validators.required,Validators.minLength(3)])]',
            type: 'textarea',
            required: true
        },
        {
            key: 'notification_emailed',
            title: ' I want to receive email notifications ',
            infoText: 'You will be notified of the outcome of the aptitude assessment procedure by email. If you wish to be notified by mail, please select this field.',
            type: 'checkBox',
            validators: ' Validators.compose([Validators.required])',
            required: false
        }
    ];
}
function get_from_ac2() {
    var formEntries_ac2;
    return [
        {
            key: 'acadEdu_ac2',
            title: 'Academic Education *',
            type: 'textarea',
            validators: ' Validators.compose([Validators.required,Validators.minLength(3)])]',
            required: false
        },
        {
            key: 'acadLvl_ac2',
            title: 'Academic Level *',
            type: 'textarea',
            validators: ' Validators.compose([Validators.required,Validators.minLength(3)])]',
            required: false
        },
        {
            key: 'acadInst_ac2',
            title: 'Academic Institution *',
            type: 'textarea',
            validators: ' Validators.compose([Validators.required,Validators.minLength(3)])]',
            required: false
        },
        {
            key: 'degreeConferralDate_ac2',
            title: 'Degree Conferral Date *',
            type: 'date',
            validators: ' Validators.compose([Validators.required,Validators.minLength(3)])]',
            required: false
        },
        {
            key: 'copyOfDegreeCert_ac2',
            title: 'Copy of Degree Certificate *',
            type: 'fileUpload',
            validators: 'Validators.compose([Validators.required, this.rtValidators.validateArray])]',
            options: {
                url: fileUploadUrl,
                filterExtensions: true,
                allowedExtensions: ['application/pdf'],
                calculateSpeed: true,
            },
            required: false
        }
    ];
}
;
var dbgPrint = false;
var lmu_ua_formList = (function () {
    function lmu_ua_formList() {
        this.formSrv = new rt_forms_service_1.RtFormService();
        this.rtValidators = new rt_form_validators_service_1.rtFormValidators;
        this.srvCfg = configFile_1.constSrvUrl;
        this._fb = new forms_1.FormBuilder();
        if (dbgPrint)
            console.log("In lmu_ua_formList 1,constSrvUrl=", configFile_1.constSrvUrl);
        this.countryList = countries_1.CountryList;
        fileUploadUrl = configFile_1.constSrvUrl + '/upload';
        this.init_mainForm();
    }
    lmu_ua_formList.prototype.init_mainForm = function () {
        this.apd_formObj = this.buildFormObject_apd();
        this.ac_formObj = this.buildFormObject_ac();
        this.ac2_formObj = this.buildFormObject_ac2();
        this.oi_formObj = this.buildFormObject_oi();
        if (dbgPrint)
            console.log("In init_mainForm, this._fb=", this._fb);
        // we will initialize our main-lmu-ua-form here
        this.main_lmu_ua_form = this._fb.group({
            /*apd_formArray: this._fb.group({'apd_form':
             [this.apd_formObj.formgroup,Validators.required]}
             ),
             */
            subFormGroup_apd: this._fb.group([this.apd_formObj.formgroup, forms_1.Validators.required]),
            subFormGroup_ac: this._fb.group([this.ac_formObj.formgroup, forms_1.Validators.required]),
            subFormGroup_oi: this._fb.group([this.oi_formObj.formgroup, forms_1.Validators.required]),
            subFormGroup_ac2: this._fb.group([this.ac2_formObj.formgroup, forms_1.Validators.required])
        });
        return this.main_lmu_ua_form;
    };
    lmu_ua_formList.prototype.get_mainForm = function () {
        console.log("In get_mainForm");
        return this.main_lmu_ua_form;
    };
    //--------------------------------------------------------------------------------------------------
    lmu_ua_formList.prototype.buildFormObject_apd = function () {
        var formGroup = this.formSrv.toFormGroup(get_formEntries_apd());
        return new rt_forms_service_1.cFormObject(formGroup, get_formEntries_apd());
    };
    lmu_ua_formList.prototype.buildFormObject_ac = function () {
        var formGroup = this.formSrv.toFormGroup(get_form_ac());
        //console.log("formGroup_ac=",formGroup);
        return new rt_forms_service_1.cFormObject(formGroup, get_form_ac());
    };
    lmu_ua_formList.prototype.buildFormObject_ac2 = function () {
        var formGroup = this.formSrv.toFormGroup(get_from_ac2());
        //console.log("formGroup_ac=",formGroup);
        return new rt_forms_service_1.cFormObject(formGroup, get_from_ac2());
    };
    lmu_ua_formList.prototype.buildFormObject_oi = function () {
        var formGroup = this.formSrv.toFormGroup(get_form_oi());
        //console.log("formGroup_ac=",formGroup);
        return new rt_forms_service_1.cFormObject(formGroup, get_form_oi());
    };
    return lmu_ua_formList;
}());
exports.lmu_ua_formList = lmu_ua_formList;
//# sourceMappingURL=lmu_ua_formList.js.map
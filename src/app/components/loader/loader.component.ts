/* Core modules */
import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
/* Services */
import {ConfigService} from "../../services/config.service";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {S3Service} from "../../services/s3.service";
/* Cyphers */
import * as crypto from 'crypto-js';
/* Reactive forms modules */
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
/* Task models */
import {Instruction} from "../../models/shared/instructions";
/* Material design modules */
import {MatSnackBar} from "@angular/material/snack-bar";

/* Component HTML Tag definition */
@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

/*
 * This class implements the loader which allows to unlock the generator when an admin flag is passed via GET
 */
export class LoaderComponent {

  /* |--------- TASK SETTINGS - DECLARATION ---------| */

  /* Name of the current task */
  taskName: string;

  /* Sub name of the current task */
  batchName: string;

  /* Instructions to perform the task */
  instructions: Array<Instruction>;

  /* Amount of instructions sentences */
  instructionsAmount: number;

  /* |--------- WORKER ATTRIBUTES - DECLARATION ---------| */

  /* Unique identifier of the current worker */
  workerIdentifier: string;

  /* |--------- LOADER SETTINGS - DECLARATION ---------| */

  /* Boolean to undestand if the current worker has admin access */
  adminAccess: boolean;

  /* |--------- SERVICES & CO. - DECLARATION ---------| */

  /* Service to provide an environment-based configuration */
  configService: ConfigService;
  /* Service to provide loading screens */
  ngxService: NgxUiLoaderService;
  /* Service which wraps the interaction with S3 */
  S3Service: S3Service;
  /* Change detector to manually intercept changes on DOM */
  changeDetector: ChangeDetectorRef;

  /* |--------- CONTROL FLOW & UI ELEMENTS - DECLARATION ---------| */

  /* Variables to handle the control flow of the loader */
  selectionPerformed: boolean
  actionChosen: string
  loginPerformed: boolean
  loginSuccessful: boolean
  instructionsRead: boolean

  /* Login form and corresponding fields */
  loginForm: FormGroup;
  username: FormControl;
  password: FormControl;

  /* Snackbar reference */
  snackBar: MatSnackBar

  /* |--------- CONSTRUCTOR IMPLEMENTATION ---------| */

  constructor(
    changeDetector: ChangeDetectorRef,
    ngxService: NgxUiLoaderService,
    configService: ConfigService,
    S3Service: S3Service,
    formBuilder: FormBuilder,
    snackBar: MatSnackBar
  ) {

    /* |--------- SERVICES & CO. - INITIALIZATION ---------| */

    this.changeDetector = changeDetector;
    this.configService = configService;
    this.ngxService = ngxService;
    this.S3Service = S3Service;

    this.snackBar = snackBar

    /* |--------- TASK SETTINGS - INITIALIZATION ---------| */

    this.taskName = this.configService.environment.taskName;
    this.batchName = this.configService.environment.batchName;

    /* |--------- CONTROL FLOW & UI ELEMENTS - INITIALIZATION ---------| */

    this.selectionPerformed = false
    this.loginSuccessful = false
    this.loginPerformed = false
    this.actionChosen = null
    this.instructionsRead = false

    /* |--------- WORKER ATTRIBUTES - INITIALIZATION ---------| */

    let url = new URL(window.location.href);
    this.workerIdentifier = url.searchParams.get("workerID");

    /* |--------- LOADER SETTINGS - INITIALIZATION ---------| */

    this.adminAccess = false
    this.adminAccess = url.searchParams.get("admin") == 'true'
    this.username = new FormControl('admin', [Validators.required]);
    this.password = new FormControl('DBegSUGED5', [Validators.required]);
    this.loginForm = formBuilder.group({
      "username": this.username,
      "password": this.password
    });

  }

  /*
   * This functions loads the action chosen by worker using the shown buttons
   */
  public async loadAction(actionChosen: string) {
    this.actionChosen = actionChosen
    this.selectionPerformed = true
  }

  /*
   * This functions interacts with the admin.json file stored in the S3 bucket to understand
   * an administrator is trying to unlock the generator
   */
  public async performAdminCheck() {
    this.ngxService.startLoader('generator');
    if (this.loginForm.valid) {
      /* the data of each administrator are downloaded */
      let admins = await this.S3Service.downloadAdministrators(this.configService.environment)
      for (let admin of admins) {
        /* the data stored within admin.json file are encrypted using AES */
        let decrypted = crypto.AES.decrypt(admin["crypt"], this.password.value)
        let decryptedData = decrypted.toString(crypto.enc.Utf8)
        if (decryptedData != "") {
          let adminData = JSON.parse(decryptedData)
          if (adminData['username'] == this.username.value) {
            admin = adminData['username']
            this.loginSuccessful = true
            break;
          }
        }
      }
      this.loginPerformed = true
      this.ngxService.stopLoader('generator');
      /* A snackbar message is shown after the login check */
      if (this.loginSuccessful) {
        this.showSnackbar(`Login successful. Welcome back, ${this.username.value}.`, "Dismiss", 5000)
      } else {
        this.showSnackbar("Login unsuccessful. Please, review your credentials and try again.", "Dismiss", 5000)
      }
      this.changeDetector.detectChanges()
    }
  }

  /* |--------- OTHER AMENITIES ---------| */

  public showSnackbar(message, action, duration) {
    this.snackBar.open(message, action, {
      duration: duration,
    });
  }

  /*
   * This function retrieves the string associated to an error code thrown by a form field validator.
   */
  public checkFormControl(form: FormGroup, field: string, key: string): boolean {
    return form.get(field).hasError(key);
  }

}


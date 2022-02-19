import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IBlockHostObject } from 'src/models/page-block.model';
import { ConfigParserService, SetParameterAction } from '../services/config-parser.service';

@Component({
  selector: 'dynamic-tester',
  templateUrl: './dynamic-tester.component.html',
  styleUrls: ['./dynamic-tester.component.scss']
})
export class DynamicTesterComponent implements OnInit {

  hostObjectString: string;
  consumeString: string;
  parameterValues: SetParameterAction[];

  private _hostObject: IBlockHostObject;
  
  @Input()
  set hostObject(value: IBlockHostObject) {
    this._hostObject = value;
    console.log(`Dynamic Tester Block host object:\n${this.hostObjectString}`);
    this.onHostObjectChange();
  }
  get hostObject(): IBlockHostObject {
    return this._hostObject;
  }

  @Output() hostEvents: EventEmitter<any> = new EventEmitter<any>();

  

  constructor(private configParser: ConfigParserService) { }

  ngOnInit(): void {
    this.parameterValues = this.configParser.parseParameterValues(this.hostObject);
  }

  onHostObjectChange() {
    this.hostObjectString = JSON.stringify(this.hostObject);
    this.consumeString = JSON.stringify(this.hostObject?.parameters);
    // const parameters = this.configParser.parseSetParameters(this.hostObject);
    // if(this.setParameters !== parameters){
    //   this.setParameters = parameters;
    // }
  }
  
  setParameter(param: SetParameterAction){
    this.hostEvents.emit(param);
  }

}
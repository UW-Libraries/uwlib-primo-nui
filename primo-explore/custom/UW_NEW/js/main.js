import changeAlmaSkin from './changeAlmaSkin';
import summitTabs from './hideShowSummit';
import sFDE from './singleFullDisplayEdits';

let app = angular.module('viewCustom',['angularLoad', summitTabs.name, changeAlmaSkin.name, sFDE.name]);



var sheetID = '1Aw14HArcUOrP8acyO98gUAV43q9NUS-0wHbi9xM36xw';

function onOpen() {  
  SpreadsheetApp.getUi().createMenu('Custome Tools').addItem('WebPage', 'DoDisplayIndex').addToUi();
}

function doGet(e) {
  var spreadName = SpreadsheetApp.openById(sheetID);
  var sheetName = spreadName.getSheetByName('cms-data');
  var arrayKeys = GetArrayKeys();
  var indexSite = HtmlService.createTemplateFromFile('index');  
  var pageData = GetIndexContent();    
  indexSite.data = { pageData:pageData, arrayKeys:arrayKeys, keysLen:sheetName.getLastColumn() };
  var pageSite = indexSite.evaluate().setWidth(1080).setHeight(780);  
  return pageSite;
}

function DoDisplayIndex() {
  var spreadName = SpreadsheetApp.openById(sheetID);
  var sheetName = spreadName.getSheetByName('cms-data');
  var arrayKeys = GetArrayKeys();
  var indexSite = HtmlService.createTemplateFromFile('index');  
  var pageData = GetIndexContent();    
  indexSite.data = { pageData:pageData, arrayKeys:arrayKeys, keysLen:sheetName.getLastColumn() };
  var pageSite = indexSite.evaluate().setWidth(1080).setHeight(780);
  SpreadsheetApp.getUi().showModalDialog(pageSite, ' ');
}
function GetIndexContent() {
  var spreadName = SpreadsheetApp.openById(sheetID);
  var sheetName = spreadName.getSheetByName('cms-data');
  var arrayKeys = GetArrayKeys();    
  var indexData = {};
  var articleData = sheetName.getRange(2, 1, sheetName.getLastRow()-1, sheetName.getLastColumn()).getValues();    
  return articleData;
}

function GetArrayKeys() {
  var spreadName = SpreadsheetApp.openById(sheetID);
  var sheetName = spreadName.getSheetByName('cms-data');
  var getKeys = sheetName.getRange(1, 1, 1, sheetName.getLastColumn()).getValues();    
  var arrayKeys = {};
  for ( i = 0; i < sheetName.getLastColumn(); i++ ) {        
    arrayKeys[i] = getKeys[0][i];      
  }
  return arrayKeys;
}

function DoGetArticle(inData) {
  var spreadName = SpreadsheetApp.openById(sheetID);
  var sheetName = spreadName.getSheetByName('cms-data');
  var articlesList = sheetName.getRange(2, 1, sheetName.getLastRow()-1, sheetName.getLastColumn()).getValues();
  var articleData = {};
  for ( i = 0; i < articlesList.length; i++ ) {
    if ( articlesList[i][0] == inData ) {      
      for ( j = 0; j < sheetName.getLastColumn(); j++ ) {      
        articleData[j] = articlesList[i][j];
      }
    }
  }  
  return { title:articleData[2], description:articleData[3], content:articleData[4] };
}
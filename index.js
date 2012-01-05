#!/usr/bin/env node

/**
* 2011 Peter 'Pita' Martischka
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS-IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

var parser = require('./parser');
var writer = require('./writer');
var fs = require("fs");
var path = require("path");

if(process.argv.length != 4)
{
  console.error("Usage: doc.md $SRCFOLDER $DESTFOLDER");
  process.exit(1);
}

var srcFolder = process.argv[2];
var destFolder = process.argv[3];

//check src Directory
var srcValid = false;
try
{
  srcValid = fs.lstatSync(srcFolder).isDirectory();
} catch(e) {};

if(!srcValid)
{
  console.error("'"+srcFolder + "' is no directory!");
  process.exit(1);
}

//check dest directory
var destValid = false;
try
{
  destValid = fs.lstatSync(destFolder).isDirectory();
} catch(e) {};

if(!destValid)
{
  console.log("'"+destFolder + "' is no directory! I'll create it for you.");
  fs.mkdirSync(destFolder);
}

//start recursive function 
doFolder(srcFolder, ".");

function doFolder(srcFolder, folder)
{
  //get the path and files
  var folderPath = path.normalize(srcFolder + "/" + folder);
  var files = fs.readdirSync(folderPath);
  
  //go trough all files in this folder
  for(var i in files)
  {  
    var absolutePath = path.normalize(folderPath + "/" + files[i]);
    var relativePath = path.normalize(folder + "/" + files[i]);
    var isDirectory = fs.lstatSync(absolutePath).isDirectory();
    
    //if this is a folder, call function recursively
    if(isDirectory)
    {
      doFolder(srcFolder, relativePath);
    }
    //if this is a javascript file, parse it
    else if(absolutePath.search(/.js$/) != -1)
    {
      var parsedObj = parser.parseFile(srcFolder, relativePath);
      writer.parsedObj2md(destFolder, parsedObj);
    }
  }
}

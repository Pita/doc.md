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

var fs = require("fs");
var path = require("path");

/**
 * Writes the parsedObject into a markdown file
 * @param docFolder {String} the destination Folder of the documenation
 * @param parsedObj {Object} the Parsed Obj
 */
exports.parsedObj2md = function(docFolder, parsedObj)
{
  var markdownTxt = "";
  
  //Module name
  markdownTxt += "# " + parsedObj.name + "\n";
  
  //Require 
  markdownTxt += "`require(" + JSON.stringify(parsedObj.path) + ");`\n\n";
  
  //DocumentComment
  if(parsedObj.comment)
    markdownTxt += parsedObj.comment + "\n\n";
  
  //move all functions in an array
  var funcArray = [];
  for(var i in parsedObj.functions)
  {
    var arrayObj = parsedObj.functions[i];
    arrayObj.name = i;
    funcArray.push(arrayObj);
  }
    
  //Functions header
  if(funcArray.length > 0)
    markdownTxt += "## Functions\n\n";
  
  //sort that array by function name
  funcArray.sort(function (a,b)
  {
    var sortedArray = [a.name, b.name];
    sortedArray.sort();
    
    return sortedArray[0] == a.name ? -1 : 1;
  });
  
  //go trough all functions
  for(var i in funcArray)
  {
    //create a array with the names of all parameter
    var paramArray = [];
    for(var j in funcArray[i].param)
    {
      paramArray.push(funcArray[i].param[j].name);
    }
    
    //function header
    markdownTxt += "### " + funcArray[i].name + " (" + paramArray.join(", ") + ")\n";
    
    //function comment
    if(funcArray[i].comment)
      markdownTxt += funcArray[i].comment + "\n";
      
    markdownTxt += "\n";
    
    for(var j in funcArray[i].param)
    {
      //begining of line and name
      markdownTxt += "* **" + funcArray[i].param[j].name + "** ";
 
      if(funcArray[i].param[j].type)
        markdownTxt += "*(" + funcArray[i].param[j].type + ")* ";
        
      if(funcArray[i].param[j].comment)
        markdownTxt += funcArray[i].param[j].comment;
      else
        markdownTxt += "*No description*";
        
      markdownTxt += "\n";
    }
    
    markdownTxt += "\n";
  }
  
  //move all variables in an array
  var varArray = [];
  for(var i in parsedObj.variables)
  {
    var arrayObj = parsedObj.variables[i];
    arrayObj.name = i;
    varArray.push(arrayObj);
  }
    
  //Variables header
  if(varArray.length > 0)
    markdownTxt += "##Variables\n\n";
  
  //sort that array by variable name
  varArray.sort(function (a,b)
  {
    var sortedArray = [a.name, b.name];
    sortedArray.sort();
    
    return sortedArray[0] == a.name ? -1 : 1;
  });
  
  //go trough all variables
  for(var i in varArray)
  {
    markdownTxt += "### " + varArray[i].name + " ";
    
    if(varArray[i].type)
      markdownTxt += "*(" + varArray[i].type + ")*";
      
    markdownTxt += "\n";
    
    if(varArray[i].comment)
      markdownTxt += varArray[i].comment;
      
    markdownTxt += "\n\n";
  }
  
  var mdPath = path.normalize(docFolder + "/" + parsedObj.path + ".md");
  var folder = path.dirname(mdPath);
 
  //ensure that the folder exists 
  if(!path.existsSync(folder))
  {
    fs.mkdirSync(folder, "755");
  }
  
   console.log("write file '" + mdPath + "'...");
  
  //write file
  fs.writeFileSync(mdPath, markdownTxt, "utf8");
  
  console.log("done");
}

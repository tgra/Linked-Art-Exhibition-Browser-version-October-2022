import type { NextApiRequest, NextApiResponse } from 'next'
import { exit } from 'process';

var fs = require('fs');


function get_gender(person:any){
  var return_value = "";
  if ("classified_as" in person){
    person.classified_as.forEach(function (type:any) {   
      if (type.classified_as[0]._label == "Gender"){ return_value = type._label;}
       })}
  return return_value;
}

function get_nationality(person){
  var return_value = "";
  if ("classified_as" in person){
    person.classified_as.forEach(function (type: any) { 
      if (type.classified_as[0]._label == "Nationality"){ return_value = type._label;}
       })}
  return return_value;
}


export default function handler(req: NextApiRequest, res: NextApiResponse) {
    
    let dir = "../data/person";
    let persons = new Array
 
    fs.readdir(dir, function (err:any, files:any) { 
        if (err) {
            console.error("Could not list the directory.", err);
            process.exit(1);
          }

          let meta = {
            success: true,
            totalCount: 0, 
          }
          // total number of files in dir
          meta.totalCount = files.length;
         
          files.forEach(function (file:any) {

            let filepath = dir + '/' + file;
            let rawdata = fs.readFileSync(filepath);
            let person = JSON.parse(rawdata);
            let _label = ("_label" in person) ? person._label : "identified_by" in person && person.identified_by[0].type == 'Name' ? person.identified_by[0].content : "";
            let filename = file;
            let id = file.split('.')[0];

            let name = ("identified_by" in person && person.identified_by[0].type == 'Name' ) ? person.identified_by[0].content : ""
            let id_uri = person.id.split(/\:\d*/)[2]
            let gender = get_gender(person)
            let nationality = get_nationality(person)
              
              

              let born = (("born" in person) &&  ("timespan" in person.born)) ?  person.born.timespan.identified_by[0].content : ""
              let died = (("died" in person) &&  ("timespan" in person.died)) ?  person.died.timespan.identified_by[0].content : ""


              
              persons.push({id:id,filename:filename,_label:_label, id_uri:id_uri, name:name, born: born, died: died, gender:gender,nationality:nationality});
               


              
            persons.push({id:id, _label:_label, filename:filename});
      });

      res.status(200).json({persons});
      exit 
     
    });
    

}




import type { NextApiRequest, NextApiResponse } from 'next'
import { exit } from 'process';

var fs = require('fs');

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
              
            persons.push({id:id, _label:_label, filename:filename});
      });

      res.status(200).json({persons});
      exit 
     
    });
    

}




const express = require('express');
const router = express.Router();
const fs = require('fs')
const axios = require('axios')


router.use('/', function(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");

    console.log("my location is","e");

   parseJSON()
   .then((data) => {
       return flattenData(data)
   })
   .then((flattendData) => {
        res.status(200).json({"err":"hello","data":flattendData,"test":"my test"});
   })


});

async function flattenData(data) {
    return new Promise((resolve, reject) => {
        try {
            const outdata = JSON.parse(data)
            const filter_rows = outdata[2].data 

            const outRows=[]
            let nv = {name:'',value:''}
            
            filter_rows.map((row,i) => {
                filter_rows[i].post_content = row.post_content.replace(/\n/g, "^");
                if ((row.post_parent == 2415) || (row.post_parent == 2550)) {
                    if (row.post_type == "feedback") {
                        const outRow =[]            
                        //outRows.push(row)
                        console.log('.........',row.post_parent)
                        console.log('.........',i)
                        let strt = row.post_content.indexOf("Family Name")
                        strt = row.post_content.indexOf("&gt;",strt)
                        let end = row.post_content.indexOf("^",strt)
                        let content = row.post_content.substring(strt+5,end)
                        console.log('....',content)
                        nv ={}
                        nv.name = "Family Name"
                        nv.value = content
                        outRow.push(nv)
                        
                        strt = row.post_content.indexOf("&gt;",end)
                        end = row.post_content.indexOf("^",strt)
                        content = row.post_content.substring(strt+5,end)
                        nv ={}
                        nv.name = "Father's Name"
                        nv.value = content 
                        outRow.push(nv)
                        outRows.push(outRow)

                    }
                } else {
                    //filter_rows.splice(i,1)
                }
            })

            resolve(outRows)
        } catch (err) {
            reject(err)
        }
    })
}

async function parseJSON() {
    inp_file = 'C:\\Users\\PCWIN10\\Documents\\GitHub\\utils\\input\\wp_lqrm_posts.json'

    try{
        return new Promise((resolve, reject) => {
            fs.readFile(inp_file, 'utf8', function (err, data) {
                if (err) {
                    reject(err)
                }
                resolve(data)
            })
        })
    } catch (err) {
        console.error(err)
    }
    /*
    .then((data) => {
        console.log('my data',data)
        return data 
    })
    .catch((e) => {
        console.log('error',e)
    })*/

}


function readJSON() {
    input_file = 'C:\\Users\\PCWIN10\\Documents\\GitHub\\utils\\input\\wp_lqrm_posts.json'
    console.log('reading file...',input_file)
    fs.readFileSync(input_file, 'utf8', (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err)
            return
        }
        console.log('File data:', 'd') 
        return jsonString

    })

}


module.exports = router;	
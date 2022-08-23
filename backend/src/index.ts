import express , {Request,Response} from "express";
import cors from "cors"
import dotenv from "dotenv";
import mongoose from "mongoose";
import auth from "./routes/auth"
import user from "./routes/user"
import property from "./routes/property";
import multer from "multer";
import config from "../config";
import {v4 as uuid} from "uuid"
import { response } from "./types/types";
import {Storage} from "@google-cloud/storage"
import path from "path"
import axios from "axios"
//@ts-ignore
import pdf from "pdf-creator-node"

import PDFDocument from "pdfkit"
import PdfTable from "voilab-pdf-table"
import Property from "./model/Property";


let students = [
  {name: "Joy",
   email: "joy@example.com",
   city: "New York",
   country: "USA"},
  {name: "John",
   email: "John@example.com",
   city: "San Francisco",
   country: "USA"},
  {name: "Clark",
   email: "Clark@example.com",
   city: "Seattle",
   country: "USA"},
  {name: "Watson",
   email: "Watson@example.com",
   city: "Boston",
   country: "USA"},
  {name: "Tony",
   email: "Tony@example.com",
   city: "Los Angels",
   country: "USA"
}];


const app = express();
dotenv.config();
app.use(cors())
app.use(express.json({limit: "2mb"}))
app.use("/image", express.static("uploads"))
app.use(express.urlencoded({
  extended: true
}))



const connect = () => {
  try { mongoose.connect(`mongodb+srv://${process.env.MONGO_USERID}:${process.env.MONGO_PASSWORD}@cluster0.segtq.mongodb.net/test`);
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

app.use("/auth",auth)
app.use("/user",user)
app.use("/property", property)




const storage = new Storage({
  keyFilename : path.join(__dirname, "../image-upload-358514-053689216333.json"),
  projectId: "image-upload-358514"
});


async function uploadFile(bucketName:string,filePath:string, destFileName:string) {
  await storage.bucket(bucketName).upload(filePath, {
    destination: destFileName,
  });

  console.log(`${filePath} uploaded to ${bucketName}`);
}


async function fetchImage(src:any) {
  const image = await axios
      .get(src, {
          responseType: 'arraybuffer'
      })
  return image.data;
}




async function buildPDF(data: any, dataCallback: any, endCallback: any) {
 
  
  const doc = new PDFDocument({ bufferPages: true, font: 'Courier' });
  doc
  .image(path.join(__dirname, "logo.png"),{
    fit: [250, 300],
  })
 
 

  doc.on('data', dataCallback);
  doc.on('end', endCallback);
  
  doc.text(`\n`);
  doc.text(`\n`);
  doc.text(`\n`);

  let table = new PdfTable(doc, {
    bottomMargin: 30,
});
  let table2 = new PdfTable(doc, {
    bottomMargin: 30
});
  let table3 = new PdfTable(doc, {
    bottomMargin: 30
});


  table
            // add some plugins (here, a 'fit-to-width' for a column)
            .addPlugin(new (require('voilab-pdf-table/plugins/fitcolumn'))({
                column: 'description'

            }))
            // set defaults to your columns
            .setColumnsDefaults({
                headerBorder: 'B',
                align: 'center',
                headerBorderOpacity: 1,
                headerHeight: 20,
                border: "B"
            })
            // add table columns
            .addColumns([
                {
                    id: 'location',
                    header: 'Location',
                    width: 100

                },
                {
                    id: 'propertyt',
                    header: 'Property Type',
                    width: 100
                },
                {
                    id: 'propertyf',
                    header: 'Property For',
                    width: 100
                },
                {
                    id: 'purpose',
                    header: 'Property Use',
                    width: 100
                },
                {
                    id: 'ybuilt',
                    header: 'Year Built',
                    width: 100,

                }
            ])
            // add events (here, we draw headers on each new page)
            .onPageAdded(function (tb) {
                tb.addHeader();
            });

  table2
            // add some plugins (here, a 'fit-to-width' for a column)
            .addPlugin(new (require('voilab-pdf-table/plugins/fitcolumn'))({
                column: 'description'

            }))
            // set defaults to your columns
            .setColumnsDefaults({
                headerBorder: 'B',
                align: 'center',
                headerBorderOpacity: 1,
                headerHeight: 20,
                border: "B"
            })
            // add table columns
            .addColumns([
                {
                    id: 'ypb',
                    header: 'Year Property Built',
                    width: 100

                },
                {
                    id: 'area',
                    header: 'Area',
                    width: 100
                },
                {
                    id: 'ct',
                    header: 'Construction Type',
                    width: 100
                },
                {
                    id: 'zoning',
                    header: 'Zoning',
                    width: 100
                },
                {
                    id: 'sewer',
                    header: 'Sewer',
                    width: 100,

                }
            ])
            // add events (here, we draw headers on each new page)
            .onPageAdded(function (tb) {
                tb.addHeader();
            });


table3
            // add some plugins (here, a 'fit-to-width' for a column)
            .addPlugin(new (require('voilab-pdf-table/plugins/fitcolumn'))({
                column: 'description'

            }))
            // set defaults to your columns
            .setColumnsDefaults({
                headerBorder: 'B',
                align: 'center',
                headerBorderOpacity: 1,
                headerHeight: 20,
                border: "B"
            })
            // add table columns
            .addColumns([
                {
                    id: 'electricity',
                    header: 'Electricity',
                    width: 100,
                },
                {
                    id: 'renovation',
                    header: 'Renovation',
                    width: 100,
                }
            ])
            // add events (here, we draw headers on each new page)
            .onPageAdded(function (tb) {
                tb.addHeader();
            });
        // draw content, by passing data to the addBody method
        table.addBody([
            { 
            location: ` \n ${data.address_1}, ${data.address_2}, ${data.city}, ${data.state}, ${data.country}, ${data.zip_code}
            `, 
            propertyt: ` \n ${data.type}`, 
            propertyf: ` \n ${data.for}`,
            purpose: ` \n ${data.space_use}`,
            ybuilt: ` \n ${data.year_built}`
          },
       
        ]);

        doc.text("\n")
        doc.text("\n")
        doc.text("\n")


        table2.addBody([
            { 
            ypb: ` \n ${data.year_built},`, 
            area: ` \n ${data.building_size}`, 
            ct: ` \n ${data.construction_type}`,
            zoning: ` \n ${data.zoning}`,
            sewer: ` \n ${data.sewer}`,
          },
       
        ]);

        doc.text("\n")
        doc.text("\n")
        doc.text("\n")


        table3.addBody([
            { 
            electricity: ` \n ${data.electricity}`,
            renovation: ` \n ${data.renovated? data.renovated_year: "No"}`
          },
       
        ]);


  
        doc.text(`\n`);
        doc.text(`\n`);
        doc.fontSize(20).translate(-100, 0).text(`Property: ${data.title}`)
        doc.fontSize(15).text(`Owner: ${data.title}`)
        doc.fontSize(15).text(`Phone: ${data.title}`)
        doc.fontSize(15).text(`Email: ${data.title}`)
        doc.text(`\n`);

  


    try {
      console.log(`https://storage.googleapis.com/clp-image/${data.photos[0]}`);
      const logo = await fetchImage(`https://storage.googleapis.com/clp-image/${data.photos[0]}`);
  
      
      doc.addPage()
      doc
        .image(path.join(__dirname, "logo.png"),{
          fit: [250, 300],
        })
      doc.text("\n")
      doc.text("Property Image")
      doc.text("\n")
      doc.image(await logo, {
        fit: [400,500],

      });
    } catch (error) {
      console.log(`https://storage.googleapis.com/clp-image/${data.photos[0]}`);
      
    }


  
  doc.end();
}




app.get("/download/:id", async (req:Request,res:Response)=>{

  let id = req.params.id

  const stream = res.writeHead(200, {
    'Content-Type': 'application/pdf',
    'Content-Disposition': `attachment;filename=property.pdf`,
  })


  await Property.findById(id)
  .then((res:any) => {

   
    buildPDF(
      res,
      (chunk: any) => stream.write(chunk),
      () => stream.end()
    );

  })

 
  


  


})



app.listen(5000, () => {
    connect();
    console.log(`Server Running at http://127.0.0.1:5120`);
  });
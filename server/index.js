// Section 1
const express = require('express');
const cors = require('cors');
const fs = require('fs');

const bodyParser = require('body-parser');


// Section 2
const app = express();
app.use(cors());
app.use(express.json())
app.use(bodyParser.json());
app.use(express.urlencoded({extended:false}))
// Section 3

app.get('/', (req, res) => { 
  res.send("<h1>Server Page</h1>");
});

app.post('/createsettingtxt', (req, res)=>{
  console.log(req.body)

  let inputText = `[{
    "headerName": "${req.body.headerName}",
    "inOut": "${req.body.inOut}",
    "terminalName": "${req.body.terminalName}",
    "gateName": "${req.body.gateName}",
    "stid": "${req.body.stid}",
    "logo": "${req.body.logo}"
  }]`
  
  fs.writeFile("settings_docs/local-settings.json", inputText2, function(err) {
    if(err) {
      return console.log(err);
    } else {
      res.status(200).json({
        code: "001",
        msg: "Data Local Setting Berhasil disimpan",
        data: req.body,
      });
      console.log("The file was saved!");
    }
  });
})

app.get('/readsettingtxt', (req, res)=>{
  fs.readFile('settings_docs/local-settings.json', 'utf8', function(err, data){
      
    // Display the file content
    if(err){
      console.log(err)
    }else{
      let result = JSON.parse(data)
      res.status(200).json({
        code: "001",
        msg: "Data Header Found, Feel Free to Use It..",
        data: result,
      });
    }
  });
})

app.post('/savescandatatxt', (req, res)=>{
  const { Status, Lane, scanRFIDTime, RFIDNumb, ReadrfidDate, GateTimes, truck, containerNumb, CMSEIRDatePrint, STIDIntegrasiDate, successDate } =
  req.body;
  data =`Status ${Status} | Scan RFID Tanggal ${scanRFIDTime} | RFID Terbaca ${RFIDNumb} Tanggal ${ReadrfidDate} | Prose Gate Dilakukan Tanggal ${GateTimes} | Sukses Proses GIN/GOUT, Truck ${truck} Container ${containerNumb} Tanggal ${GateTimes} | Cetak CMS/EIR ${CMSEIRDatePrint} | Proses Integrasi STID Tanggal ${STIDIntegrasiDate} | Proses Berhasil/Gagal Tanggal ${successDate}`
  let currentdate = new Date();
  let ScanDate = `${currentdate.getDate()}-${currentdate.getMonth()+1}-${currentdate.getFullYear()}`;
  let FullScanDate = `${currentdate.getDate()}-${currentdate.getMonth()+1}-${currentdate.getFullYear()} ${currentdate.getHours()} ${currentdate.getMinutes()} ${currentdate.getSeconds()}`;
  // let dir = `logger/${ScanDate}`;
  let dirsuccessgin = `logger/SUCCESS GIN/${ScanDate}`;
  let dirsuccessgout = `logger/SUCCESS GOUT/${ScanDate}`;
  let dirgagal = `logger/GAGAL GATE/${ScanDate}`;
  if(Lane === "CMS"){
    if (!fs.existsSync(dirsuccessgin)){
      fs.mkdirSync(dirsuccessgin);
      try {
        console.log(data);
        fs.writeFile('logger/SUCCESS GIN/'+ScanDate+'/'+req.body.Lane+' PROCESS GATE '+req.body.RFIDNumb+' '+FullScanDate+'.txt', data, function(err) {
          if(err) {
            return console.log(err);
          } else {
            res.status(200).json({
              code: "001",
              msg: "Data Gate In Berhasil digenerate ke LOG",
              data: req.body,
            });
            console.log("The Log file was saved!");
          }
        });
      } catch (error) {
        console.log(error);
        res.status(500).json({
          code: "0",
          msg: error.message,
        });
      }
    } else{
      try {
        console.log(data);
        fs.writeFile('logger/SUCCESS GIN/'+ScanDate+'/'+req.body.Lane+' PROCESS GATE '+req.body.RFIDNumb+' '+FullScanDate+'.txt', data, function(err) {
          if(err) {
            return console.log(err);
          } else {
            res.status(200).json({
              code: "001",
              msg: "Data Gate In Berhasil digenerate ke LOG",
              data: req.body,
            });
            console.log("The Log file was saved!");
          }
        });
      } catch (error) {
        console.log(error);
        res.status(500).json({
          code: "0",
          msg: error.message,
        });
      }
    }
    
  } else if(Lane === "EIR"){
    if (!fs.existsSync(dirsuccessgout)){
      fs.mkdirSync(dirsuccessgout);

      console.log(data);
      try {
        console.log(data);
        fs.writeFile('logger/SUCCESS GOUT/'+ScanDate+'/'+req.body.Lane+' PROCESS GATE '+req.body.RFIDNumb+' '+FullScanDate+'.txt', data, function(err) {
          if(err) {
            return console.log(err);
          } else {
            res.status(200).json({
              code: "002",
              msg: "Data Gate Out Berhasil digenerate ke LOG",
              data: req.body,
            });
            console.log("The Log file was saved!");
          }
        });
  
      } catch (error) {
        console.log(error);
        res.status(500).json({
          code: "0",
          msg: error.message,
        });
      }
    } else{
      try {
        console.log(data);
        fs.writeFile('logger/SUCCESS GOUT/'+ScanDate+'/'+req.body.Lane+' PROCESS GATE '+req.body.RFIDNumb+' '+FullScanDate+'.txt', data, function(err) {
          if(err) {
            return console.log(err);
          } else {
            res.status(200).json({
              code: "002",
              msg: "Data Gate Out Berhasil digenerate ke LOG",
              data: req.body,
            });
            console.log("The Log file was saved!");
          }
        });
  
      } catch (error) {
        console.log(error);
        res.status(500).json({
          code: "0",
          msg: error.message,
        });
      }
    }
  } else if (Lane ==="FAILED") {
    if (!fs.existsSync(dirgagal)){
      try {
        fs.mkdirSync(dirgagal);

        console.log(data);
        fs.writeFile('logger/GAGAL GATE/'+ScanDate+'/'+req.body.Lane+' PROCESS GATE '+req.body.RFIDNumb+' '+FullScanDate+'.txt', data, function(err) {
        if(err) {
          return console.log(err);
        } else {
          res.status(200).json({
            code: "003",
            msg: "Proses Gate Gagal, data Berhasil digenerate ke LOG",
            data: req.body,
          });
          console.log("The Log file was saved!");
        }
      });
      } catch (error) {
        console.log(error);
        res.status(500).json({
          code: "0",
          msg: error.message,
        });
      }
    } else {
      console.log(data);
      fs.writeFile('logger/GAGAL GATE/'+ScanDate+'/'+req.body.Lane+' PROCESS GATE '+req.body.RFIDNumb+' '+FullScanDate+'.txt', data, function(err) {
        if(err) {
          return console.log(err);
        } else {
          res.status(200).json({
            code: "003",
            msg: "Proses Gate Gagal, data Berhasil digenerate ke LOG",
            data: req.body,
          });
          console.log("The Log file was saved!");
        }
      });
    }

  } else {
    console.log("gagal proses generate LOG")
    res.status(400).json({
      code: "004",
      msg: "Ops, Something wrong with STID Number, Please Try Again",
      data: req.body,
    });
  }
});

app.get('/ReadLogLastData', (req, res)=>{
  fs.readFile('logger/LAST DATA/lastData.json', 'utf8', function(err, data){
      
    // Display the file content
    if(err){
      console.log(err)
    }else{
      let result = JSON.parse(data)
      res.status(200).json({
        code: "001",
        msg: "Last Data Found.",
        data: result,
      });
    }
  });
})
app.post('/SaveLogLastData', (req, res)=>{

  const { truck_no, container_no, gate_time } = req.body;

  let ndata =
  `{
    "truck_no": "${req.body.truck_no}",
    "container_no": "${req.body.container_no}",
    "gate_time": "${req.body.gate_time}"
  }`

  fs.readFile('logger/LAST DATA/lastData.json', 'utf8', function(err, data){
      
    // Display the file content
    if(err){
      console.log(err)
    }else{
      var obj = JSON.parse(data);
      var nobj = JSON.parse(ndata);
      obj['LastData'].push(nobj);
      jsonStr = JSON.stringify(obj);
      fs.writeFile('logger/LAST DATA/lastData.json', jsonStr, function(err) {
        if(err) {
          return console.log(err);
        } else {
          res.status(200).json({
            code: "001",
            msg: "Last Data Saved",
            data: req.body,
          });
          console.log("Last Data Saved!");
        }
      });
      res.status(200).json({
        code: "001",
        msg: "Last Data Saved.",
        data: obj,
      });
    }
  });

});
// Section 4
app.listen(8080, () => {
  console.log('server started on port 8080');
});
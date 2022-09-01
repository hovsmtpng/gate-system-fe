import React, { useState, useEffect } from 'react'
import { Row,Col } from 'react-bootstrap'
import axios from 'axios'

// AOS
import AOS from 'aos'
import '../../../node_modules/aos/dist/aos'
import '../../../node_modules/aos/dist/aos.css'

//swiper
import SwiperCore, { Navigation } from 'swiper';

// Import Swiper styles
import 'swiper/swiper-bundle.min.css'
import 'swiper/components/navigation/navigation.scss';

import onScan from "onscan.js";
// import { detachFrom } from "onscan.js";

import { useLocation, useNavigate } from "react-router-dom";

// let navigation = useNavigate();

// install Swiper modules
SwiperCore.use([Navigation]);


const Display =  () => {
    
    const state = useLocation();
    console.log("statsss", state);

    let navigate = useNavigate();

    const styleTableHead ={
        fontSize: '12px',
        FontWeight: 'Bold',
    }
    const styleTableBody ={
        fontSize: '11px',
        fontWeight:'bold',
    }
    const styleCardTitle ={
        fontSize: '18px',
        fontWeight:'Bold',
    }
    const CardTitle={
        fontSize: '28px',
        fontWeight:'Bold',
    }
    const stylePleaseScan ={
        fontSize: '35px',
        width:'100%',
        fontWeight:'Bold',
        color:'yellow',
        fontStyle:'italic',
        marginTop:'24px'
    }
    const styleSilahkanScan ={
        fontSize: '35px',
        width:'100%',
        color:'white',
        textAlign: 'center',
        marginTop:'-24px'
    }
    const BodySilahkanScan ={
        backgroundColor:'black'
    }


    useEffect(() => {
        AOS.init({
                startEvent: 'DOMContentLoaded',
                disable:  function() {
                var maxWidth = 996;
                return window.innerWidth < maxWidth;
                },
                throttleDelay: 10,
                once: true,
                duration: 700,
                offset: 10
        });
    })
    // eslint-disable-next-line
    const [detailInformation, setdetailInformation] = useState({});
    const [LastData, setLastData]=useState([]);

    // const isMountedRef = useRef(null);
    // eslint-disable-next-line
    const fetchLastData = async () => {
        try {
            await axios.get('http://localhost:8080/ReadLogLastData')
            .then(response =>{
                console.log("Last Data",response.data.data.LastData)
                setLastData(response.data.data.LastData)
            })
        } catch (error) {
            
        }
    }

    const fetchTheData = async () => {
        try {
            await axios.get('http://localhost:8080/readsettingtxt')
            .then(response => {
                console.log("responseHeader", response.data.data[0]);
                try {
                    var IndoText = document.getElementById('textbhsindo');
                    var EnglishText = document.getElementById('textbhsinggris');

                    if (onScan.isAttachedTo(document) === false) {
                        onScan.attachTo(document, {
                            suffixKeyCode:[13],
                            reactToPaste:false,
                            onScan: function(sCode, iQty) { // Alternative to document.addEventListener('scan')
                                console.log('Scanned: ' + iQty + 'x ' + sCode);
                                console.log("OnScanRespHeader", response.data.data[0]);
                                let currentdate = new Date();
                                let ScanDate = `${currentdate.getDate()}/${currentdate.getMonth()+1}/${currentdate.getFullYear()} ${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`;

                                // setTimeout(function() {
                                    IndoText.innerHTML = "Membaca data STID";
                                    EnglishText.innerHTML = "Read STID data";
                                // }, 3000);
                                setTimeout(function() {
                                    IndoText.innerHTML = "Silahkan tunggu Proses Gate";
                                    EnglishText.innerHTML = "Please Wait for Gate Process";
                                }, 2000);
                                // this.displaytextIndo = setdisplayTextIndo("Silahkan tunggu Proses Gate");
                                // this.displaytextEnglish = setdisplayTextEnglish("Please Wait for Gate Process");

                                setTimeout(function(){
                                    // eslint-disable-next-line
                                    let cekRfId = axios
                                    .post(
                                        // "http://localhost:8013/api/cekRfId",
                                        "https://billingdev.ilcs.co.id:8013/api/cekRfId",
                                        {
                                            terminalCode: response.data.data[0].terminalName,
                                            rfIdNumber: sCode.toUpperCase(),
                                            activity: response.data.data[0].inOut, //TI TO
                                            lane: response.data.data[0].gateName, //GIN GOUT
                                            weight: "",
                                            isStid: response.data.data[0].stid, // Y N
                                        }
                                    )
                                    .then((resp) => {
                                        if(resp.data.code === "01"){
                                            IndoText.innerHTML = "[01] Proses Gate Berhasil";
                                            EnglishText.innerHTML = "Gate process is Successful";
                                        } else if (resp.data.code === "02"){
                                            // setTimeout(function() {
                                                // setTimeout(function() {
                                                    IndoText.innerHTML = "<h3 style='font-size:35px; color:red'>[02] Proses Gate Gagal</h3>";
                                                    EnglishText.innerHTML = "<h3 style='font-size:35px; color:red'>Gate process is Failed</h3>";
                                                    
                                            // }, 2000);
                                                // this.displaytextIndo = setdisplayTextIndo("Proses Cetak CMS/EIR");
                                                // this.displaytextEnglish = setdisplayTextEnglish("Print CMS/EIR");
                                        // }, 2000);
                                        } else if (resp.data.code === "03"){
                                            // setTimeout(function() {
                                                IndoText.innerHTML = "<h3 style='font-size:35px; color:red'>[03] Proses Gate Gagal</h3>";
                                                EnglishText.innerHTML = "<h3 style='font-size:35px; color:red; font-weight:bold'>Gate process is Failed</h3>";

                                            // }, 2000);
                                        } else {
                                            // setTimeout(function() {
                                                IndoText.innerHTML = "<h3 style='font-size:35px; color:red'>[04] Proses Gate Gagal</h3>";
                                                EnglishText.innerHTML = "<h3 style='font-size:35px; color:red'>Gate process is Gagal</h3>";
                                            // }, 2000);
                                        }

                                        console.log(resp);
                                        // console.log("--------------")
                                        // console.log(resp.data);
                                        // console.log("--------------")
                                        // console.log(resp.data.code); //ok
                                        // console.log("--------------")
                                        // console.log(resp.data.data); //ok
                                        // console.log("--------------")
                                        // console.log(resp.data.data.data[0].type);


                                        if(resp.data.code ==="01"){
                                            // eslint-disable-next-line
                                            let UpdateSTIDActivity = axios
                                            .post(
                                                "https://billingdev.ilcs.co.id:8013/api/stidActivity",
                                                {
                                                    "terminalCode": response.data.data[0].terminalName,
                                                    "activity":"I",
                                                    "gateName": response.data.data[0].gateName
                                                }
                                            ).then(respUpdateSTIDActivity =>{
                                                console.log("UpdateSTIDActivity", respUpdateSTIDActivity)
                                            })
                                            if(resp.data.data.data[0].type === "CMS"){
                                                // eslint-disable-next-line
                                                let LastDataCMS = axios
                                                .post(
                                                    "http://localhost:8080/SaveLogLastData",
                                                    {
                                                        truck_no: resp.data.data.data[0].truck_id,
                                                        container_no: resp.data.data.data[0].cargo_no,
                                                        gate_time: resp.data.data.data[0].gate_in_time
                                                    }
                                                ).then((resp)=>{

                                                });
                                                // eslint-disable-next-line
                                                let logsdataSuksesGIN = axios
                                                .post(
                                                    "http://localhost:8080/savescandatatxt",
                                                    {
                                                        Status : "Berhasil",
                                                        Lane : resp.data.data.data[0].type,
                                                        scanRFIDTime : ScanDate, //getcurrentdate
                                                        RFIDNumb : sCode.toUpperCase(),
                                                        ReadrfidDate : ScanDate,
                                                        GateTimes : resp.data.data.data[0].gate_in_time,
                                                        truck : resp.data.data.data[0].truck_id,
                                                        containerNumb : resp.data.data.data[0].cargo_no,
                                                        CMSEIRDatePrint : resp.data.data.data[0].slip_print_time,
                                                        STIDIntegrasiDate : "Integration Date",
                                                        successDate : resp.data.data.data[0].gate_in_time,
                                                    }
                                                )
                                                .then((cmsresp)=> {
                                                    console.log("cms",cmsresp)
                                                    // setdetailInformation({
                                                    //     Status : "Berhasil",
                                                    //     Lane : cmsresp.data.data.type,
                                                    //     scanRFIDTime : ScanDate, //getcurrentdate
                                                    //     RFIDNumb : sCode.toUpperCase(),
                                                    //     ReadrfidDate : ScanDate,
                                                    //     GateTimes : cmsresp.data.data.gate_in_time,
                                                    //     truck : cmsresp.data.data.truck_id,
                                                    //     containerNumb : cmsresp.data.data.cargo_no,
                                                    //     CMSEIRDatePrint : cmsresp.data.data.slip_print_time,
                                                    //     STIDIntegrasiDate : "tanggal proses integrasi",
                                                    //     successDate : cmsresp.data.data.gate_in_time,
                                                    // })
                                                })
                                                .catch((error) =>{
                                                    console.error(error);
                                                });
                                                // navigate("/PrintCMS", { state: resp.data.data.data[0] });
                                                // navigate("/PrintCMS",{ state: { displaytoprint: resp.data.data.data[0] }});
                                                navigate("/PrintCMS",{ state: { displaytoprint: {
                                                    //tocallback detail info in display 
                                                    Status : "Berhasil",
                                                    Lane : resp.data.data.data[0].type,
                                                    scanRFIDTime : ScanDate, //getcurrentdate
                                                    RFIDNumb : sCode.toUpperCase(),
                                                    ReadrfidDate : ScanDate,
                                                    GateTimes : resp.data.data.data[0].gate_in_time,
                                                    truck : resp.data.data.data[0].truck_id,
                                                    containerNumb : resp.data.data.data[0].cargo_no,
                                                    CMSEIRDatePrint : resp.data.data.data[0].slip_print_time,
                                                    STIDIntegrasiDate : resp.data.data.data[0].slip_print_time,
                                                    successDate : ScanDate,
                                                    // to printlayout
                                                    type : resp.data.data.data[0].type,
                                                    tranport_order_no : resp.data.data.data[0].tranport_order_no,
                                                    gate_in_time : resp.data.data.data[0].gate_in_time,
                                                    operator : resp.data.data.data[0].operator,
                                                    cargo_no : resp.data.data.data[0].cargo_no,
                                                    full_empty : resp.data.data.data[0].full_empty,
                                                    gate_in_lane_id : resp.data.data.data[0].gate_in_lane_id,
                                                    iso : resp.data.data.data[0].iso,
                                                    gross_weight : resp.data.data.data[0].gross_weight,
                                                    yard_location : resp.data.data.data[0].yard_location,
                                                    truck_id : resp.data.data.data[0].truck_id,
                                                    slip_print_time : resp.data.data.data[0].slip_print_time,
                                                    terminal_info_display_nm : resp.data.data.data[0].terminal_info_display_nm,
                                                    class : resp.data.data.data[0].class,
                                                }}});
                                            } else {
                                                // eslint-disable-next-line
                                                let LastDataEIR = axios
                                                .post(
                                                    "http://localhost:8080/SaveLogLastData",
                                                    {
                                                        truck_no: resp.data.data.data[0].police_no,
                                                        container_no: resp.data.data.data[0].container_no,
                                                        gate_time: resp.data.data.data[0].out_time
                                                    }
                                                ).then((resp)=>{

                                                });
                                                // eslint-disable-next-line
                                                let logsdataSuksesGOUT = axios
                                                .post(
                                                    "http://localhost:8080/savescandatatxt",
                                                    {
                                                        Status : "Berhasil",
                                                        Lane : resp.data.data.data[0].type,
                                                        scanRFIDTime : ScanDate, //getcurrentdate
                                                        RFIDNumb : sCode.toUpperCase(),
                                                        ReadrfidDate : ScanDate,
                                                        GateTimes : resp.data.data.data[0].out_time,
                                                        truck : resp.data.data.data[0].police_no,
                                                        containerNumb : resp.data.data.data[0].container_no,
                                                        CMSEIRDatePrint : resp.data.data.data[0].slip_print_time,
                                                        STIDIntegrasiDate : "Integration Date",
                                                        successDate : resp.data.data.data[0].out_time,
                                                    }
                                                )
                                                .then((eirresp)=> {
                                                    console.log("eir",eirresp)
                                                    // setdetailInformation({
                                                    //     Status : "Berhasil",
                                                    //     Lane : eirresp.data.data.type,
                                                    //     scanRFIDTime : ScanDate, //getcurrentdate
                                                    //     RFIDNumb : sCode.toUpperCase(),
                                                    //     ReadrfidDate : ScanDate,
                                                    //     GateTimes : eirresp.data.data.out_time,
                                                    //     truck : eirresp.data.data.police_no,
                                                    //     containerNumb : eirresp.data.data.container_no,
                                                    //     CMSEIRDatePrint : eirresp.data.data.slip_print_time,
                                                    //     STIDIntegrasiDate : "tanggal proses integrasi",
                                                    //     successDate : "resp.data.data.gate_in_time",
                                                    // })
                                                })
                                                .catch((error) =>{
                                                    console.error(error);
                                                });
                                                // navigate("/PrintEIR", { state: resp.data.data.data[0] });
                                                // navigate("/PrintEIR",{ state: { displaytoprint: resp.data.data.data[0] }});
                                                navigate("/PrintEIR",{ state: { displaytoprint: {
                                                    //to callback detail info in display 
                                                    Status : "Berhasil",
                                                    Lane : resp.data.data.data[0].type,
                                                    scanRFIDTime : ScanDate, //getcurrentdate
                                                    RFIDNumb : sCode.toUpperCase(),
                                                    ReadrfidDate : ScanDate,
                                                    GateTimes : resp.data.data.data[0].out_time,
                                                    truck : resp.data.data.data[0].police_no,
                                                    containerNumb : resp.data.data.data[0].container_no,
                                                    CMSEIRDatePrint : ScanDate,
                                                    STIDIntegrasiDate : resp.data.data.data[0].out_time,
                                                    successDate : ScanDate,
                                                    // to printlayout
                                                    type : resp.data.data.data[0].type,
                                                    container_no : resp.data.data.data[0].container_no,
                                                    iso : resp.data.data.data[0].iso,
                                                    vessel_voyage : resp.data.data.data[0].vessel_voyage,
                                                    etd : resp.data.data.data[0].etd,
                                                    operator : resp.data.data.data[0].operator,
                                                    booking_no : resp.data.data.data[0].booking_no,
                                                    pod : resp.data.data.data[0].pod,
                                                    sp_handling : resp.data.data.data[0].sp_handling,
                                                    gross_weight : resp.data.data.data[0].gross_weight,
                                                    full_empty : resp.data.data.data[0].full_empty,
                                                    commodity : resp.data.data.data[0].commodity,
                                                    dg_label : resp.data.data.data[0].dg_label,
                                                    dg_code : resp.data.data.data[0].dg_code,
                                                    temperature : resp.data.data.data[0].temperature,
                                                    shipper : resp.data.data.data[0].shipper,
                                                    customs_doc : resp.data.data.data[0].customs_doc,
                                                    tag_no : resp.data.data.data[0].tag_no,
                                                    police_no : resp.data.data.data[0].police_no,
                                                    truck_company : resp.data.data.data[0].truck_company,
                                                    seal_no : resp.data.data.data[0].seal_no,
                                                    loc_stack : resp.data.data.data[0].loc_stack,
                                                    in_time : resp.data.data.data[0].in_time,
                                                    out_time : resp.data.data.data[0].out_time,
                                                    inspection : resp.data.data.data[0].inspection,
                                                    damage : resp.data.data.data[0].damage,
                                                    remarks : resp.data.data.data[0].remarks,
                                                    inspector : resp.data.data.data[0].inspector,
                                                    class : resp.data.data.data[0].class,
                                                }}});
                                            }
                                        } else{
                                            // eslint-disable-next-line
                                            let logsdataFailed = axios
                                            .post(
                                                "http://localhost:8080/savescandatatxt",
                                                {
                                                    Status : "Gagal",
                                                    Lane : "FAILED",
                                                    scanRFIDTime : ScanDate, //getcurrentdate
                                                    RFIDNumb : sCode.toUpperCase(),
                                                    ReadrfidDate : ScanDate,
                                                    GateTimes : "- Not Found -",
                                                    truck : "- Not Found -",
                                                    containerNumb : "- Not Found -",
                                                    CMSEIRDatePrint : "- Not Found -",
                                                    STIDIntegrasiDate : "- Not Found -",
                                                    successDate : "- Not Found -",
                                                }
                                            )
                                            .then((errresp)=> {
                                                // console.log(resp)
                                                // setdetailInformation({
                                                //     Status : "Gagal",
                                                //     Lane : "FAILED",
                                                //     scanRFIDTime : ScanDate, //getcurrentdate
                                                //     RFIDNumb : sCode.toUpperCase(),
                                                //     ReadrfidDate : ScanDate,
                                                //     GateTimes : "- Not Found -",
                                                //     truck : "- Not Found -",
                                                //     containerNumb : "- Not Found -",
                                                //     CMSEIRDatePrint : "- Not Found -",
                                                //     STIDIntegrasiDate : "- Not Found -",
                                                //     successDate : "- Not Found -",
                                                // })

                                                // readrfid
                                                // var tx = document.getElementById('readrfid');
                                                // tx.innerHTML = "<span></span>";
                                            })
                                            .catch((error) =>{
                                                console.error(error);
                                            });
                                            
                                            //=====//
                                            // navigate("/PrintCMS",{ state: { displaytoprint: {
                                            //     Status : "Gagal",
                                            //     Lane : "FAILED",
                                            //     scanRFIDTime : ScanDate, //getcurrentdate
                                            //     RFIDNumb : sCode.toUpperCase(),
                                            //     ReadrfidDate : ScanDate,
                                            //     GateTimes : "- Not Found -",
                                            //     truck : "- Not Found -",
                                            //     containerNumb : "- Not Found -",
                                            //     CMSEIRDatePrint : "- Not Found -",
                                            //     STIDIntegrasiDate : "- Not Found -",
                                            //     successDate : "- Not Found -",
                                            //     type : "Berhasil",
                                            //     tranport_order_no : "resp.data.data.data[0].type",
                                            //     gate_in_time : "ScanDate",
                                            //     operator : "sCode.toUpperCase()",
                                            //     cargo_no : "ScanDate",
                                            //     iso : "resp.data.data.data[0].gate_in_time",
                                            //     gross_weight : "resp.data.data.data[0].truck_id",
                                            //     yard_location : "resp.data.data.data[0].cargo_no",
                                            //     truck_id : "resp.data.data.data[0].slip_print_time",
                                            //     truck_number : "tanggal proses integrasi",
                                            //     slip_print_time : "resp.data.data.data[0].gate_in_time",
                                            //     terminal_info_display_nm : "resp.data.data.data[0].gate_in_time",
                                            // }}});
                                        }

                                        setTimeout(function() {
                                            IndoText.innerHTML = "Silahkan pindai STID anda";
                                            EnglishText.innerHTML = "Please Scan your STID";
                                        }, 2000);
                                    })
                                    .catch((err) => {
                                        // Handle Error Here
                                        console.error(err);
                                    });
                                    // navigate('dashboard');
                                }, 4000);
                            },
                            onKeyDetect: function(iKeyCode){ // output all potentially relevant key events - great for debugging!
                                console.log('Pressed: ' + iKeyCode);
                            }
                        })
                    } else {
                        // Remove onScan.js from a DOM element completely
                        // onScan.detachFrom(document);
                    }
                } catch (error) {
                    
                }
            })
            .catch(error => error)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchTheData();
        fetchLastData();
    // eslint-disable-next-line
    }, []);

    return(
        <>
            <Row>
                <Col md="12" lg="7">
                    <Row>
                        <Col md="12" lg="12">
                            <div className="bks-containernya">
                                <div className="contentnya">
                                    <div className="containernya">
                                        <div className="card cardnya" data-aos="fade-up" data-aos-delay="800" >
                                            <div className="card-header headercardnya">
                                                <div className="header-title text-center">
                                                    <h4 className="card-title" style={CardTitle}>TPK Terminal 009</h4>
                                                    <p className="mb-3">-</p>          
                                                </div>
                                            </div>
                                            <div className="card-body bodycardnya parent" style={BodySilahkanScan}>
                                            <h4 className="text-center child" style={styleSilahkanScan} id="textbhsindo">
                                                {/* {displaytextIndo} */}
                                                Silahkan Pindai RFID anda
                                                    {/* <span style={stylePleaseScan} className="textbhsinggris"></span> */}
                                                </h4>
                                                <h4 className="text-center child " style={stylePleaseScan} id="textbhsinggris">
                                                {/* {displaytextEnglish} */}
                                                Please Scan your RFID
                                                    {/* <span style={stylePleaseScan} className="textbhsinggris"></span> */}
                                                </h4>
                                            </div>
                                        </div>   
                                    </div>
                                </div>
                            </div>                     
                        </Col>
                    </Row>
                </Col>
                <Col md="12" lg="5">
                    <Row>
                        <Col md="12" lg="12">
                            <div className="card credit-card-widget" data-aos="fade-up" data-aos-delay="900" style={{height:'330px', display:'flex', flexDirection:'column', overflow: 'scroll'}}>
                                <div className="p-3 border-0 card-header" style={{flexShrink:0, position: 'sticky', objectFit: 'cover', top:0}}>
                                {/* <div className="p-3 border-0 card-headers"> */}
                                    <div className="p-3 border border-white rounded primary-gradient-card ">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div>
                                            <h5 className="font-weight-bold">DETAILS</h5>
                                            <p className="mb-2">INFORMATION</p>  
                                            {/* <h5 className="font-weight-bold" style={{color:'black'}}>DETAILS</h5>
                                            <p className="mb-2" style={{color:'black'}}>INFORMATION</p>   */}
                                            </div>
                                        </div>
                                        <div className="mb-2 d-flex align-items-center justify-content-between" style={{color:'black', fontWeight:'bold'}}>
                                            <p className="mb-0">Scan RFID</p>
                                            <p className="mb-0">{ state.state === null ? "" : state.state.printtodisplay.scanRFIDTime}</p>
                                        </div>
                                        <div className="mb-2 d-flex align-items-center justify-content-between" style={{color:'black', fontWeight:'bold'}}>
                                            <p className="mb-0">RFID Terbaca <span id='readrfid'>{ state.state === null ? "" : state.state.printtodisplay.RFIDNumb}</span></p>
                                            <p className="mb-0">{ state.state === null ? "" : state.state.printtodisplay.scanRFIDTime}</p>
                                        </div>
                                        <div className="mb-2 d-flex align-items-center justify-content-between" style={{color:'black', fontWeight:'bold'}}>
                                            <p className="mb-0">Proses Gate { state.state === null ? "" : state.state.printtodisplay.Status} Dilakukan</p>
                                            <p className="mb-0">{ state.state === null ? "" : state.state.printtodisplay.GateTimes}</p>
                                        </div>
                                        <div className="mb-2 d-flex align-items-center justify-content-between" style={{color:'black', fontWeight:'bold'}}>
                                            <p className="mb-0">{ state.state === null ? "" : state.state.printtodisplay.Status} Proses Gate <br></br>Truck { state.state === null ? "" : state.state.printtodisplay.truck} Container { state.state === null ? "" : state.state.printtodisplay.containerNumb}</p>
                                            <p className="mb-0">{ state.state === null ? "" : state.state.printtodisplay.GateTimes}</p>
                                        </div>
                                        <div className="mb-2 d-flex align-items-center justify-content-between" style={{color:'black', fontWeight:'bold'}}>
                                            <p className="mb-0">Cetak CMS/EIR { state.state === null ? "" : state.state.printtodisplay.Status}</p>
                                            <p className="mb-0">{ state.state === null ? "" : state.state.printtodisplay.CMSEIRDatePrint}</p>
                                        </div>
                                        <div className="mb-2 d-flex align-items-center justify-content-between" style={{color:'black', fontWeight:'bold'}}>
                                            <p className="mb-0">Proses Integrasi STID { state.state === null ? "" : state.state.printtodisplay.Status}</p>
                                            <p className="mb-0">{ state.state === null ? "" : state.state.printtodisplay.STIDIntegrasiDate}</p>
                                        </div>
                                        <div className="mb-0 d-flex align-items-center justify-content-between" style={{color:'black', fontWeight:'bold'}}>
                                            <p className="mb-0">Summary Proses Gate { state.state === null ? "" : state.state.printtodisplay.Status} Dilakukan</p>
                                            <p className="mb-0">{ state.state === null ? "" : state.state.printtodisplay.successDate}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-3 border-0 card-header" style={{flexShrink:"0", position: 'sticky', objectFit: 'cover', top:'0'}}>
                                {/* <div className="p-3 border-0 card-headers"> */}
                                    <div className="p-3 border border-white rounded primary-gradient-card ">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div>
                                            <h5 className="font-weight-bold">List Data</h5>
                                            <p className="mb-2">INFORMATION</p>  
                                            {/* <h5 className="font-weight-bold" style={{color:'black'}}>DETAILS</h5>
                                            <p className="mb-2" style={{color:'black'}}>INFORMATION</p>   */}
                                            </div>
                                        </div>
                                        <div className="mb-2 d-flex align-items-center justify-content-between" style={{color:'black', fontWeight:'bold'}}>
                                            <p className="mb-0">Scan RFID</p>
                                            <p className="mb-0">{ state.state === null ? "" : state.state.printtodisplay.scanRFIDTime}</p>
                                        </div>
                                        <div className="mb-2 d-flex align-items-center justify-content-between" style={{color:'black', fontWeight:'bold'}}>
                                            <p className="mb-0">RFID Terbaca <span id='readrfid'>{ state.state === null ? "" : state.state.printtodisplay.RFIDNumb}</span></p>
                                            <p className="mb-0">{ state.state === null ? "" : state.state.printtodisplay.scanRFIDTime}</p>
                                        </div>
                                        <div className="mb-2 d-flex align-items-center justify-content-between" style={{color:'black', fontWeight:'bold'}}>
                                            <p className="mb-0">Proses Gate { state.state === null ? "" : state.state.printtodisplay.Status} Dilakukan</p>
                                            <p className="mb-0">{ state.state === null ? "" : state.state.printtodisplay.GateTimes}</p>
                                        </div>
                                        <div className="mb-2 d-flex align-items-center justify-content-between" style={{color:'black', fontWeight:'bold'}}>
                                            <p className="mb-0">{ state.state === null ? "" : state.state.printtodisplay.Status} Proses Gate <br></br>Truck { state.state === null ? "" : state.state.printtodisplay.truck} Container { state.state === null ? "" : state.state.printtodisplay.containerNumb}</p>
                                            <p className="mb-0">{ state.state === null ? "" : state.state.printtodisplay.GateTimes}</p>
                                        </div>
                                        <div className="mb-2 d-flex align-items-center justify-content-between" style={{color:'black', fontWeight:'bold'}}>
                                            <p className="mb-0">Cetak CMS/EIR { state.state === null ? "" : state.state.printtodisplay.Status}</p>
                                            <p className="mb-0">{ state.state === null ? "" : state.state.printtodisplay.CMSEIRDatePrint}</p>
                                        </div>
                                        <div className="mb-2 d-flex align-items-center justify-content-between" style={{color:'black', fontWeight:'bold'}}>
                                            <p className="mb-0">Proses Integrasi STID { state.state === null ? "" : state.state.printtodisplay.Status}</p>
                                            <p className="mb-0">{ state.state === null ? "" : state.state.printtodisplay.STIDIntegrasiDate}</p>
                                        </div>
                                        <div className="mb-0 d-flex align-items-center justify-content-between" style={{color:'black', fontWeight:'bold'}}>
                                            <p className="mb-0">Summary Proses Gate { state.state === null ? "" : state.state.printtodisplay.Status} Dilakukan</p>
                                            <p className="mb-0">{ state.state === null ? "" : state.state.printtodisplay.successDate}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col md="12" lg="12">
                            <div className="overflow-hidden card" data-aos="fade-up" data-aos-delay="600">
                                <div className="flex-wrap card-header d-flex justify-content-between">
                                    <div className="header-title">
                                        <h4 className="card-title" style={styleCardTitle}>Last Data</h4>           
                                    </div>
                                </div>
                                <div className="p-0 card-body">
                                    <div className="mt-4 table-responsive">
                                        <table id="basic-table" className="table mb-0 no-table-striped" role="grid">
                                            <thead style={styleTableHead}>
                                                <tr>
                                                    <th>Truck No</th>
                                                    <th>Container No</th>
                                                    <th>Time</th>
                                                </tr>
                                            </thead>
                                            <tbody style={styleTableBody}>
                                                {LastData.slice(0,2).map((lastda, index) => (
                                                <tr>
                                                    <td key={index}>{lastda.truck_no}</td>
                                                    <td>{lastda.container_no}</td>
                                                    <td>{lastda.gate_time}</td>
                                                </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
}


export default (Display)
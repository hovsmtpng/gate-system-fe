import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import axios from 'axios'

// AOS
import AOS from 'aos'
import '../../../node_modules/aos/dist/aos'
import '../../../node_modules/aos/dist/aos.css'

//swiper
import SwiperCore, { Navigation } from 'swiper';

// Import Swiper styles
import 'swiper/swiper-bundle.min.css'
import Logo from '../../components/partials/components/logo'
import 'swiper/components/navigation/navigation.scss';

import successaudio from '../../assets/audio/oksilahkanmasuk.m4a'
import erraudio from '../../assets/audio/gagalproses.m4a'
import goutaudio from '../../assets/audio/terimakasihsampaijumpa.m4a'

import onScan from "onscan.js";
// import { detachFrom } from "onscan.js";

import { useNavigate } from "react-router-dom";

// let navigation = useNavigate();

// install Swiper modules
SwiperCore.use([Navigation]);


const Display =  () => {
    
    // const state = useLocation();

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
    // eslint-disable-next-line
    const CardTitle={
        fontSize: '28px',
        fontWeight:'Bold',
    }
    const stylePleaseScan ={
        fontSize: '45px',
        width:'100%',
        fontWeight:'Bold',
        color:'yellow',
        fontStyle:'italic',
        marginTop:'24px'
    }
    const styleSilahkanScan ={
        fontSize: '45px',
        width:'100%',
        color:'white',
        textAlign: 'center',
        marginTop:'-24px'
    }
    const BodySilahkanScan ={
        backgroundColor:'black',
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
    const [Img, setImg] = useState();
    const [waitScan, setwaitScan] = useState({foo:false});
    const [dataHeader, setdataHeader] = useState([]);
    const [detailInformation, setdetailInformation] = useState([]);
    const [LastData, setLastData]=useState([]);

    // const isMountedRef = useRef(null);
    // eslint-disable-next-line
    const fetchLastData = async () => {
        try {
            await axios.get('http://localhost:8080/ReadLogLastData')
            .then(response =>{
                //console.log("Last Data",response.data.data.LastData)
                setLastData(response.data.data.LastData.reverse())
            })
        } catch (error) {
            
        }
    }

    const fetchLast5DetailData = async () => {
        try {
            await axios.get('http://localhost:8080/ReadLogDetailData')
            .then(response =>{
                //console.log("Last 5 Detail Data",response.data.data.logsGInGOutFail)
                setdetailInformation(response.data.data.logsGInGOutFail.reverse())
            })
        } catch (error) {
            
        }
    }

    const fetchDataHeader = async () => {
        try {
            await axios.get('http://localhost:8080/readsettingjson')
            // .then(response => {
            //     const imageUrl = response.data.data[0].logo;
                // //console.log("logo",dataHeader.logo)
            //     const res = fetch(`http://localhost:8080/fetchImage\\`+imageUrl);
            //     const imageBlob = res.blob();
            //     const imageObjectURL = URL.createObjectURL(imageBlob);
            //     setImg(imageObjectURL);
            // })
            .then(response => {
                setdataHeader(response.data.data[0])
            })
        } catch (error) {
            //console.log(error);
        }
        // const imageUrl = dataHeader.logo;
        // const res = await fetch(`http://localhost:8080/fetchImage\\`+imageUrl);
        // const imageBlob = await res.blob();
        // const imageObjectURL = URL.createObjectURL(imageBlob);
        // setImg(imageObjectURL);
        // try {
        //     const imageUrl = dataHeader.logo;
        //     //console.log("logo",dataHeader.logo)
        //     const res = await fetch(`http://localhost:8080/fetchImage\\`+imageUrl);
        //     const imageBlob = await res.blob();
        //     const imageObjectURL = URL.createObjectURL(imageBlob);
        //     setImg(imageObjectURL);
        // } catch (error) {
        //     //console.log(error);
        // }
    }

    const fetchImage = async () => {
        // ...dataHeader.logo
        const imageUrl = dataHeader.logo;
        const res = await fetch(`http://localhost:8080/fetchImage\\`+imageUrl);
        const imageBlob = await res.blob();
        const imageObjectURL = URL.createObjectURL(imageBlob);
        setImg(imageObjectURL);
    };


    function Clock() {
        const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
        const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
        setTimeout(function() {   
        const a = new Date();
        const d = days[a.getDay()] + ', ' +a.getDate() + ' ' + months[a.getMonth()] + ' ' + a.getFullYear();
        const n = a.getHours() + ':' + a.getMinutes() + ':' + a.getSeconds();
        document.getElementById("clock").innerHTML = d+" | "+n;
        Clock();          
        }, 1000)
    }

    const fetchTheData = async () => {
        var IndoText = document.getElementById('textbhsindo');
        var EnglishText = document.getElementById('textbhsinggris');

        // try {
            await axios.get('http://localhost:8080/readsettingjson')
            .then(response => {
                console.log("responseHeader", response.data.data[0]);
                // try {
                    
                        if (onScan.isAttachedTo(document) === false && waitScan.foo === false) {
                            onScan.attachTo(document, {
                                suffixKeyCode:[13],
                                reactToPaste:false,
                                onScan: function(sCode, iQty) { // Alternative to document.addEventListener('scan')
                                    //console.log('Scanned: ' + iQty + 'x ' + sCode);
                                    //console.log("OnScanRespHeader", response.data.data[0]);
                                        // setwaitScan(true);
                                        // setwaitScan({ foo: true }, () => {
                                        //     //console.log(waitScan.foo, 'dealersOverallTotal1');
                                        // });
                                        let currentdate = new Date();
                                        let ScanDates = ` ${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`;
                                        var MyDate = new Date();
                                        var ScanDate;
                                        
                                        MyDate.setDate(MyDate.getDate());
                                        
                                        ScanDate = ('0' + MyDate.getDate()).slice(-2) + '/' + ('0' + (MyDate.getMonth()+1)).slice(-2) + '/' + MyDate.getFullYear() + ScanDates;
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
                                            // "https://billingdev.ilcs.co.id:8013/api/cekRfId",
                                            // "http://localhost:8013/api/cekRfId",
                                            // eslint-disable-next-line
                                            let cekRfId = axios
                                            .post(
                                                "https://praya.ilcs.co.id:8013/api/cekRfId",
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
                                                console.log("+=+=",resp)
                                                if(resp.data.code === "01"){
                                                    if(resp.data.data[0].data[0].type === 'CMS'){
                                                        var audio01 = new Audio(successaudio);
                                                        audio01.play();
                                                    } else if (resp.data.data[0].data[0].type === 'EIR') {
                                                        var audio01_1 = new Audio(goutaudio);
                                                        audio01_1.play();
                                                    }
                                                    IndoText.innerHTML = "<h3 style='font-size:35px;color:white;'>Proses Gate Berhasil</h3>";
                                                    EnglishText.innerHTML = "<h3 style='font-size:35px; color:#7CFC00; font-weight:bold'>Gate process is Successful</h3>";
                                                } else if (resp.data.code === "02"){
                                                    var audio02 = new Audio(erraudio);
                                                    audio02.play();
                                                    // setTimeout(function() {
                                                        // setTimeout(function() {
                                                    IndoText.innerHTML = "<h3 style='font-size:35px; color:red'>STID Anda Belum Terdaftar</h3>";
                                                    EnglishText.innerHTML = "<h3 style='font-size:35px; color:red; font-weight:bold'>Your STID Not Registered</h3>";
                                                            
                                                    // }, 2000);
                                                        // this.displaytextIndo = setdisplayTextIndo("Proses Cetak CMS/EIR");
                                                        // this.displaytextEnglish = setdisplayTextEnglish("Print CMS/EIR");
                                                // }, 2000);
                                                } else if (resp.data.code === "03"){
                                                    var audio03 = new Audio(erraudio);
                                                    audio03.play();
                                                    IndoText.innerHTML = "<h3 style='font-size:35px; color:red'>Truk Belum Terasosisasi</h3>";
                                                    EnglishText.innerHTML = "<h3 style='font-size:35px; color:red; font-weight:bold'>The Truck not Associated</h3>";

                                                } else {
                                                    // setTimeout(function() {
                                                    var audio04 = new Audio(erraudio);
                                                    audio04.play();
                                                    IndoText.innerHTML = "<h3 style='font-size:28px; color:red'>Tidak dapat proses Gate, Silahkan cek di Palapa</h3>";
                                                    EnglishText.innerHTML = "<h3 style='font-size:28px; color:red; font-weight:bold'>Cannot process Gate. Please check in Palapa</h3>";
                                                    // }, 2000);
                                                }

                                                //console.log(resp);
                                                // //console.log("--------------")
                                                // //console.log(resp.data);
                                                // //console.log("--------------")
                                                // //console.log(resp.data.code); //ok
                                                // //console.log("--------------")
                                                // //console.log(resp.data.data); //ok
                                                // //console.log("--------------")
                                                // //console.log(resp.data.data.data[0].type);

                                                setTimeout(function() {

                                                if(resp.data.code ==="01"){
                                                    // "https://billingdev.ilcs.co.id:8013/api/stidActivity",
                                                    // "http://localhost:8013/api/stidActivity",
                                                    // eslint-disable-next-line
                                                    let UpdateSTIDActivity = axios
                                                    .post(
                                                        "https://praya.ilcs.co.id:8013/api/stidActivity",
                                                        {
                                                            "terminalCode": response.data.data[0].terminalName,
                                                            "activity":"I",
                                                            "gateName": response.data.data[0].gateName
                                                        }
                                                    ).then(respUpdateSTIDActivity =>{
                                                        //console.log("UpdateSTIDActivity", respUpdateSTIDActivity)
                                                    })
                                                    if(resp.data.data[0].data[0].type === "CMS"){
                                                        // eslint-disable-next-line
                                                        let LastDataCMS = axios
                                                        .post(
                                                            "http://localhost:8080/SaveLogLastData",
                                                            {
                                                                truck_no: resp.data.data[0].data[0].truck_id,
                                                                container_no: resp.data.data[0].data[0].cargo_no,
                                                                gate_time: resp.data.data[0].data[0].gate_in_time
                                                            }
                                                        ).then((resp)=>{

                                                        });
                                                        // eslint-disable-next-line
                                                        let logsdataSuksesGIN = axios
                                                        .post(
                                                            "http://localhost:8080/SaveLogGateInOutFail",
                                                            {
                                                                Status : "Berhasil",
                                                                Lane : resp.data.data[0].data[0].type,
                                                                scanRFIDTime : ScanDate, //getcurrentdate
                                                                RFIDNumb : sCode.toUpperCase(),
                                                                ReadrfidDate : ScanDate,
                                                                GateTimes : resp.data.data[0].data[0].gate_in_time,
                                                                truck : resp.data.data[0].data[0].truck_id,
                                                                containerNumb : resp.data.data[0].data[0].cargo_no,
                                                                CMSEIRDatePrint : resp.data.data[0].data[0].slip_print_time,
                                                                STIDIntegrasiDate : ScanDate,
                                                                successDate : resp.data.data[0].data[0].gate_in_time,
                                                                FailInfo : resp.data.code,
                                                            }
                                                        )
                                                        .then((cmsresp)=> {
                                                            //console.log("cms",cmsresp)
                                                        })
                                                        .catch((error) =>{
                                                            console.error(error);
                                                        });

                                                        // navigate("/PrintCMS", { state: resp.data.data.data[0] });
                                                        navigate("/PrintCMS",{ state: { displaytoprint: resp.data.data[0].data, transportertoprint: resp.data.data[1].transporter[0], flagtoprint: resp.data.data[1].resultFlag[0] }});
                                                        // navigate("/PrintCMS",{ state: { displaytoprint: {
                                                        //     // to printlayout
                                                        //     type : resp.data.data.data[0].type,
                                                        //     tranport_order_no : resp.data.data.data[0].tranport_order_no,
                                                        //     gate_in_time : resp.data.data.data[0].gate_in_time,
                                                        //     operator : resp.data.data.data[0].operator,
                                                        //     cargo_no : resp.data.data.data[0].cargo_no,
                                                        //     full_empty : resp.data.data.data[0].full_empty,
                                                        //     gate_in_lane_id : resp.data.data.data[0].gate_in_lane_id,
                                                        //     iso : resp.data.data.data[0].iso,
                                                        //     gross_weight : resp.data.data.data[0].gross_weight,
                                                        //     yard_location : resp.data.data.data[0].yard_location,
                                                        //     truck_id : resp.data.data.data[0].truck_id,
                                                        //     slip_print_time : resp.data.data.data[0].slip_print_time,
                                                        //     terminal_info_display_nm : resp.data.data.data[0].terminal_info_display_nm,
                                                        //     class : resp.data.data.data[0].class,
                                                        // }}});
                                                    } else {
                                                        // eslint-disable-next-line
                                                        let LastDataEIR = axios
                                                        .post(
                                                            "http://localhost:8080/SaveLogLastData",
                                                            {
                                                                truck_no: resp.data.data[0].data[0].police_no,
                                                                container_no: resp.data.data[0].data[0].container_no,
                                                                gate_time: resp.data.data[0].data[0].out_time
                                                            }
                                                        ).then((resp)=>{

                                                        });
                                                        // eslint-disable-next-line
                                                        let logsdataSuksesGOUT = axios
                                                        .post(
                                                            "http://localhost:8080/SaveLogGateInOutFail",
                                                            {
                                                                Status : "Berhasil",
                                                                Lane : resp.data.data[0].data[0].type,
                                                                scanRFIDTime : ScanDate, //getcurrentdate
                                                                RFIDNumb : sCode.toUpperCase(),
                                                                ReadrfidDate : ScanDate,
                                                                GateTimes : resp.data.data[0].data[0].out_time,
                                                                truck : resp.data.data[0].data[0].police_no,
                                                                containerNumb : resp.data.data[0].data[0].container_no,
                                                                CMSEIRDatePrint : ScanDate,
                                                                STIDIntegrasiDate : ScanDate,
                                                                successDate : resp.data.data[0].data[0].out_time,
                                                                FailInfo : resp.data.code,
                                                                
                                                            }
                                                        )
                                                        .then((eirresp)=> {
                                                            //console.log("eir",eirresp)
                                                        })
                                                        .catch((error) =>{
                                                            console.error(error);
                                                        });
                                                        // navigate("/PrintEIR", { state: resp.data.data.data[0] });
                                                        navigate("/PrintEIR",{ state: { displaytoprint: resp.data.data[0].data, transportertoprint: resp.data.data[1].transporter[0], flagtoprint: resp.data.data[1].resultFlag[0] }});
                                                        // navigate("/PrintEIR",{ state: { displaytoprint: {
                                                        //     // to printlayout
                                                        //     type : resp.data.data.data[0].type,
                                                        //     container_no : resp.data.data.data[0].container_no,
                                                        //     iso : resp.data.data.data[0].iso,
                                                        //     vessel_voyage : resp.data.data.data[0].vessel_voyage,
                                                        //     etd : resp.data.data.data[0].etd,
                                                        //     operator : resp.data.data.data[0].operator,
                                                        //     booking_no : resp.data.data.data[0].booking_no,
                                                        //     pod : resp.data.data.data[0].pod,
                                                        //     sp_handling : resp.data.data.data[0].sp_handling,
                                                        //     gross_weight : resp.data.data.data[0].gross_weight,
                                                        //     full_empty : resp.data.data.data[0].full_empty,
                                                        //     commodity : resp.data.data.data[0].commodity,
                                                        //     dg_label : resp.data.data.data[0].dg_label,
                                                        //     dg_code : resp.data.data.data[0].dg_code,
                                                        //     temperature : resp.data.data.data[0].temperature,
                                                        //     shipper : resp.data.data.data[0].shipper,
                                                        //     customs_doc : resp.data.data.data[0].customs_doc,
                                                        //     tag_no : resp.data.data.data[0].tag_no,
                                                        //     police_no : resp.data.data.data[0].police_no,
                                                        //     truck_company : resp.data.data.data[0].truck_company,
                                                        //     seal_no : resp.data.data.data[0].seal_no,
                                                        //     loc_stack : resp.data.data.data[0].loc_stack,
                                                        //     in_time : resp.data.data.data[0].in_time,
                                                        //     out_time : resp.data.data.data[0].out_time,
                                                        //     inspection : resp.data.data.data[0].inspection,
                                                        //     damage : resp.data.data.data[0].damage,
                                                        //     remarks : resp.data.data.data[0].remarks,
                                                        //     inspector : resp.data.data.data[0].inspector,
                                                        //     class : resp.data.data.data[0].class,
                                                        // }}});
                                                    }
                                                } else {
                                                    // eslint-disable-next-line
                                                    let logsdataFailed = axios
                                                    .post(
                                                        "http://localhost:8080/SaveLogGateInOutFail",
                                                        {
                                                            Status : "Gagal",
                                                            Lane : "CMS/EIR",
                                                            scanRFIDTime : ScanDate, //getcurrentdate
                                                            RFIDNumb : sCode.toUpperCase(),
                                                            ReadrfidDate : ScanDate,
                                                            GateTimes : "- Not Found -",
                                                            truck : "- Not Found -",
                                                            containerNumb : "- Not Found -",
                                                            CMSEIRDatePrint : "- Not Found -",
                                                            STIDIntegrasiDate : "- Not Found -",
                                                            successDate : "- Not Found -",
                                                            FailInfo : resp.data.code,
                                                        }
                                                    )
                                                    .then((errresp)=> {
                                                        // eslint-disable-next-line
                                                        let LastDataERR = axios
                                                        .post(
                                                            "http://localhost:8080/SaveLogLastData",
                                                            {
                                                                truck_no: "- Not Found -",
                                                                container_no: "- Not Found -",
                                                                gate_time: ScanDate
                                                            }
                                                        ).then((ERresp)=>{
                                                        });
                                                        // //console.log(resp)
                                                    })
                                                    .catch((error) =>{
                                                        console.error(error);
                                                    });
                                                    // eslint-disable-next-line
                                                    // let printCMStoNode = axios
                                                    // .post(
                                                    //     "http://localhost:8080/PrintCMS",
                                                    //     {
                                                    //         type : "Berhasil",
                                                    //         tranport_order_no : "resp.data.data.data[0].type",
                                                    //         gate_in_time : "ScanDate",
                                                    //         operator : "sCode.toUpperCase()",
                                                    //         cargo_no : "ScanDate",
                                                    //         iso : "resp.data.data.data[0].gate_in_time",
                                                    //         gross_weight : "resp.data.data.data[0].truck_id",
                                                    //         yard_location : "resp.data.data.data[0].cargo_no",
                                                    //         truck_id : "resp.data.data.data[0].slip_print_time",
                                                    //         truck_number : "tanggal proses integrasi",
                                                    //         slip_print_time : "resp.data.data.data[0].gate_in_time",
                                                    //         terminal_info_display_nm : "resp.data.data.data[0].gate_in_time",
                                                    //     }
                                                    // ).then((ErrPrintCMS)=>{

                                                    // })
                                                    
                                                    // navigate("/PrintCMS",{ state: { displaytoprint: [{
                                                    //     type : "Berhasil",
                                                    //     tranport_order_no : "1234",
                                                    //     gate_in_time : "11/05/2022 13:14",
                                                    //     operator : "STID",
                                                    //     cargo_no : "TEST1234567",
                                                    //     iso : "ISO 2200",
                                                    //     gross_weight : "1000",
                                                    //     yard_location : "R1-10-A20-S2",
                                                    //     truck_id : "A1234BC",
                                                    //     truck_number : "X2121X",
                                                    //     slip_print_time : "11/05/2022 13:14",
                                                    //     terminal_info_display_nm : "TERMINAL 009 TANJUNG PRIOK",
                                                    // }], transportertoprint: resp.data.data[1].transporter[0], flagtoprint: resp.data.data[1].resultFlag[0]}});
                                                }
                                                }, 4000);

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
                                        //console.log('Pressed: ' + iKeyCode);
                                    }
                                })
                        } else {
                            // Remove onScan.js from a DOM element completely
                            // onScan.detachFrom(document);
                        }
                    // setTimeout(function() {
                    //     //console.log("wait 5 second")
                    // },10000)
                // } catch (error) {
                    
                // }
            })
            .catch(error => error)
        // } catch (error) {
        //     //console.log(error);
        // }


    };

    useEffect(() => {
        Clock();
        fetchDataHeader();
        fetchImage();
        fetchTheData();
        
        const intervalLastData=setInterval(()=>{
            fetchLastData()
        },1000)

        const intervalLast5DetailData=setInterval(()=>{
            fetchLast5DetailData()
        },1000)

        return()=>clearInterval([intervalLast5DetailData, intervalLastData])

    // eslint-disable-next-line
    }, [dataHeader.logo]);
    return(
        <>
            <Row style={{paddingTop:'15px'}}>
                <Col md="12" lg="7">
                    <Row>
                        <Col md="12" lg="12">
                            <div className="bks-containernya">
                                <div className="contentnya">
                                    <div className="containernya">
                                        <div className="card cardnya">
                                            <div className="card-header headercardnya">
                                                <div className="header-title text-center">
                                                    <Row>
                                                        <Col md="2" lg="2">
                                                            <Logo color={true} />
                                                        </Col>
                                                        <Col md="8" lg="8">
                                                            <h4 className="card-title" style={{fontWeight:'bold'}}>{dataHeader.headerName} ({dataHeader.inOut === 'TI' ? 'Gate In' : 'Gate Out'})</h4>
                                                            <p className="mb-2" id='clock'>{dataHeader.inOut === 'TI' ? 'Gate In' : 'Gate Out'} {dataHeader.headerName}</p>
                                                        </Col>
                                                        <Col md="2" lg="2">
                                                            <img src={Img} alt="icons" style={{height:'40px'}}/>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </div>
                                            <div className="card-body bodycardnya content-inner2 parent" style={BodySilahkanScan}>
                                                <h4 className="text-center child" style={styleSilahkanScan} id="textbhsindo">
                                                Silahkan Pindai STID anda
                                                </h4>
                                                <h4 className="text-center child " style={stylePleaseScan} id="textbhsinggris">
                                                Please Scan your STID
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
                            {detailInformation.length  === 0
                            ?<div className="card credit-card-widgets example" style={{height:'275px', display:'flex', flexDirection:'column', overflow: 'scroll', overflowX:'hidden'}}>
                                <div className="card-body bodycardnya parent">
                                    <h4 className="text-center child" id="textbhsindo" style={styleCardTitle}>
                                    Details
                                    <p className="mb-2">Informations</p>
                                    </h4>
                                </div>
                            </div> 
                            : <div className="card credit-card-widgets example" style={{height:'295px', display:'flex', flexDirection:'column', overflow: 'scroll', overflowX:'hidden'}}>
                            {detailInformation.slice(0,5).map((lastdetaildainf, index) => (
                            <div className="p-2 border-0 card-header" style={{flexShrink:0, position: 'sticky', objectFit: 'cover', top:0, fontSize:'12px'}}>
                                <div className="p-2 border border-white rounded primary-gradient-card ">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                        <h5 className="font-weight-bold" style={styleCardTitle}>Detail</h5>
                                        <p className="mb-2">Informations</p>
                                        </div>
                                    </div>
                                    <div className="mb-2 d-flex align-items-center justify-content-between" style={{color:'black', fontWeight:'bold'}}>
                                        <p className="mb-0">Scan STID</p>
                                        <p className="mb-0">{ lastdetaildainf.scanRFIDTime}</p>
                                    </div>
                                    <div className="mb-2 d-flex align-items-center justify-content-between" style={{color:'black', fontWeight:'bold'}}>
                                        <p className="mb-0">STID Terbaca <span id='readrfid'>{ lastdetaildainf.RFIDNumb}</span></p>
                                        <p className="mb-0">{ lastdetaildainf.scanRFIDTime}</p>
                                    </div>
                                    <div className="mb-2 d-flex align-items-center justify-content-between" style={{color:'black', fontWeight:'bold'}}>
                                        <p className="mb-0">Proses Gate { lastdetaildainf.Status} Dilakukan</p>
                                        <p className="mb-0">{ lastdetaildainf.GateTimes}</p>
                                    </div>
                                    <div className="mb-2 d-flex align-items-center justify-content-between" style={{color:'black', fontWeight:'bold'}}>
                                        <p className="mb-0">{ lastdetaildainf.Status} Proses Gate <br></br>Truck { lastdetaildainf.truck} Container { lastdetaildainf.containerNumb}</p>
                                        <p className="mb-0">{ lastdetaildainf.GateTimes}</p>
                                    </div>
                                    <div className="mb-2 d-flex align-items-center justify-content-between" style={{color:'black', fontWeight:'bold'}}>
                                        <p className="mb-0">Cetak { lastdetaildainf.Lane} { lastdetaildainf.Status}</p>
                                        <p className="mb-0">{ lastdetaildainf.CMSEIRDatePrint}</p>
                                    </div>
                                    <div className="mb-2 d-flex align-items-center justify-content-between" style={{color:'black', fontWeight:'bold'}}>
                                        <p className="mb-0">Proses Integrasi STID { lastdetaildainf.Status}</p>
                                        <p className="mb-0">{ lastdetaildainf.STIDIntegrasiDate}</p>
                                    </div>
                                    <div className="mb-2 d-flex align-items-center justify-content-between" style={{color:'black', fontWeight:'bold'}}>
                                        <p className="mb-0">Summary Proses Gate { lastdetaildainf.Status} Dilakukan</p>
                                        <p className="mb-0">{ lastdetaildainf.successDate}</p>
                                    </div>
                                    <div className="mb-0 d-flex align-items-center justify-content-between" style={{color:'black', fontWeight:'bold'}}>
                                        <p className="mb-0">Keterangan</p>
                                        <p className="mb-0" style={{color:'#008080'}}>{ lastdetaildainf.FailInfo}</p>
                                    </div>
                                </div>
                            </div>
                            ))}
                        </div>
                            }

                        </Col>
                        <Col md="12" lg="12">
                            <div className="overflow-hidden card">
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
// eslint-disable-next-line
import react, { useState, useEffect } from 'react';
import axios from 'axios'
// import { useLocation, useNavigate } from "react-router-dom";
// window.close();
export default function TestPrintCMS() {
    // const state = useLocation();
    // console.log("console di print CMS");
    // console.log("state -->",state);
    // console.log("state state -->", state.state);
    // console.log(state.state.displaytoprint);
    // let navigate = useNavigate();

    const [dataHeader, setdataHeader] = useState([]);

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

        useEffect(()=>{
            fetchDataHeader();
        // window.print();
        // navigate("/Display");
        // window.location.reload();
    })

    var data = [];
    for (var i = 0; i < dataHeader.NumberCopied; i++) {
        data.push(
        <div className="ticket-title page-break">
        {/* <h5 style={{fontSize:"14px", fontWeight:"bold"}}>EQUIPMENT INTERCHANGE RECEIPT</h5> */}
        
        <table style={{ width:'100%',textAlign:"center"}}>
            <tbody style={{alignContent:"center", margin:"auto", color:"black", paddingBottom:"10px"}}>
                <tr>
                    <td style={{ fontSize:'14px'}}>CMS</td>
                    <td style={{ fontSize:'14px'}}>2205022819</td>
                </tr>
                <tr>
                    {/* <td style={{ fontSize: '10px'}}>{state.state.displaytoprint[0].gate_in_time}</td> */}
                    {/* <td colSpan={2} style={{ fontSize: '10px'}}>{state.state.displaytoprint[0].operator}</td> */}
                </tr>
            </tbody>
        </table>
        {/* {state.state.displaytoprint.map((thedata, index) => ( */}
        {/* <> */}
            <table style={{ width:'100%',textAlign:"center"}}>
                <tbody style={{alignContent:"center", margin:"auto", color:"black", paddingBottom:"10px"}}>
                    <tr>
                        <td style={{ fontSize: '10px'}}>20220512103106</td>
                        <td colSpan={2} style={{ fontSize: '10px'}}>CMA</td>
                    </tr>
                </tbody>
            </table>
            <table style={{ width:'100%', fontSize:'13px', textAlign:"center" }}>
                <tbody style={{alignContent:"center", margin:"auto", color:"black", paddingBottom:"10px"}}>
                    <tr>
                        <td style={{fontSize:"16px", fontWeight:"bold"}}>TEGU2117701</td>
                    </tr>
                </tbody>
            </table>
            <table style={{ width:'100%', fontSize:'13px',textAlign:"center" }}>
                <tbody style={{alignContent:"center", margin:"auto", color:"black", paddingBottom:"10px"}}>
                    <tr>
                        <td>EX F</td>
                        <td>GE</td>
                        <td>GIN</td>
                    </tr>
                    <tr>
                        <td>2200</td>
                        <td colSpan={2}>18000Kg</td>
                    </tr>
                </tbody>
            </table>
            <table style={{ width:'100%', fontSize:'13px', textAlign:"center"}}>
                <tbody style={{alignContent:"center", margin:"auto", color:"black", paddingBottom:"10px"}}>
                    <tr>
                        <td style={{fontSize:"16px", fontWeight:"bold"}}>1E-19-04-7</td>
                    </tr>
                    <tr>
                        <td>-----------------------------------</td>
                    </tr>
                </tbody>
            </table>
        {/* </> */}
        {/* ))} */}
        <table style={{ width:'100%', fontSize:'13px',textAlign:"center" }}>
            <tbody style={{margin:"auto", color:"black", paddingBottom:"10px"}}>
                <tr>
                    <td>CO5555</td>
                    <td>B1467QQA</td>
                </tr>
            </tbody>
        </table>
        <table style={{ width:'100%', fontSize:'13px' }}>
            <tbody style={{margin:"auto", color:"black", paddingBottom:"10px"}}>
                <tr>
                    <td style={{alignContent:"left"}}>12/05/2022 10:31</td>
                </tr>
                <tr>
                    <td>[IPC TPK Tanjung Priok Zone1]</td>
                </tr>
            </tbody>
        </table>
    </div>
    );
        
    }
    return (
        <>
            {/* onLoad="window.print()" */}
            <div className="tiket"> 
                {data}
            </div>
        </>
    )
    
}
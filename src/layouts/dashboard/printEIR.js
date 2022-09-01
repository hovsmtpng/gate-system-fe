// eslint-disable-next-line
import react, { useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
// window.close();
export default function PrintEIR() {
    const state = useLocation();
    console.log("console di print EIR");
    console.log("state -->",state);
    console.log("state state -->", state.state);
    console.log(state.state.displaytoprint);
    const datanye ={
        // maxWidth:'20px !important'
    }
    let navigate = useNavigate();
    useEffect(()=>{
        window.print();
        navigate("/Display")
        window.location.reload();
    })


    
    return (
        <>
            {/* onLoad="window.print()" */}
            <div className="tiket"> 
            <div className="ticket-title" style={{textAlign:"center",}}>
                    <h5 style={{fontSize:"14px", fontWeight:"bold"}}>EQUIPMENT INTERCHANGE RECEIPT</h5>
                    <h5 style={{fontSize:"16px", fontWeight:"bold"}}>(EIR)</h5>
                    <h5 style={{fontSize:"16px", fontWeight:"bold"}}>GATE OUT</h5>
                    <h5 style={{fontSize:"14px", fontWeight:"bold"}}>[IPC TPK Tanjung Priok Zone 1]</h5>
                </div>
                <br></br>
                {state.state.displaytoprint.map((thedata, index) => (
                    <>
                    <table style={{alignContent:"center", margin:"auto", color:"black", paddingBottom:"10px"}}>
                        <tbody style={{ width:'100%', fontSize:"10px" }}>
                            <tr>
                                <td>Container No</td>
                                <td>:</td>
                                <td style={{ datanye }}>{thedata.container_no}</td>
                            </tr>
                            <tr>
                                <td>ISO</td>
                                <td>:</td>
                                <td style={{ datanye }}>{thedata.iso}</td>
                            </tr>
                            <tr>
                                <td>Vessel & Voyage</td>
                                <td>:</td>
                                <td style={{ datanye }}>{thedata.vessel_voyage}</td>
                            </tr>
                            <tr>
                                <td>ETD</td>
                                <td>:</td>
                                <td style={{ datanye }}>{thedata.etd}</td>
                            </tr>
                            <tr>
                                <td>Operator</td>
                                <td>:</td>
                                <td style={{ datanye }}>{thedata.operator}</td>
                            </tr>
                            <tr>
                                <td>Booking No</td>
                                <td>:</td>
                                <td style={{ datanye }}>{thedata.booking_no}</td>
                            </tr>
                            <tr>
                                <td>POD</td>
                                <td>:</td>
                                <td style={{ datanye }}>{thedata.pod}</td>
                            </tr>
                            <tr>
                                <td>SP Handling</td>
                                <td>:</td>
                                <td style={{ datanye }}>{thedata.sp_handling}</td>
                            </tr>
                            <tr>
                                <td>Gross Weight</td>
                                <td>:</td>
                                <td style={{ datanye }}>{thedata.gross_weight}</td>
                            </tr>
                            <tr>
                                <td style={{ width:'40%' }}>DG Label</td>
                                <td style={{ width:'10%' }}>:</td>
                                <td style={{ width:'50%' }}>{thedata.dg_label}</td>
                            </tr>
                            <tr>
                                <td>DG Code</td>
                                <td>:</td>
                                <td style={{ datanye }}>{thedata.dg_code}</td>
                            </tr>
                            <tr>
                                <td>Temperature</td>
                                <td>:</td>
                                <td style={{ datanye }}>{thedata.temperature}</td>
                            </tr>
                            <tr>
                                <td>Shipper</td>
                                <td>:</td>
                                <td style={{ datanye }}>{thedata.shipper}</td>
                            </tr>
                            <tr>
                                <td>Customer Doc</td>
                                <td>:</td>
                                <td style={{ datanye }}>{thedata.customs_doc}</td>
                            </tr>
                            <tr>
                                <td>Tag No.</td>
                                <td>:</td>
                                <td style={{ datanye }}>{thedata.tag_no}</td>
                            </tr>
                            <tr>
                                <td>Police No.</td>
                                <td>:</td>
                                <td style={{ datanye }}>{thedata.police_no}</td>
                            </tr>
                            <tr>
                                <td>Trucking</td>
                                <td>:</td>
                                <td style={{ datanye }}>{thedata.trucking_company}</td>
                            </tr>
                            <tr>
                                <td>Seal No.</td>
                                <td>:</td>
                                <td style={{ datanye }}>{thedata.seal_no}</td>
                            </tr>
                            <tr>
                                <td>Loc. Stack</td>
                                <td>:</td>
                                <td style={{ datanye }}>{thedata.loc_stack}</td>
                            </tr>
                            <tr>
                                <td>In</td>
                                <td>:</td>
                                <td style={{ datanye }}>{thedata.in_time}</td>
                            </tr>
                            <tr>
                                <td>Out</td>
                                <td>:</td>
                                <td style={{ datanye }}>{thedata.out_time}</td>
                            </tr>
                            <tr>
                                <td>Inspection</td>
                                <td>:</td>
                                <td style={{ datanye }}>{thedata.inspection}</td>
                            </tr>
                            <tr>
                                <td>Damage</td>
                                <td>:</td>
                                <td style={{ datanye }}>{thedata.damage}</td>
                            </tr>
                            <tr>
                                <td>Remarks</td>
                                <td>:</td>
                                <td style={{ datanye }}>{thedata.remarks}</td>
                            </tr>
                            <tr>
                                <td>Inspektor</td>
                                <td>:</td>
                                <td style={{ datanye }}>{thedata.inspector}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div>-------------------------------------</div>
                    </>
                ))}
            </div>
        </>
    )
    
}
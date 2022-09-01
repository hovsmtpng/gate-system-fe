// eslint-disable-next-line
import react, { useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
// window.close();
export default function PrintCMS() {
    const state = useLocation();
    console.log("console di print CMS");
    console.log("state -->",state);
    console.log("state state -->", state.state);
    console.log(state.state.displaytoprint);
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
                <div className="ticket-title">
                    {/* <h5 style={{fontSize:"14px", fontWeight:"bold"}}>EQUIPMENT INTERCHANGE RECEIPT</h5> */}
                    
                    <table style={{ width:'100%',textAlign:"center"}}>
                        <tbody style={{alignContent:"center", margin:"auto", color:"black", paddingBottom:"10px"}}>
                            <tr>
                                <td style={{ fontSize:'14px'}}>{state.state.displaytoprint[0].type}</td>
                                <td style={{ fontSize:'14px'}}>{state.state.displaytoprint[0].tranport_order_no}</td>
                            </tr>
                            <tr>
                                {/* <td style={{ fontSize: '10px'}}>{state.state.displaytoprint[0].gate_in_time}</td> */}
                                {/* <td colSpan={2} style={{ fontSize: '10px'}}>{state.state.displaytoprint[0].operator}</td> */}
                            </tr>
                        </tbody>
                    </table>
                    {state.state.displaytoprint.map((thedata, index) => (
                    <>
                        <table style={{ width:'100%',textAlign:"center"}}>
                            <tbody style={{alignContent:"center", margin:"auto", color:"black", paddingBottom:"10px"}}>
                                <tr>
                                    <td style={{ fontSize: '10px'}}>{thedata.gate_in_time}</td>
                                    <td colSpan={2} style={{ fontSize: '10px'}}>{thedata.operator}</td>
                                </tr>
                            </tbody>
                        </table>
                        <table style={{ width:'100%', fontSize:'13px', textAlign:"center" }}>
                            <tbody style={{alignContent:"center", margin:"auto", color:"black", paddingBottom:"10px"}}>
                                <tr>
                                    <td style={{fontSize:"16px", fontWeight:"bold"}}>{thedata.cargo_no}</td>
                                </tr>
                            </tbody>
                        </table>
                        <table style={{ width:'100%', fontSize:'13px',textAlign:"center" }}>
                            <tbody style={{alignContent:"center", margin:"auto", color:"black", paddingBottom:"10px"}}>
                                <tr>
                                    <td>{thedata.class} {thedata.full_empty}</td>
                                    <td>{thedata.cargo_no === state.state.flagtoprint[0].NO_CONTAINER ? state.state.flagtoprint[0].COMODITY : state.state.flagtoprint[1].COMODITY}</td>
                                    <td>{thedata.gate_in_lane_id}</td>
                                </tr>
                                <tr>
                                    <td>{thedata.iso}</td>
                                    <td colSpan={2}>{thedata.gross_weight}Kg</td>
                                </tr>
                            </tbody>
                        </table>
                        <table style={{ width:'100%', fontSize:'13px', textAlign:"center"}}>
                            <tbody style={{alignContent:"center", margin:"auto", color:"black", paddingBottom:"10px"}}>
                                <tr>
                                    <td style={{fontSize:"16px", fontWeight:"bold"}}>{thedata.yard_location}</td>
                                </tr>
                                <tr>
                                    <td>-----------------------------------</td>
                                </tr>
                            </tbody>
                        </table>
                    </>
                    ))}
                    <table style={{ width:'100%', fontSize:'13px',textAlign:"center" }}>
                        <tbody style={{margin:"auto", color:"black", paddingBottom:"10px"}}>
                            <tr>
                                <td>{state.state.displaytoprint[0].truck_id}</td>
                                <td>{state.state.transportertoprint.TRUCK_NUMBER}</td>
                            </tr>
                        </tbody>
                    </table>
                    <table style={{ width:'100%', fontSize:'13px' }}>
                        <tbody style={{margin:"auto", color:"black", paddingBottom:"10px"}}>
                            <tr>
                                <td style={{alignContent:"left"}}>{state.state.displaytoprint[0].slip_print_time}</td>
                            </tr>
                            <tr>
                                <td>{state.state.displaytoprint[0].terminal_info_display_nm}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
    
}
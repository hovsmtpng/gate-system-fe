import React, {useEffect} from 'react'
import {bindActionCreators} from "redux"

//header
import HeaderStyle3 from '../../components/partials/dashboard/HeaderStyle/headers'

//HorizontalMultiRouter 
import SettingRouter from '../../router/setting-router'

//footer
import Footer from '../../components/partials/dashboard/FooterStyle/footer'

// store
import {NavbarstyleAction, getDirMode, SchemeDirAction,  getNavbarStyleMode, getSidebarActiveMode, SidebarActiveStyleAction, getDarkMode, ModeAction,  SidebarColorAction, getSidebarColorMode, getSidebarTypeMode} from '../../store/setting/setting'
import {connect} from "react-redux"

const mapStateToProps = (state) => {
    return {
        darkMode: getDarkMode(state),
        schemeDirMode: getDirMode(state),
        sidebarcolorMode: getSidebarColorMode(state),
        sidebarTypeMode: getSidebarTypeMode(state),
        sidebaractivestyleMode: getSidebarActiveMode(state),
        navbarstylemode: getNavbarStyleMode(state),
    };
}
const mapDispatchToProps = dispatch => ({
    ...bindActionCreators(
        {
            ModeAction,
            SchemeDirAction,
            SidebarColorAction,
            SidebarActiveStyleAction,
            NavbarstyleAction,
        },
        dispatch
    )
})

const Setting = (props) => {
    useEffect(() => {
        //   darkmode
        const colorMode = sessionStorage.getItem('color-mode');
        if(colorMode===null){
            props.ModeAction(props.darkMode);
        }
        else{
            props.ModeAction(colorMode);
        }

        // rtlmode
        const rtlMode = sessionStorage.getItem('rtl-mode');
        if(rtlMode===null){
            props.SchemeDirAction(props.schemeDirMode)
        }
        else{
            props.SchemeDirAction(rtlMode);
        }   
      })
    return (
        <>
            <main className="main-content">
                <HeaderStyle3 />
                <div className="pb-0 conatiner-fluid content-inner">
                    <SettingRouter />
                </div>
                <Footer />
            </main>   
        </>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Setting)

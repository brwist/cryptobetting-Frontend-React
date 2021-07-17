import React, { useEffect,useRef,useState} from "react";
import { connect, useDispatch } from "react-redux";
import { numberWithCommas } from "../../utils/numberWithCommas"
import { Link } from "react-router-dom";
import { setSocketData } from "../../store/tableData/actions";
import {Button} from 'reactstrap'
// Import menuDropdown
import LanguageDropdown from "../CommonForBoth/TopbarDropdown/LanguageDropdown";
import NotificationDropdown from "../CommonForBoth/TopbarDropdown/NotificationDropdown";
import ProfileMenu from "../CommonForBoth/TopbarDropdown/ProfileMenu";

//Import i18n
import { withNamespaces } from "react-i18next";

//Import Megamenu
import MegaMenu from "./MegaMenu";

// Redux Store
import { toggleRightSidebar } from "../../store/actions";

const usePrevious=(value) =>{
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const Header = (props) =>{
  const [isToggled,setIsToggled]=useState(false);

  const {price} = props.tableData;
  const prevAmount = usePrevious(price);
  // localStorage.setItem("mark_price_prev",props.tableData.data.mark_price)
  const toggleMenu = () => {
    if(isToggled===false || isToggled===undefined)
    {
      setIsToggled(true)
    }
    else
    {
      setIsToggled(false)
    }
    props.toggleMenuCallback();
  }
  /**
   * Toggles the sidebar
   */
  const toggleRightbar = () => {
    props.toggleRightSidebar();
  }
  const dispatch = useDispatch();
  const wsConnect = (ws) => {
      ws.onopen = function () {

          ws.send(JSON.stringify({
            "token": "1"
          }))

        }
        ws.onmessage = function (e) {
          let res = JSON.parse(e.data);
          if("price" in res)
         {
            dispatch(setSocketData(res.price,res.fixtures,res.timestamp))
         }
         else
         {
          dispatch(setSocketData(res.price,res.fixtures,res.timestamp))
         }
        
        //   setMarkPrice(res.mark_price)
        }
        ws.onclose = function () {
            console.log("common ws closed.Reconnecting....");
            wsConnect(ws)
          };
          heartbeat(ws);

  }
  const heartbeat = (ws) => {
    if (!ws) return;
    if (ws.readyState !== 1) return;
    ws.send("heartbeat");
    setTimeout(heartbeat, 1000);
  }
  useEffect(() => {
    
      let ws = new WebSocket("ws://18.183.29.9:8006");
      wsConnect(ws)

      return () => {
          ws.onclose = function () {
              console.log("common ws closed.Reconnecting....");
              wsConnect(ws)
            };
        }
  }, [])
  const toggleFullscreen = () => {
    if (
      !document.fullscreenElement &&
      /* alternative standard method */ !document.mozFullScreenElement &&
      !document.webkitFullscreenElement
    ) {
      // current working methods
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(
          Element.ALLOW_KEYBOARD_INPUT
        );
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  }

    return (
      <React.Fragment>
            <header id="page-topbar">
            <div className="navbar-header">
                    <div className="d-flex">
                    <div className="navbar-brand-box" style={{"background": "#28253b"}}>
                        
                            <Link to="/" className="logo logo-light">
                                 <span className="logo-sm-i">BO</span>
                            </Link>
                        </div>

                        <Button size="sm" color="none" type="button" onClick={toggleMenu} className="px-3 font-size-24 header-item waves-effect" id="vertical-menu-btn">
                            <i className="ri-menu-2-line align-middle"></i>
                        </Button>     
                    </div>
                    
                    <div className="d-flex">
                      <span className="btcPrice w-md btn btn-primary button-login font-weight-bold">BTC PRICE :  {" "}
                                {props.tableData.price ? 
                                    prevAmount < props.tableData.price ?
                                    <span className="text-success">{numberWithCommas(parseFloat(props.tableData.price).toFixed(3))}</span>:
                                    <span className="text-danger">{numberWithCommas(parseFloat(props.tableData.price).toFixed(3))}</span>:
                                "-"}
                                </span>
                        {/* <Link to="/logout" size="sm" color="none" type="button" className="w-md waves-effect waves-light btn btn-primary button-login " id="vertical-menu-btn"> LOGOUT </Link> */}
                  </div>
        
                   
                    
                  </div>
            
            </header>
      </React.Fragment>
    );
  
}

const mapStateToProps = (store) => ({
  layoutType: store.Layout,
  tableData: store.tableData.price,
});
export default connect(mapStateToProps, {toggleRightSidebar})(Header);
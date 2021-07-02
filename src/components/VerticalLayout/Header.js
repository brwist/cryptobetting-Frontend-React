import React, { useEffect,useRef } from "react";
import { connect, useDispatch } from "react-redux";
import { numberWithCommas } from "../../utils/numberWithCommas"
import { Link } from "react-router-dom";
import { setSocketData } from "../../store/tableData/actions";

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
  const {price} = props.tableData;
  const prevAmount = usePrevious(price);
  // localStorage.setItem("mark_price_prev",props.tableData.data.mark_price)
   const toggleMenu = () => {
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
          if("price" in res);
         {
            dispatch(setSocketData(res.price,res.rake_over,res.rake_under,res.expiries))
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
                  <div className="row" style={{"width":"100%"}}>
                      <div className="col-md-6">
                      <div className="navbar-brand-box">
                            <Link to="#" className="logo logo-dark font-weight-bold">
                                <span className="logo-sm">BB
                                    {/* <img src={logosmdark} alt="" height="22"/> */}
                                </span>
                                <span className="logo-lg">BB
                                    {/* <img src={logodark} alt="" height="20"/> */}
                                </span>
                            </Link>

                            <Link to="#" className="logo logo-light">
                                <span className="logo-sm">BB
                                    {/* <img src={logosmlight} alt="" height="22"/> */}
                                </span>
                                <span className="logo-lg">BB
                                    {/* <img src={logolight} alt="" height="20"/> */}
                                </span>
                            </Link>
                        </div>
                      </div>
                      <div className="col-md-6 text-right">
                            <Link to="#" className="logo font-weight-bold ">
                                <span className="btcPrice">BTC PRICE :  {" "}
                                {props.tableData.price ? 
                                    prevAmount < props.tableData.price ?
                                    <span className="text-success">{numberWithCommas(parseFloat(props.tableData.price).toFixed(3))}</span>:
                                    <span className="text-danger">{numberWithCommas(parseFloat(props.tableData.price).toFixed(3))}</span>:
                                "-"}
                                </span>
                               </Link>
                      </div>
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
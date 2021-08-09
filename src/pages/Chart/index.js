import React, { useEffect,useRef,useState} from "react";
import { Container, Row, Col } from "reactstrap";
import { connect, useDispatch } from "react-redux";
import { numberWithCommas } from "../../utils/numberWithCommas"
import { setSocketData } from "../../store/tableData/actions";
const Chart =(props) => {
    const usePrevious=(value) =>{
        const ref = useRef();
        useEffect(() => {
          ref.current = value;
        });
        return ref.current;
      }
    // const { theme } = useParams();
    const params = new URLSearchParams(window.location.search) // id=123
    let theme = params.get('theme') // 123 
    let height = params.get('height')
    let width = params.get('width')
    let hide_top_toolbar=params.get('hide_top_toolbar');
    let allow_symbol_change=params.get('allow_symbol_change')
    let hide_legend=params.get('hide_legend')
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/tv.js'
        script.async = true;
        script.innerHTML = new window.TradingView.widget(
          {
            "width":width,
            "height": height,
            "symbol": 'BINANCE:BTCUSDT',
            "interval": "1",
            "timezone": "America/New_York",
            "theme": theme,
            "style": "1",
            "locale": "en",
            "toolbar_bg": "#f1f3f6",
            "enable_publishing": false,
            "allow_symbol_change": allow_symbol_change,
            "container_id": "tradingview_f46e4",
            "hide_top_toolbar":hide_top_toolbar,
            "hide_legend": hide_legend,
          }
        );
      }, [])    
      const [isToggled,setIsToggled]=useState(false);
      const {price} = props.tableData;
      const prevAmount = usePrevious(price);
      
      const dispatch = useDispatch();
      const wsConnect = (ws) => {
          ws.onopen = function () {
    
              ws.send(JSON.stringify({
                "token": "1"
              }))
    
            }
            ws.onmessage = function (e) {
              let res = JSON.parse(e.data);
              if(res.type==="type1")
             {
                dispatch(setSocketData(res.price))
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


        return (
            <React.Fragment>
                <div className="page-content p-0 m-0">
                    <Container fluid={true}>
      
                        <Row className="py-4">
                            <Col xl={12}>
                            <div className="text-left py-2 pt-0">
                            <span className="btcPrice w-md btn btn-primary button-login font-weight-bold">BTC PRICE :  {" "}
                                {props.tableData.price ? 
                                    prevAmount < props.tableData.price ?
                                    <span className="text-success">{numberWithCommas(parseFloat(props.tableData.price).toFixed(3))}</span>:
                                    <span className="text-danger">{numberWithCommas(parseFloat(props.tableData.price).toFixed(3))}</span>:
                                "-"}
                                </span>
                              {/* <Link to="/logout" size="sm" color="none" type="button" className="w-md waves-effect waves-light btn btn-primary button-login " id="vertical-menu-btn"> LOGOUT </Link> */}
                            </div>
                            <div id="tradingview_f46e4"></div>
                            </Col>
                        </Row>

                    </Container> 
                </div>
            </React.Fragment>
        );
    
}


const mapStateToProps = (store) => ({
    tableData: store.tableData.data,
  });
  export default connect(mapStateToProps, {})(Chart);
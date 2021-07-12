import React, { useState,useEffect} from "react";
import { Container, Row, Col } from "reactstrap";

const TradingViewChart =() => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/tv.js'
        script.async = true;
        script.innerHTML = new window.TradingView.widget(
          {
            "width": "100%",
            "height": "30rem",
            "symbol": 'BINANCE:BTCUSDT',
            "interval": "15",
            "timezone": "America/New_York",
            "theme": "dark",
            "style": "1",
            "locale": "en",
            "toolbar_bg": "#f1f3f6",
            "enable_publishing": false,
            "allow_symbol_change": true,
            "container_id": "tradingview_f46e4"
          }
        );
      }, [])
    
        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>
                        
                        <Row className="py-4">
                            <Col xl={12}>
                                <h4 className="py-4">Trading View Chart</h4>
                                <div id="tradingview_f46e4"></div>
                            </Col>

                            <Col xl={4}>

                            </Col>
                        </Row>

                    </Container> 
                </div>
            </React.Fragment>
        );
    
}

export default TradingViewChart;

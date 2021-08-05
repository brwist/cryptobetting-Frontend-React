import React, { useState,useEffect} from "react";
import { Container, Row, Col } from "reactstrap";

const Chart =() => {
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
            "interval": "15",
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
        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>
                        
                        <Row className="py-4">
                            <Col xl={12}>
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

export default Chart;

import react from 'react';
import axios from 'axios';


class About extends react.Component{


    constructor(){
        super();
        this.state={
            aboutUs:[]

        }
    }

    componentDidMount(){
        const {about}=this.state;

        axios({
            url:'https://guarded-cliffs-31948.herokuapp.com/aboutUs',
            method:'GET',
            headers:{'Content-Type' : 'application/json'}
        })
        .then(response =>{
            this.setState({aboutUs:response.data.aboutUs})
        })
        .catch( err => console.log(err))
    }

    render(){
        const {aboutUs}=this.state;
        let x=aboutUs[0];
        let y=aboutUs[1]
        let z=aboutUs[2]
        return(
            <>
            
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-sm-12">
                            <img src="../../Assets/about_order.jpg" className="about-order" />
                        </div>
                        <div className="col-lg-6 col-sm-12">
                            <div className="about-order">
                                
                                {
                                    <div id="about">
                                    <div className="about-title">{x && x.title}</div>
                                    <span className="number">1</span><span style={{fontSize: "large"}}>{x && x.point[0]}</span>
                                    <div className="about-dist">{x && x.description[0]}</div>

                                    <span className="number">2</span><span style={{fontSize: "large"}}>{x && x.point[1]}</span>
                                    <div className="about-dist">{x && x.description[1]}</div>

                                    <span className="number">3</span><span style={{fontSize: "large"}}>{x && x.point[2]}</span>
                                    <div className="about-dist">{x && x.description[2]}</div>

                                    <button className="btn about-btn">Learn more</button>
                                    </div>
                                }
                            </div>
                                
                        </div>
                    </div>
                    <div className="row">
                    <div className="col-lg-6 col-sm-12">
                    <div className="about-order">
                                
                                {
                                    <div id="about">
                                    <div className="about-title">{y && y.title}</div>
                                    <span className="number">1</span><span style={{fontSize: "large"}}>{y && y.point[0]}</span>
                                    <div className="about-dist">{y && y.description[0]}</div>

                                    <span className="number">2</span><span style={{fontSize: "large"}}>{y && y.point[1]}</span>
                                    <div className="about-dist">{y && y.description[1]}</div>

                                    <span className="number">3</span><span style={{fontSize: "large"}}>{y && y.point[2]}</span>
                                    <div className="about-dist">{y && y.description[2]}</div>

                                    <button className="btn about-btn">Learn more</button>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="col-lg-6 col-sm-12">
                            <img src="../../Assets/dilivery.jpg" className="about-order"/>
                        </div>
                        
                    </div>
                    <div className="row">
                        <div className="col-lg-6 col-sm-12">
                            <img src="../../Assets/home.jpg" className="about-order"/>
                        </div>
                        <div className="col-lg-6 col-sm-12">
                        <div className="about-order">
                                
                                {
                                    <div id="about">
                                    <div className="about-title">{z && z.title}</div>
                                    <span className="number">1</span><span style={{fontSize: "large"}}>{z && z.point[0]}</span>
                                    <div className="about-dist">{z && z.description[0]}</div>

                                    <span className="number">2</span><span style={{fontSize: "large"}}>{z && z.point[1]}</span>
                                    <div className="about-dist">{z && z.description[1]}</div>

                                    <span className="number">3</span><span style={{fontSize: "large"}}>{z && z.point[2]}</span>
                                    <div className="about-dist">{z && z.description[2]}</div>

                                    <button className="btn about-btn">Learn more</button>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
export default About;

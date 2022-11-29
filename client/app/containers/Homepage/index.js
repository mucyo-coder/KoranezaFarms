/**
 *
 * Homepage
 *
 */

import React from "react";

import { connect } from "react-redux";
import { Row, Col } from "reactstrap";

import actions from "../../actions";
import banners from "./banners.json";
import CarouselSlider from "../../components/Common/CarouselSlider";
import { responsiveOneItemCarousel } from "../../components/Common/CarouselSlider/utils";
import { Link } from "react-router-dom";

class Homepage extends React.PureComponent {
	render() {
		return (
			<div>
				<Col xs='12' lg='12'>
					<div className="home-carousel">
						<CarouselSlider
							swipeable={true}
							showDots={true}
							infinite={true}
							autoPlay={false}
							slides={banners}
							responsive={responsiveOneItemCarousel}
						>
							{banners.map((item, index) => (
								<div key={index} className="caroussel-image-container">
									<img
										style={{
											objectFit: "cover",
											width: "100%",
											height: 900,
										}}
										src={item.imageUrl}
										alt="home banner images"
									/>
									<div className="overlay">
										<div className="caroussel-text">
											<span className="subtitle">Koraneza Farms</span>
											<p className="title">Buy fresh foods</p>
											<p className="description">
												Dont miss amazing grocery deals on a discount this
												season
											</p>
											<div className="flex-row action-buttons">
												<Link to="/shop" className="default-btn">
													Shop Fruits
												</Link>
												<Link lg="6" to="/shop" className="default-btn">
													Shop Vegetables
												</Link>
											</div>
										</div>
									</div>
								</div>
							))}
						</CarouselSlider>
					</div>
				</Col>
				{/* <Col xs='12' lg='3' className='order-lg-1 mb-3 px-3 px-md-2'>
						<div className='d-flex flex-column h-100 justify-content-between'>
							<img
								src='/images/banners/banner-3.jpg'
								className='mb-3'
								alt="banner-3"
							/>
							<img src='/images/banners/banner-2.jpeg' alt="banner-2" />
						</div>
					</Col>
					<Col xs='12' lg='3' className='order-lg-3 mb-3 px-3 px-md-2'>
						<div className='d-flex flex-column h-100 justify-content-between'>
							<img
								src='/images/banners/banner-3.jpg'
								className='mb-3'
								alt="banner-3"
							/>
							<img src='/images/banners/banner-4.jpeg' alt="banner-4" />
						</div>
					</Col> */}
			</div>
		);
	}
}

const mapStateToProps = () => {
	return {};
};

export default connect(mapStateToProps, actions)(Homepage);

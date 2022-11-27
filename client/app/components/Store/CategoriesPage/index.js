/**
 *
 * CategoryList
 *
 */

import React from "react";

import { Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

const CategoryList = (props) => {
	const { categories } = props;

	return (
		<div className='category-list'>
			<h3 className='text-uppercase'>Shop By Category</h3>
			<hr />
			<Row className='flex-sm-row'>
				{categories.map((category) => (
					<Col xs='6' md='4' lg='3' key={category._id} className='mb-3 px-2'>
						<Link
							to={`/shop/category/${category.slug}`}
							className='d-block category-box'
						>
							<h5>{category.name}</h5>
							<p className='category-desc'>{category.description}</p>
						</Link>
					</Col>
				))}
			</Row>
		</div>
	);
};

export default CategoryList;

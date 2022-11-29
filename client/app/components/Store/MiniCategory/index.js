/**
 *
 * MiniCategory
 *
 */

import React from "react";

import { Link } from "react-router-dom";

const MiniCategory = (props) => {
	const { categories, toggleCategory } = props;

	const handleMenuItemClick = () => {
		toggleCategory();
	};

	return (
		<div className='mini-category-list'>
			<div className='d-flex align-items-center justify-content-between min-category-title'>
				<h4 className='mb-0 text-uppercase'>Shop By Category</h4>
				<Link
					to={"/categories"}
					className='redirect-link'
					role='menuitem'
					onClick={handleMenuItemClick}
				>
					See all
				</Link>
			</div>
			<div className='mini-category-block'>
				{categories.map((category, index) => (
					<div key={index} className='category-item'>
						<Link
							to={`/shop/category/${category.slug}`}
							className='category-link'
							role='menuitem'
						>
							{category.name}
						</Link>
					</div>
				))}
			</div>
		</div>
	);
};

export default MiniCategory;

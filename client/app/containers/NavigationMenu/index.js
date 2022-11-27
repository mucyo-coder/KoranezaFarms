/**
 *
 * NavigationMenu
 *
 */

import React from "react";

import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { Container } from "reactstrap";

import actions from "../../actions";

class NavigationMenu extends React.PureComponent {
	render() {
		const { categories } = this.props;
		return (
			<div className='navigation-menu'>
				<div className='menu-body'>
					<Container>
						<h3 className='menu-title'>Shop By Category</h3>
						<nav role='navigation'>
							<ul className='menu-list'>
								{categories.map((link, index) => (
									<li key={index} className='menu-item'>
										<NavLink
											onClick={handleCategoryClick}
											to={`/shop/category/${link.slug}`}
											activeClassName='active-link'
											exact={true}
										>
											{link.name}
										</NavLink>
									</li>
								))}
							</ul>
						</nav>
					</Container>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		categories: state.category.storeCategories,
	};
};

export default connect(mapStateToProps, actions)(NavigationMenu);

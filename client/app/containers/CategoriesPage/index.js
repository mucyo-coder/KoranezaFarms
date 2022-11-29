/**
 *
 * CategoriesPage
 *
 */

import React from "react";

import { connect } from "react-redux";
import { Container } from "reactstrap";

import actions from "../../actions";

import CategoryList from "../../components/Store/CategoriesPage";

class CategoriesPage extends React.PureComponent {
	componentDidMount() {
		this.props.fetchStoreCategories();
	}

	render() {
		const { categories } = this.props;

		return (
			<Container>
				<div className="wrapper">
					<CategoryList categories={categories} />
				</div>
			</Container>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		categories: state.category.storeCategories,
	};
};

export default connect(mapStateToProps, actions)(CategoriesPage);

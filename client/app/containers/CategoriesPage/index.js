/**
 *
 * CategoriesPage
 *
 */

import React from "react";

import { connect } from "react-redux";

import actions from "../../actions";

import CategoryList from "../../components/Store/CategoriesPage";

class CategoriesPage extends React.PureComponent {
	componentDidMount() {
		this.props.fetchStoreCategories();
	}

	render() {
		const { categories } = this.props;

		return <CategoryList categories={categories} />;
	}
}

const mapStateToProps = (state) => {
	return {
		categories: state.category.storeCategories,
	};
};

export default connect(mapStateToProps, actions)(CategoriesPage);

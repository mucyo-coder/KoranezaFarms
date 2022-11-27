/**
 *
 * Navigation
 *
 */

import React from "react";

import { connect } from "react-redux";
import { Link, NavLink as ActiveLink, withRouter } from "react-router-dom";
import Autosuggest from "react-autosuggest";
import AutosuggestHighlightMatch from "autosuggest-highlight/match";
import AutosuggestHighlightParse from "autosuggest-highlight/parse";
import {
	Container,
	Row,
	Col,
	Navbar,
	Nav,
	NavItem,
	NavLink,
	UncontrolledDropdown,
	Dropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
} from "reactstrap";

import actions from "../../actions";

import Button from "../../components/Common/Button";
import CartIcon from "../../components/Common/CartIcon";
import { BarsIcon } from "../../components/Common/Icon";
import MiniCategory from "../../components/Store//MiniCategory";
import Menu from "../NavigationMenu";
import Cart from "../Cart";

class Navigation extends React.PureComponent {
	componentDidMount() {
		this.props.fetchStoreCategories();
	}

	toggleCategory() {
		this.props.fetchStoreCategories();
		this.props.toggleCategory();
	}

	getSuggestionValue(suggestion) {
		return suggestion.name;
	}

	renderSuggestion(suggestion, { query, isHighlighted }) {
		const BoldName = (suggestion, query) => {
			const matches = AutosuggestHighlightMatch(suggestion.name, query);
			const parts = AutosuggestHighlightParse(suggestion.name, matches);

			return (
				<div>
					{parts.map((part, index) => {
						const className = part.highlight
							? "react-autosuggest__suggestion-match"
							: null;
						return (
							<span className={className} key={index}>
								{part.text}
							</span>
						);
					})}
				</div>
			);
		};

		return (
			<Link to={`/product/${suggestion.slug}`}>
				<div className='d-flex'>
					<img
						className='item-image'
						src={`${
							suggestion.imageUrl
								? suggestion.imageUrl
								: "/images/placeholder-image.png"
						}`}
						alt="logo"
					/>
					<div>
						<Container>
							<Row>
								<Col>
									<span className='name'>{BoldName(suggestion, query)}</span>
								</Col>
							</Row>
							<Row>
								<Col>
									<span className='price'>${suggestion.price}</span>
								</Col>
							</Row>
						</Container>
					</div>
				</div>
			</Link>
		);
	}

	render() {
		const {
			history,
			authenticated,
			user,
			cartItems,
			categories,
			signOut,
			isCartOpen,
			isCategoryOpen,
			toggleCart,
			searchValue,
			suggestions,
			onSearch,
			onSuggestionsFetchRequested,
			onSuggestionsClearRequested,
		} = this.props;

		const inputProps = {
			placeholder: "Search Products",
			value: searchValue,
			onChange: (_, { newValue }) => {
				onSearch(newValue);
			},
		};

		return (
			<header className='header fixed-mobile-header'>
				<Container>
					<Row className='align-items-center top-header'>
						<Col
							xs={{ size: 12, order: 1 }}
							sm={{ size: 12, order: 1 }}
							md={{ size: 3, order: 1 }}
							lg={{ size: 3, order: 1 }}
							className='pr-0'
						>
							<div className='brand'>
								<Link to='/'>
									<h1 className='logo'>Koraneza Farms</h1>
								</Link>
							</div>
						</Col>
						<Col
							xs={{ size: 12, order: 4 }}
							sm={{ size: 12, order: 4 }}
							md={{ size: 12, order: 4 }}
							lg={{ size: 5, order: 2 }}
							className='pt-2 pt-lg-0'
						>
							<Autosuggest
								suggestions={suggestions}
								onSuggestionsFetchRequested={onSuggestionsFetchRequested}
								onSuggestionsClearRequested={onSuggestionsClearRequested}
								getSuggestionValue={this.getSuggestionValue}
								renderSuggestion={this.renderSuggestion}
								inputProps={inputProps}
								onSuggestionSelected={(_, item) => {
									history.push(`/product/${item.suggestion.slug}`);
								}}
							/>
						</Col>
						<Col
							xs={{ size: 12, order: 2 }}
							sm={{ size: 12, order: 2 }}
							md={{ size: 4, order: 1 }}
							lg={{ size: 5, order: 3 }}
							className='desktop-hidden'
						>
							<div className='header-links'>
								<Button
									borderless={true}
									variant='empty'
									ariaLabel='open the menu'
									icon={<BarsIcon />}
								/>
								<CartIcon cartItems={cartItems} onClick={toggleCart} />
							</div>
						</Col>
						<Col
							xs={{ size: 12, order: 2 }}
							sm={{ size: 12, order: 2 }}
							md={{ size: 9, order: 1 }}
							lg={{
								size: 4,
								order: 3,
							}}
							// className='px-0'
						>
							<Navbar
								color='light'
								light={true}
								expand='md'
								className='mt-1 mt-md-0'
							>
								<CartIcon
									className='d-none d-md-block'
									cartItems={cartItems}
									onClick={toggleCart}
								/>
								<Nav navbar={true}>
									{categories && categories.length > 0 && (
										<Dropdown
											nav={true}
											inNavbar={true}
											toggle={() => this.toggleCategory()}
											isOpen={isCategoryOpen}
										>
											<DropdownToggle nav={true}>
												Categories
												<span className='fa fa-chevron-down dropdown-caret' />
											</DropdownToggle>
											<DropdownMenu right={true} className='nav-brand-dropdown'>
												<div className='mini-brand'>
													<MiniCategory
														categories={categories}
														toggleCategory={() => this.toggleCategory()}
													/>
												</div>
											</DropdownMenu>
										</Dropdown>
									)}
									<NavItem>
										<NavLink
											tag={ActiveLink}
											to='/shop'
											activeClassName='active'
										>
											Shop
										</NavLink>
									</NavItem>
									{authenticated ? (
										<UncontrolledDropdown nav={true} inNavbar={true}>
											<DropdownToggle nav={true}>
												{user.firstName ? user.firstName : "Welcome"}
												<span className='fa fa-chevron-down dropdown-caret' />
											</DropdownToggle>
											<DropdownMenu right={true}>
												<DropdownItem
													onClick={() => history.push("/dashboard")}
												>
													Dashboard
												</DropdownItem>
												<DropdownItem onClick={signOut}>Sign Out</DropdownItem>
											</DropdownMenu>
										</UncontrolledDropdown>
									) : (
										<UncontrolledDropdown nav={true} inNavbar={true}>
											<DropdownToggle nav={true}>
												Welcome!
												<span className='fa fa-chevron-down dropdown-caret' />
											</DropdownToggle>
											<DropdownMenu right={true}>
												<DropdownItem onClick={() => history.push("/login")}>
													Login
												</DropdownItem>
												<DropdownItem onClick={() => history.push("/register")}>
													Sign Up
												</DropdownItem>
											</DropdownMenu>
										</UncontrolledDropdown>
									)}
								</Nav>
							</Navbar>
						</Col>
					</Row>
				</Container>

				{/* hidden cart drawer */}
				<div
					className={isCartOpen ? "mini-cart-open" : "hidden-mini-cart"}
					aria-hidden={`${isCartOpen ? false : true}`}
				>
					<div className='mini-cart'>
						<Cart />
					</div>
					<button
						className={
							isCartOpen ? "drawer-backdrop dark-overflow" : "drawer-backdrop"
						}
						onClick={toggleCart}
					/>
				</div>
			</header>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isCartOpen: state.navigation.isCartOpen,
		isCategoryOpen: state.navigation.isCategoryOpen,
		cartItems: state.cart.cartItems,
		brands: state.brand.storeBrands,
		categories: state.category.storeCategories,
		authenticated: state.authentication.authenticated,
		user: state.account.user,
		searchValue: state.navigation.searchValue,
		suggestions: state.navigation.searchSuggestions,
	};
};

export default connect(mapStateToProps, actions)(withRouter(Navigation));

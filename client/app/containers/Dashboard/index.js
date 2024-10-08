/**
 *
 * Dashboard
 *
 */

import React from "react";

import { connect } from "react-redux";

import actions from "../../actions";
import { ROLE_ADMIN, ROLE_MEMBER, ROLE_MERCHANT } from "../../constants";
import dashboardLinks from "./links.json";
import Admin from "../../components/Manager/Dashboard/Admin";
import Merchant from "../../components/Manager/Dashboard/Merchant";
import Customer from "../../components/Manager/Dashboard/Customer";
import LoadingIndicator from "../../components/Common/LoadingIndicator";
import { Container } from "reactstrap";

class Dashboard extends React.PureComponent {
	componentDidMount() {
		this.props.fetchProfile();
	}

	render() {
		const { user, isLoading } = this.props;

		return (
			<Container>
				<div className="wrapper">
					{isLoading ? (
						<LoadingIndicator inline={true} />
					) : user.role === ROLE_ADMIN ? (
						<Admin links={dashboardLinks[ROLE_ADMIN]} />
					) : user.role === ROLE_MERCHANT && user.merchant ? (
						<Merchant links={dashboardLinks[ROLE_MERCHANT]} />
					) : (
						<Customer links={dashboardLinks[ROLE_MEMBER]} />
					)}
				</div>
			</Container>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.account.user,
		isLoading: state.account.isLoading,
	};
};

export default connect(mapStateToProps, actions)(Dashboard);

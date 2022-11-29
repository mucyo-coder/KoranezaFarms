/*
 *
 * Support
 *
 */

import React from "react";
import { connect } from "react-redux";
import { Container } from "reactstrap";

import actions from "../../actions";

import { default as SupportManager } from "../../components/Manager/Support";

class Support extends React.PureComponent {
	render() {
		const { user } = this.props;

		return (
			<Container>
				<div className='support wrapper'>
					<h3>Support</h3>
					<hr />
					<div className='mt-5'>
						<SupportManager user={user} />
					</div>
				</div>
			</Container>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.account.user,
		resetFormData: state.resetPassword.resetFormData,
		formErrors: state.resetPassword.formErrors,
	};
};

export default connect(mapStateToProps, actions)(Support);

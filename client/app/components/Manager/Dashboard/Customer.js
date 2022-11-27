/*
 *
 * Customer
 *
 */

import React from "react";

import { Switch, Route } from "react-router-dom";
import { Row, Col } from "reactstrap";

import Page404 from "../../Common/Page404";

import Account from "../../../containers/Account";
import AccountSecurity from "../../../containers/AccountSecurity";
import Address from "../../../containers/Address";
import Order from "../../../containers/Order";
import Wishlist from "../../../containers/WishList";

const Customer = (props) => {
	return (
		<div className='customer'>
			<Row>
				<Col xs='12' md='7' xl='9'>
					<div className='panel-body'>
						<Switch>
							<Route exact={true} path='/dashboard' component={Account} />
							<Route path='/dashboard/security' component={AccountSecurity} />
							<Route path='/dashboard/address' component={Address} />
							<Route path='/dashboard/orders' component={Order} />
							<Route path='/dashboard/wishlist' component={Wishlist} />
							<Route path='*' component={Page404} />
						</Switch>
					</div>
				</Col>
			</Row>
		</div>
	);
};

export default Customer;

/**
 *
 * AccountMenu
 *
 */

import React from "react";

import { NavLink } from "react-router-dom";
import { Collapse, Navbar } from "reactstrap";

import Button from "../../Common/Button";

const AccountMenu = (props) => {
	const { links, toggleMenu } = props;

	return (
		<div className='panel-sidebar'>
			<Button
				text='Dashboard Menu'
				className="menu-panel collapse"
				ariaExpanded={"false"}
				// ariaLabel={isMenuOpen ? 'dashboard menu expanded' : 'dashboard menu collapse'}
				onClick={toggleMenu}
			/>
			<h3 className='panel-title'>Account</h3>
			<Navbar color='light' light={true} expand='md'>
				<Collapse isOpen={false} navbar={true}>
					<ul className='panel-links'>
						{links.map((link, index) => {
							const PREFIX = link.prefix ? link.prefix : "";
							return (
								<li key={index}>
									<NavLink
										to={PREFIX + link.to}
										activeClassName='active-link'
										exact={true}
									>
										{link.name}
									</NavLink>
								</li>
							);
						})}
					</ul>
				</Collapse>
			</Navbar>
		</div>
	);
};

export default AccountMenu;

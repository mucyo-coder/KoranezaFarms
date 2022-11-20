/**
 *
 * DropdownConfirm
 *
 */

import React from 'react';

import {
  UncontrolledButtonDropdown,
  DropdownMenu,
  DropdownToggle
} from 'reactstrap';

const DropdownConfirm = props => {
  const { className, label, children } = props;

  return (
    <div className={`dropdown-confirm ${className}`}>
      <UncontrolledButtonDropdown>
        <DropdownToggle nav={true}>
          <div className='dropdown-action sm'>
            {label}
            <span className='fa fa-chevron-down dropdown-caret' />
          </div>
        </DropdownToggle>
        <DropdownMenu right={true}>{children}</DropdownMenu>
      </UncontrolledButtonDropdown>
    </div>
  );
};

DropdownConfirm.defaultProps = {
  label: ''
};

export default DropdownConfirm;

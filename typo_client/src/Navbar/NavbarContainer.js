import React from 'react';

class NavbarContainer extends React.Component {
  render() {
    const { children, modifiers } = this.props;

    const modifierClasses = modifiers.length ? modifiers.reduce((result, modifier) => {
      result = `${result} ${NavbarContainer.baseClass}_${modifier}`;
      return result;
    }, '') : '';

    return (
      <div className={`${NavbarContainer.baseClass} ${modifierClasses}`}>
        {children}
      </div>
    );
  }
}

NavbarContainer.baseClass = 'sticky__container';

export default NavbarContainer;
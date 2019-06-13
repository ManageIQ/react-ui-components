import React, { useState } from 'react';
import { Button, Modal, ButtonGroup, Icon, Tabs, Tab } from 'patternfly-react';
import PropTypes from 'prop-types';
import './style.scss';
import IconsList from './icon-list';

const IconPicker = ({ iconTypes }) => {
  const [clicked, changeClicked] = useState(false);
  const [icon, iconChanged] = useState(undefined);
  const [selectedIcon, selectedIconChanged] = useState(undefined);
  const [selectedType, selectedTypeChanged] = useState(undefined);
  const [activeTab, tabChanged] = useState(0);

  return (
    <div className="react-ui-components-icon-picker">
      <ButtonGroup>
        <Button className="icon-btn"><i id="selected-icon" className={`${selectedType} ${selectedIcon}`} title={`.${selectedIcon}`} /></Button>
        <Button onClick={() => changeClicked(open => !open)}><Icon type="fa" name="angle-down" /></Button>
      </ButtonGroup>
      <Modal show={clicked} onHide={() => changeClicked(false)}>
        <Modal.Header>
          <button
            id="close-icon-picker-modal"
            className="close"
            onClick={() => { changeClicked(false); tabChanged(0); }}
            aria-hidden="true"
            aria-label="Close"
          >
            <Icon type="pf" name="close" />
          </button>
          <Modal.Title>Select an icon</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="fonticon-modal">
            <Tabs id="font-icon-tabs" activekey={activeTab} animation={false} onSelect={tab => tabChanged(tab)}>
              {iconTypes.map(({ title, type }, index) => (
                <Tab eventKey={index} key={type} title={title}>
                  <table>
                    <tbody>
                      <IconsList isVisible={index === activeTab} activeIcon={icon} type={type} iconChanged={iconChanged} />
                    </tbody>
                  </table>
                </Tab>
                ))}
            </Tabs>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            id="apply-icon-picker-icon"
            bsStyle="primary"
            onClick={() => {
                              changeClicked(false);
                              selectedIconChanged(icon);
                              selectedTypeChanged(iconTypes[activeTab].type);
                              tabChanged(0);
                            }
            }
            disabled={icon === undefined}
          >
            Apply
          </Button>
          <Button id="cancel-icon-picker-modal" bsStyle="default" className="btn-cancel" onClick={() => { changeClicked(false); tabChanged(0); }} >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

IconPicker.propTypes = {
  iconTypes: PropTypes.arrayOf(PropTypes.shape({ type: PropTypes.string.isRequired, title: PropTypes.string.isRequired })).isRequired,
};

export default IconPicker;

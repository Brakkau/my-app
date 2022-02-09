import { Fragment, h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { fireEvent } from '../../../../core-files/services';

import { disableScroll, enableScroll } from '../disableScroll';

export const Modal = ({ onRequestClose }) => {
  // Use useEffect to add an event listener to the document
  useEffect(() => {
    function onKeyDown(event) {
      if (event.keyCode === 27) {
        // Close the modal when the Escape key is pressed
        onRequestClose();
      }
    }

    disableScroll();
    document.addEventListener('keydown', onKeyDown);

    // Clear things up when unmounting this component
    return () => {
      enableScroll();
      document.removeEventListener('keydown', onKeyDown);
    };
  });

  return (
    <div id="modal-react">
      <div
        onClick={onRequestClose}
        role="button"
        tabIndex="0"
        className="modal__backdrop"
      >
        <div className="modal__container">
          <div className="modal__header">
            <div
              className="close-btn"
              onClick={onRequestClose}
              role="button"
              tabIndex="0"
            >
              &times;
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ModalComponent = (props) => {
  const { } = props;
  const [isModalOpen, setModalIsOpen] = useState(false);

  const toggleModal = () => {
    fireEvent('CTA Clicked');
    setModalIsOpen(!isModalOpen);
  };

  return (
    <Fragment>
      {isModalOpen && <Modal onRequestClose={toggleModal} />}
      {/* Insert Content here */}
    </Fragment>
  );
};

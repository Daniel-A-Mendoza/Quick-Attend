import './popup.css';
export const Popup = (props) => {
    return (
        <div className={`popup ${props.isOpen ? 'open' : ''}`}>
      <div className="popup-content">
        {props.children}
        <button onClick={props.onClose}>Close</button>
      </div>
    </div>
    );

};
const AlertBox = ({ message, onClose }) => {
    return (
      <div className="alert-box">
        {message}
        <button className="close-button" onClick={onClose}>×</button>
      </div>
    );
};

export default AlertBox;
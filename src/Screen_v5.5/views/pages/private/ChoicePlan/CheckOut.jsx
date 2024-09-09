import React from "react";
import Card from "react-credit-cards";
import "react-credit-cards/es/styles.scss";

const CheckOut = () => {
  const [cradit_card_data, setCradit_card_data] = React.useState({
    cvc: "",
    expiry: "",
    focus: "",
    name: "",
    number: "",
  });

  const handleInputFocus = (e) => {
    setCradit_card_data((state) => ({ ...state, focus: e.target?.name }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCradit_card_data((state) => ({ ...state, [name]: value }));
  };

  const handleCallback =
    () =>
    ({ issuer }, isValid) => {
      if (isValid) {
        this.setState({ issuer });
      }
    };

  return (
    <div id="page" className="center">
      <div className="form-wrapper">
        <div className="form-header">
          <h2 className="title">You are almost there.</h2>
          <p className="subtitle">
            Checkout to watch unlimited Movies and TV series.
          </p>
        </div>
        <div className="d-flex flex-column gap-30">
          <Card
            cvc={cradit_card_data.cvc}
            expiry={cradit_card_data.expiry}
            focused={cradit_card_data.focus}
            name={cradit_card_data.name}
            number={cradit_card_data.number}
            callback={handleCallback}
          />
          <form>
            <label>
              <p className="lable-text">Card Number </p>
              <input
                type="tel"
                name="number"
                pattern="[\d| ]{16,22}"
                required
                placeholder="Card Number"
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                maxLength={16}
              />
            </label>
            <label>
              <p className="lable-text">Card Owner Name </p>
              <input
                type="text"
                name="name"
                required
                placeholder="Card Owner Name"
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
            </label>
            <label>
              <p className="lable-text">CVC </p>
              <input
                type="tel"
                name="cvc"
                required
                placeholder="CVC"
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                maxLength={4}
              />
            </label>
            <label>
              <p className="lable-text">Expiry </p>
              <input
                type="tel"
                name="expiry"
                required
                placeholder="Expiry"
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                maxLength={4}
              />
            </label>
            <div className="form-footer">
              <div className="form-btns">
                <button type="submit">Confirm Payment</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;

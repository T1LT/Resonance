import React from 'react'
import qrcode from "../../assets/QR.png";
const QRCode = () => {
  return (
    <div>
      <center>
        <div className="img-container">
          <img src={qrcode} height="200" />
        </div>
        <div className="qr-text">
          <h2>Resonance Github</h2>
          <p className="secondary-text">
            Scan this QR to view the Github Repo.
          </p>
        </div>
      </center>
    </div>
  );
}

export default QRCode
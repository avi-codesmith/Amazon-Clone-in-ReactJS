import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <p>Back to top</p>
      </div>

      <div className="footer-main">
        <div className="footer-column">
          <h3>Get to Know Us</h3>
          <p>About Us</p>
          <p>Careers</p>
          <p>Press Releases</p>
          <p>Amazon Science</p>
        </div>

        <div className="footer-column">
          <h3>Connect with Us</h3>
          <p>Facebook</p>
          <p>Twitter</p>
          <p>Instagram</p>
        </div>

        <div className="footer-column">
          <h3>Make Money with Us</h3>
          <p>Sell on Amazon</p>
          <p>Affiliate</p>
          <p>Advertise Products</p>
          <p>Amazon Pay</p>
        </div>

        <div className="footer-column">
          <h3>Let Us Help You</h3>
          <p>Your Account</p>
          <p>Returns Centre</p>
          <p>100% Purchase Protection</p>
          <p>Help</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 YourStore.com</p>
      </div>
    </footer>
  );
}

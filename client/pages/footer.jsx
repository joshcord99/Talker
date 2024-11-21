import "../css/footer.css";

function Footer() {
  return (
    <div className="footer">
      <p>Links to Creator</p>
      <ul className="list">
        <li>
          <a href="mailto:joshcord99@gmail.com" target="_blank" rel="noopener noreferrer">
            Email
          </a>
        </li>
        <li>
          <a href="https://github.com/joshcord99" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </li>
      </ul>
      <p>Created by Joshua Cordial</p>
    </div>
  );
}

export default Footer;

import React from "react";

const date = new Date();
const current_year = date.getFullYear();

function Footer() {
  return (
    <footer>
      <p>Copyright © {current_year}</p>
    </footer>
  );
}

export default Footer;

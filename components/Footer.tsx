
function Footer() {
  return (<div className="flex justify-between px-10 py-5 border-black">
    <p>&copy; Harry Russin</p>
    <p>{new Date().getFullYear()}</p>
  </div>);
}

export default Footer;

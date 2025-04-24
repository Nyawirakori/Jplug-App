import NavBar from "./NavBar";
import { FaInstagram, FaTiktok, FaXTwitter } from 'react-icons/fa6';
import { BsEnvelopeFill, BsTelephoneFill } from 'react-icons/bs';

export default function ContactUs() {
  function handleSubmit(event) {
    event.preventDefault();
    alert("Thank you for sending us a message!");
  
  }

  return (
    <>
      <NavBar />
      <div className="container mt-5 bg-light">
        <h1 className="text-center mb-4">Get In Touch With Us</h1>
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" placeholder="Your Name" required />
              </div>
              <div className="mb-3">
                <label htmlFor="emailaddress" className="form-label">Email Address</label>
                <input type="email" className="form-control" id="emailaddress" placeholder="Your Email" required />
              </div>
              <div className="mb-3">
                <label htmlFor="subject" className="form-label">Subject</label>
                <input type="text" className="form-control" id="subject" placeholder="Subject" />
              </div>
              <div className="mb-3">
                <label htmlFor="writemessage" className="form-label">Write Message</label>
                <textarea className="form-control" id="writemessage" rows="5" placeholder="Your Message" required></textarea>
              </div>
              <div className="d-grid">
                <button type="submit" className="btn btn-primary">Send Message</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <footer className="bg-dark text-light py-4 mt-5">
        <div className="container d-flex justify-content-between align-items-center">
          <div>
            <p className="mb-0">JPLUG Application</p>
            <p className="mb-0"><BsEnvelopeFill className="me-2" />jplugapp@gmail.com</p>
            <p className="mb-0"><BsTelephoneFill className="me-2" /> +254 725 360 407</p>
          </div>
          <div>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-light me-3 fs-4"><FaInstagram /></a>
            <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer" className="text-light me-3 fs-4"><FaTiktok /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-light fs-4"><FaXTwitter /></a>
          </div>
        </div>
      </footer>
    </>
  );
}
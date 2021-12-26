import { Link } from 'react-router-dom';
import './Page404.css'
//reference: https://freefrontend.com/html-css-404-page-templates/

function Page404() {
  return (
    <div className='neon-style'>
      <div className="noise"></div>
      <div className="overlay"></div>
      <div className="terminal">
        <h1>Error <span class="errorcode">404</span></h1>
        <p className="output">The page you are looking for doesn't exist, has been removed or is temporarily unavailable.</p>
        <p className="output">Please try return to the <Link to="/">[ homepage ]</Link>.</p>
        <p className="output">Good luck.</p>
      </div>
    </div>
  )
}

export default Page404

import { Link } from 'react-router-dom';
import { usePage } from '../PageContext';
import { useEffect } from 'react';
function NotFoundPage() {

  const { setPage } = usePage();

  useEffect(()=>{
    setPage('Page not found');
  }, []);

    return <>
      <div style={{textAlign: "center", paddingTop: "5rem", position:"initial" }}>
        <h1>
          <i className="bi bi-exclamation-circle-fill"/>
          {" "}
          The page cannot be found
          {" "}
          <i className="bi bi-exclamation-circle-fill"/>
        </h1>
        <br/>
        <p>
          The requested page does not exist, please head back to the <Link to={"/Home"}>app</Link>.
        </p>
      </div>
    </>;
  }

  export default NotFoundPage;
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>404 - Not Found!</h1>
            <p>Sorry, the page you are looking for does not exist.</p>
            <p>
                You can always go back to the
                <Link to="/login" style={{ textDecoration: 'none', color: 'blue', marginLeft: '5px' }}>
                    login page.
                </Link>
            </p>
        </div>
    );
};

export default NotFoundPage;

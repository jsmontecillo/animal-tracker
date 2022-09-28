import { Link } from "react-router-dom";

const IndividualsForm = () => {
    return (
      <div>
        <h3>Have you spotted an individual recently?</h3>
        <small>Main Page</small>
        <Link to="/users">Show List of Users</Link>
      </div>
    );
};

export default IndividualsForm;

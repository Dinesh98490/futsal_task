import {useNavigate} from "react-router-dom";

function Home() {

    const navigate = useNavigate();

    return (
        <>
            <h1>This is Home page</h1>
            <button onClick={() => navigate("/user")}>click here to display user list.</button>


        </>
    )
}

export default Home;
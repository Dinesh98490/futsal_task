import {Outlet} from "react-router-dom";

function Admin() {

    return (<>

        <div id="admin-section">
            <div>topbar</div>

            <main>
                <aside>sidebar</aside>

                <div>
                <Outlet/>
                </div>
            </main>
        </div>

    </>)
}


export default Admin;
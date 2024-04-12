import { Link } from "react-router-dom"

export const Users = () => {
  return (
    <div>
        <Link to={"/add"}>Add User</Link>
        <table>
            <thead>
                <tr>
                    <th></th>
                </tr>
            </thead>
        </table>
    </div>
  )
}

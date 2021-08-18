import Card from "../UI/Card";
import classes from "./List.module.css"
const List = (props) => {

    return (
        <Card className={classes.users}>
            <ul>
                {props.users.map(user => user && <li key={user.id}>{user.username} {user.age} Year Old.</li>)}
            </ul>

        </Card>
    );

}
export default List;
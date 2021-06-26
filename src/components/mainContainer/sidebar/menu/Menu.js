// redux:
import { connect } from "react-redux";
// ciew:
import Menu from "./Menu.view";

const mapStateToProps = (state) => {
    return {
        currentMenuItem: state.menu.currentMenuItem,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        chooseMenuItem: (itemName) =>
            dispatch({
                type: "menu/choose",
                payload: itemName,
            }),
    };
};

const Container = connect(mapStateToProps, mapDispatchToProps)(Menu);

export default Container;

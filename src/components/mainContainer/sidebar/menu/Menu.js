// redux:
import { connect } from "react-redux";
import { Actions } from "../../../../actionCreators";

// ciew:
import Menu from "./Menu.view";

const mapStateToProps = (state) => {
    return {
        currentMenuItem: state.menu.currentMenuItem,
        menuItems: state.menu.menuItems,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        chooseMenuItem: (itemName) => dispatch(Actions.chooseMenuItem(itemName)),
    };
};

const Container = connect(mapStateToProps, mapDispatchToProps)(Menu);

export default Container;

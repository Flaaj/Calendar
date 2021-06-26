// redux:
import { connect } from "react-redux";
// view:
import Sidebar from "./Sidebar.view"


const mapStateToProps = (state) => {
    return {
        currentMenuItem: state.menu.currentMenuItem,
    };
};

const Container = connect(mapStateToProps)(Sidebar);

export default Container;

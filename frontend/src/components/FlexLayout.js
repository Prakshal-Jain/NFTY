import "./css/flexlayout.css"

const FlexLayout = (props) => (
    <div className={`root ${props.direction === "vertical" ? "column" : "row"} align-${props.align ?? "inherit"}`} style={props.style}>
        {props.children}
    </div>
)

export default FlexLayout;
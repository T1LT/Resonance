import { Tooltip, tooltipClasses } from "@mui/material";
import { styled } from "@mui/system";

const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip
    {...props}
    arrow
    TransitionProps={{ timeout: 120 }}
    classes={{ popper: className }}
  />
))(() => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: "#202225",
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#202225",
    padding: "7px 12px",
    fontSize: "14px",
    fontFamily: "gg-sans-med",
    fontWeight: "bold",
  },
}));

export default BootstrapTooltip;

import { AiOutlineMoon, AiOutlineSun } from "react-icons/ai";
import Button from "@mui/joy/Button";
const ToggleButton = ({ handleChange, isChecked }) => {
  return (
    <Button
      id="Dark-LightBTN"
      className="toggle"
      onClick={handleChange}
      checked={isChecked}
    >
      {isChecked ? <AiOutlineSun /> : <AiOutlineMoon />}
    </Button>
  );
};
export default ToggleButton;
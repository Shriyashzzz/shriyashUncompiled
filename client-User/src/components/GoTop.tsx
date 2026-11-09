import { IconButtonProps, Tooltip } from "@radix-ui/themes";
import { IconButton } from "@radix-ui/themes";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { ArrowUpIcon } from "@radix-ui/react-icons";

export function GoTop({
  className,
  color,
  size,
  style,
}: {
  className: string;
  color?: IconButtonProps["color"];
  size?: "1" | "2" | "3" | "4";
  style?: object;
}) {
  const theme = useSelector((s: RootState) => s.theme.value);

  const scrollUp = (): void => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className={className}>
      <Tooltip content="scroll to the top">
        <IconButton
          onClick={scrollUp}
          radius="full"
          color={color || (theme == "light" ? "blue" : "green")}
          size={size || "3"}
          style={
            style || {
              cursor: "pointer",
              border: `1px solid ${theme == "light" ? "green" : "yellow"}`,
            }
          }
        >
          <ArrowUpIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
}

import React from "react";
import { ColorResult, SketchPicker, TwitterPicker } from "react-color";
import { Box, Grid, Button, IconButton } from "@mui/material";
import plusSVG from "./assets/plus.svg";
import CopyButton from "./Components/CopyButton";
import { background } from "./styles";
import { ButtonStyle, getDefaultButtonStyle } from "./types";

function App() {
  const [buttons, setButtons] = React.useState<ButtonStyle[]>([
    getDefaultButtonStyle(),
  ]);
  const [focusId, setFocusId] = React.useState<number>(0);
  const [bgDisplay, setBgDisplay] = React.useState<boolean>(false);
  const [bgColor, setBgColor] = React.useState<string>("#FFFFFF");

  const decimalToHex = (alpha: number) =>
    alpha === 0 ? "00" : Math.round(255 * alpha).toString(16);

  const handleChangeColor = (
    newColor: ColorResult,
    id: number,
    key: keyof ButtonStyle
  ) => {
    const colorHex = `${newColor.hex}${decimalToHex(newColor.rgb.a || 0)}`;
    const newButtons = [...buttons];
    if (key !== "bold" && key !== "oblique") {
      newButtons[id][key] = colorHex;
      setButtons(newButtons);
    }
  };

  const getButtonStyle = (id: number) => {
    return {
      borderRadius: 2,
      m: 1,
      color: buttons[id].color,
      backgroundColor: buttons[id].bgColor,
      height: "3em",
      border: `1px solid ${buttons[id].borderColor}`,
      "&:hover": {
        backgroundColor: buttons[id].hoverColor,
      },
      "&:active": {
        backgroundColor: buttons[id].activeColor,
      },
    };
  };

  const handleClick = () => {
    setBgDisplay(true);
  };

  const handleClose = () => {
    setBgDisplay(false);
  };

  return (
    <div style={background}>
      <h1>Hello Colors</h1>
      <Button
        sx={{ color: "blue", backgroundColor: "lightBlue" }}
        onClick={handleClick}
      >
        全体背景色
      </Button>
      {bgDisplay ? (
        <div style={{ position: "absolute", zIndex: "2" }}>
          <div
            style={{
              position: "fixed",
              top: "0px",
              right: "0px",
              bottom: "0px",
              left: "0px",
            }}
            onClick={handleClose}
          />
          <TwitterPicker
            color={bgColor}
            onChange={(color: ColorResult) => {
              setBgColor(`${color.hex}${decimalToHex(color.rgb.a || 0)}`);
            }}
          />
        </div>
      ) : null}
      <Button sx={{ color: "blue", backgroundColor: "lightBlue" }}>
        選択中を複製
      </Button>
      <Button sx={{ color: "blue", backgroundColor: "lightBlue" }}>
        コード表示
      </Button>
      <Grid container>
        <div
          style={{
            margin: 10,
            color: buttons[focusId].color,
            textShadow: "1px 1px 1px #808080",
          }}
        >
          文字色{buttons[focusId].color}
          <CopyButton text={buttons[focusId].color} />
          <SketchPicker
            color={buttons[focusId].color}
            onChange={(color: ColorResult) => {
              handleChangeColor(color, focusId, "color");
            }}
          />
        </div>
        <div
          style={{
            margin: 10,
            color: buttons[focusId].bgColor,
            textShadow: "1px 1px 1px #808080",
          }}
        >
          背景{buttons[focusId].bgColor}
          <SketchPicker
            color={buttons[focusId].bgColor}
            onChange={(color: ColorResult) => {
              handleChangeColor(color, focusId, "bgColor");
            }}
          />
        </div>
        <div
          style={{
            margin: 10,
            color: buttons[focusId].hoverColor,
            textShadow: "1px 1px 1px #808080",
          }}
        >
          ホバー時{buttons[focusId].hoverColor}
          <SketchPicker
            color={buttons[focusId].hoverColor}
            onChange={(color: ColorResult) => {
              handleChangeColor(color, focusId, "hoverColor");
            }}
          />
        </div>
        <div
          style={{
            margin: 10,
            color: buttons[focusId].activeColor,
            textShadow: "1px 1px 1px #808080",
          }}
        >
          クリック時{buttons[focusId].activeColor}
          <SketchPicker
            color={buttons[focusId].activeColor}
            onChange={(color: ColorResult) => {
              handleChangeColor(color, focusId, "activeColor");
            }}
          />
        </div>
        <div
          style={{
            margin: 10,
            color: buttons[focusId].borderColor,
            textShadow: "1px 1px 1px #808080",
          }}
        >
          ボーダー{buttons[focusId].borderColor}
          <SketchPicker
            color={buttons[focusId].borderColor}
            onChange={(color: ColorResult) => {
              handleChangeColor(color, focusId, "borderColor");
            }}
          />
        </div>
      </Grid>
      <Grid
        container
        sx={{
          backgroundColor: bgColor,
          borderRadius: 8,
          p: "1em",
          alignItems: "center",
        }}
      >
        <Button variant="contained" sx={getButtonStyle(0)}>
          ボタン
        </Button>
        <IconButton onClick={() => {}}>
          <img src={plusSVG} />
        </IconButton>
      </Grid>
    </div>
  );
}

export default App;
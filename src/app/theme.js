import {
  cyan700,
  grey600,
  blueA200, blueA400, blueA700,
  fullWhite,
  orange600
} from 'material-ui/styles/colors';
import {fade} from 'material-ui/utils/colorManipulator';
import spacing from 'material-ui/styles/spacing';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

export const Theme = getMuiTheme({
  palette: {
    primary1Color: orange600,
    primary2Color: orange600,
    primary3Color: grey600,
    accent1Color: blueA700,
    accent2Color: blueA400,
    accent3Color: blueA200,
    textColor: fullWhite,
    secondaryTextColor: fade(fullWhite, 0.7),
    alternateTextColor: '#303030',
    canvasColor: '#303030',
    borderColor: fade(fullWhite, 0.3),
    disabledColor: fade(fullWhite, 0.3),
    pickerHeaderColor: fade(fullWhite, 0.12),
    clockCircleColor: fade(fullWhite, 0.12),
  }
});

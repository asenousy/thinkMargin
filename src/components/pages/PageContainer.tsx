import React, { FC, PureComponent } from "react";
import { Keyboard } from "react-native";
import { NavigationTabProp } from "react-navigation-tabs";
import { reducer, StoreState, Figure, Segment } from "../../reducer";
import {
  calculate,
  reset,
  crop,
  format,
  updateFigure,
  updateSegment,
  resetAll,
  Action
} from "../../actions";

export type Props = StoreState & {
  updateSegment(Segment);
  updateFigure(Figure);
  onEndEditing(key: string);
  onFocus(string);
  onReset();
  onBackgroundClick();
};

export default (Page: FC<Props>, PageName: string) =>
  class PageContainer extends PureComponent<NavigationTabProp, StoreState> {
    keyboardListener;
    didFocusSub;
    didBlurSub;
    state = {
      priceSegment: 0,
      marginSegment: 0,
      figures: {
        vat: "",
        cost: "",
        margin: "",
        profit: "",
        priceIncVAT: "",
        priceExcVAT: ""
      }
    };

    constructor(props) {
      super(props);
      this.didFocusSub = props.navigation.addListener("didFocus", () => {
        this.keyboardListener = Keyboard.addListener("keyboardDidHide", () =>
          this.dispatch(calculate(PageName))
        );
      });
      this.didBlurSub = props.navigation.addListener("didBlur", () =>
        this.keyboardListener.remove()
      );
    }

    dispatch = (action: Action) =>
      this.setState(prevState => reducer(prevState, action));

    onFocus = (name: string) => {
      const { figures } = this.state;
      if (figures[name] == 0 || Number.isNaN(+figures[name])) {
        return void this.dispatch(reset(name));
      }
      if (figures[name].endsWith(".00")) this.dispatch(crop(name));
    };

    updateFigure = (figure: Figure) => this.dispatch(updateFigure(figure));
    onEndEditing = (name: string) => this.dispatch(format(name));
    updateSegment = (segment: Segment) => this.dispatch(updateSegment(segment));
    onReset = () => this.dispatch(resetAll());

    render() {
      return (
        <Page
          onFocus={this.onFocus}
          onEndEditing={this.onEndEditing}
          updateFigure={this.updateFigure}
          updateSegment={this.updateSegment}
          onReset={this.onReset}
          onBackgroundClick={Keyboard.dismiss}
          {...this.state}
        />
      );
    }

    componentWillUnmount() {
      this.keyboardListener && this.keyboardListener.remove();
      this.didFocusSub.remove();
      this.didBlurSub.remove();
    }
  };

import React, { FC, PureComponent } from "react";
import { Keyboard } from "react-native";
import { NavigationTabProp } from "react-navigation-tabs";
import { reducer, StoreState, Figure, Segment } from "../../reducer";
import {
  calculate,
  crop,
  format,
  updateFigure,
  updateSegment,
  resetAll,
  toggleFeedback,
  Action,
} from "../../actions";

export type PageType = "PRICE" | "MARGIN" | "COST";

export type Props = StoreState & {
  updateSegment(Segment);
  updateFigure(Figure);
  onEndEditing(key: string);
  onFocus(string);
  onReset();
  onSubmit();
  onFeedback();
};

export default (Page: FC<Props>, Type: PageType) =>
  class PageContainer extends PureComponent<NavigationTabProp, StoreState> {
    keyboardListener;
    state = {
      priceSegment: 0,
      marginSegment: 0,
      showFeedback: false,
      figures: {
        vat: "",
        cost: "",
        margin: "",
        profit: "",
        priceIncVAT: "",
        priceExcVAT: "",
      },
    };

    dispatch = (action: Action) =>
      this.setState((prevState) => reducer(prevState, action));

    onFocus = (name: string) => this.dispatch(crop(name));

    updateFigure = (figure: Figure) => this.dispatch(updateFigure(figure));
    onEndEditing = (name: string) => this.dispatch(format(name));
    updateSegment = (segment: Segment) => this.dispatch(updateSegment(segment));
    onReset = () => this.dispatch(resetAll());
    onFeedback = () => this.dispatch(toggleFeedback());

    render() {
      return (
        <Page
          onFocus={this.onFocus}
          onEndEditing={this.onEndEditing}
          updateFigure={this.updateFigure}
          updateSegment={this.updateSegment}
          onReset={this.onReset}
          onFeedback={this.onFeedback}
          onSubmit={() => {
            Keyboard.dismiss();
            this.dispatch(calculate(Type));
          }}
          {...this.state}
        />
      );
    }
  };

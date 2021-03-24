import React, { FC, memo } from "react";
import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import LabeledInput from "../LabeledInput";
import LabeledOutput from "../LabeledOutput";
import SegmentedInput from "../SegmentedInput";
import Footer from "../Footer";
import PageContainer, { Props } from "./PageContainer";
import Title from "../Title";
import Feedback from "../Feedback";

const PricePage: FC<Props> = ({
  figures,
  marginSegment,
  updateSegment,
  updateFigure,
  onEndEditing,
  onFocus,
  onReset,
  showFeedback,
  onFeedback,
  onSubmit,
}) => (
  <TouchableWithoutFeedback onPress={onSubmit}>
    <View style={styles.container}>
      <View style={styles.header}>
        <Title>Calculate Price</Title>
      </View>
      <View style={styles.main}>
        <View>
          <LabeledInput
            name="vat"
            label="VAT % :"
            value={figures.vat}
            onChange={updateFigure}
            onEndEditing={onEndEditing}
            onFocus={onFocus}
            onSubmit={onSubmit}
          />
          <LabeledInput
            name="cost"
            label="Cost :"
            value={figures.cost}
            onChange={updateFigure}
            onEndEditing={onEndEditing}
            onFocus={onFocus}
            onSubmit={onSubmit}
          />
          <SegmentedInput
            name="marginSegment"
            segments={[
              {
                name: "margin",
                label: "Margin %",
                value: figures.margin,
              },
              {
                name: "profit",
                label: "Profit",
                value: figures.profit,
              },
            ]}
            selected={marginSegment}
            onSelection={updateSegment}
            onValueChange={updateFigure}
            onEndEditing={onEndEditing}
            onFocus={onFocus}
            onSubmit={onSubmit}
          />
        </View>
        <View style={styles.output}>
          <LabeledOutput
            label="Price (excl. VAT) :"
            value={figures.priceExcVAT}
          />
          <LabeledOutput
            label="Price (incl. VAT) :"
            value={figures.priceIncVAT}
          />
        </View>
      </View>
      <Footer onReset={onReset} onFeedback={onFeedback} />
      {showFeedback && <Feedback onBackgroundPress={onFeedback} />}
    </View>
  </TouchableWithoutFeedback>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    flex: 4,
    alignItems: "center",
  },
  output: {
    paddingVertical: 20,
  },
  header: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default PageContainer(memo(PricePage), "PRICE");

import React, { FC, memo } from "react";
import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import LabeledInput from "../LabeledInput";
import LabeledOutput from "../LabeledOutput";
import SegmentedInput from "../SegmentedInput";
import Footer from "../Footer";
import PageContainer, { Props } from "./PageContainer";
import Title from "../Title";
import Feedback from "../Feedback";

const CostPage: FC<Props> = ({
  figures,
  priceSegment,
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
      <View style={styles.main}>
        <View style={styles.header}>
          <Title>Calculate Cost</Title>
        </View>
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
          <SegmentedInput
            name="priceSegment"
            segments={[
              {
                name: "priceExcVAT",
                label: "Price (excl. VAT)",
                value: figures.priceExcVAT,
              },
              {
                name: "priceIncVAT",
                label: "Price (incl. VAT)",
                value: figures.priceIncVAT,
              },
            ]}
            selected={priceSegment}
            onSelection={updateSegment}
            onValueChange={updateFigure}
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
          <LabeledOutput label="max. Cost :" value={figures.cost} />
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
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  output: {
    paddingVertical: 20,
  },
  header: {
    marginVertical: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default PageContainer(memo(CostPage), "COST");

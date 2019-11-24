import React, { FC, memo } from "react";
import { StyleSheet, View, Text, TouchableWithoutFeedback } from "react-native";
import LabeledInput from "../LabeledInput";
import LabeledOutput from "../LabeledOutput";
import SegmentedInput from "../SegmentedInput";
import Footer from "../Footer";
import PageContainer, { Props } from "./PageContainer";

const CostPage: FC<Props> = ({
  figures,
  priceSegment,
  marginSegment,
  updateSegment,
  updateFigure,
  onEndEditing,
  onFocus,
  onReset,
  onBackgroundClick
}) => (
  <TouchableWithoutFeedback onPress={onBackgroundClick}>
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.description}>Calculate Cost</Text>
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
          />
          <SegmentedInput
            name="priceSegment"
            segments={[
              {
                name: "priceExcVAT",
                label: "Price (excl. VAT)",
                value: figures.priceExcVAT
              },
              {
                name: "priceIncVAT",
                label: "Price (incl. VAT)",
                value: figures.priceIncVAT
              }
            ]}
            selected={priceSegment}
            onSelection={updateSegment}
            onValueChange={updateFigure}
            onEndEditing={onEndEditing}
            onFocus={onFocus}
          />
          <SegmentedInput
            name="marginSegment"
            segments={[
              {
                name: "margin",
                label: "Margin %",
                value: figures.margin
              },
              {
                name: "profit",
                label: "Profit",
                value: figures.profit
              }
            ]}
            selected={marginSegment}
            onSelection={updateSegment}
            onValueChange={updateFigure}
            onEndEditing={onEndEditing}
            onFocus={onFocus}
          />
        </View>
        <View style={styles.output}>
          <LabeledOutput label="max. Cost :" value={figures.cost} />
        </View>
      </View>
      <Footer onReset={onReset} />
    </View>
  </TouchableWithoutFeedback>
);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  main: {
    flex: 4,
    alignItems: "center"
  },
  output: {
    paddingVertical: 20
  },
  header: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  description: {
    fontSize: 20,
    paddingHorizontal: 40,
    textAlign: "center",
    fontWeight: "bold",
    color: "dodgerblue"
  }
});

export default PageContainer(memo(CostPage), "COST");

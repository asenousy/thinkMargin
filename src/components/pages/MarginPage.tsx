import React, { FC } from "react";
import { StyleSheet, View, Text, TouchableWithoutFeedback } from "react-native";
import LabeledInput from "../LabeledInput";
import LabeledOutput from "../LabeledOutput";
import SegmentedInput from "../SegmentedInput";
import Footer from "../Footer";
import { StoreState } from "../../reducer";
import PageContainer from "./PageContainer";

type Props = StoreState & {
  updateSegment();
  onChange();
  onEndEditing(key: string);
  onFocus();
  onReset();
  update();
  onBackgroundClick();
};

const MarginPage: FC<Props> = ({
  figures,
  priceSegment,
  updateSegment,
  onChange,
  onEndEditing,
  onFocus,
  onReset,
  onBackgroundClick
}) => (
  <TouchableWithoutFeedback onPress={onBackgroundClick}>
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.description}>Calculate Margin & Profit</Text>
      </View>
      <View style={styles.main}>
        <View>
          <LabeledInput
            name="vat"
            label="VAT % :"
            value={figures.vat}
            onChange={onChange}
            onEndEditing={onEndEditing}
            onFocus={onFocus}
          />
          <LabeledInput
            name="cost"
            label="Cost :"
            value={figures.cost}
            onChange={onChange}
            onEndEditing={onEndEditing}
            onFocus={onFocus}
          />
          <SegmentedInput
            ukey="margin"
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
            onValueChange={onChange}
            onEndEditing={onEndEditing}
            onFocus={onFocus}
          />
        </View>
        <View style={styles.output}>
          <LabeledOutput label="Profit :" value={figures.profit} />
          <LabeledOutput label="Margin % :" value={figures.margin} />
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

export default PageContainer(MarginPage);

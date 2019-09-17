import React, { useState, FC } from "react";
import { StyleSheet, View } from "react-native";
import LabeledInput from "./LabeledInput";
import LabeledOutput from "./LabeledOutput";
import SegmentedInput from "./SegmentedInput";

const Cost: FC = () => {
  const [selectedSegment, setSelectedSegment] = useState(0);
  const [figures, setFigures] = useState({
    vat: 0,
    cost: 0,
    margin: 0,
    profit: 0,
    priceIncVAT: 0,
    priceExcVAT: 0
  });

  return (
    <View style={styles.container}>
      <View>
        <LabeledInput
          label="VAT:"
          value={figures.vat.toString()}
          onChange={text => setFigures({ ...figures, vat: +text })}
        />
        <SegmentedInput
          segments={[
            {
              label: "price (exc. VAT)",
              value: figures.priceExcVAT.toString()
            },
            { label: "price (inc. VAT)", value: figures.priceIncVAT.toString() }
          ]}
          selected={selectedSegment}
          onSelection={i => setSelectedSegment(i)}
          onValueChange={({ label, value }) =>
            setFigures({ ...figures, [label]: value })
          }
        />
        <SegmentedInput
          segments={[
            { label: "margin %", value: figures.margin.toString() },
            { label: "profit", value: figures.profit.toString() }
          ]}
          selected={selectedSegment}
          onSelection={i => setSelectedSegment(i)}
          onValueChange={({ label, value }) =>
            setFigures({ ...figures, [label]: value })
          }
        />
      </View>
      <View style={styles.output}>
        <LabeledOutput label="Cost" value={figures.cost.toString()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  output: {
    paddingVertical: 10
  }
});

export default Cost;

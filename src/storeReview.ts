import { AsyncStorage, Alert } from "react-native";
import * as StoreReview from "expo-store-review";

const YEAR = 6 * 30 * 24 * 60 * 60 * 1000;
const MONTH = 30 * 24 * 60 * 60 * 1000;
const LAST_REVIEW_DATE = "lastReviewDate";

async function storeDate(overrideDate?: number) {
  const date = overrideDate || Date.now();
  try {
    await AsyncStorage.setItem(LAST_REVIEW_DATE, date.toString());
  } catch (error) {
    if (__DEV__) throw error;
  }
}

async function retrieveDate() {
  try {
    const value = await AsyncStorage.getItem(LAST_REVIEW_DATE);
    return +value;
  } catch (error) {
    if (__DEV__) throw error;
  }
}

const myReview = () =>
  Alert.alert(
    "Review the App",
    "Enjoying the app ? please support me with a nice review",
    [
      {
        text: "review",
        onPress: StoreReview.requestReview
      },
      { text: "cancel" }
    ]
  );

async function review() {
  try {
    const lastReviewDate = await retrieveDate();
    if (lastReviewDate) {
      if (Date.now() - lastReviewDate > YEAR) {
        StoreReview.isSupported() ? StoreReview.requestReview() : myReview();
        await storeDate();
      }
    } else {
      await storeDate(Date.now() - (YEAR - MONTH));
    }
  } catch (error) {
    if (__DEV__) throw error;
  }
}

export default review;

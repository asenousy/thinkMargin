import * as StoreReview from "expo-store-review";
import AsyncStorage from "@react-native-async-storage/async-storage";

const YEAR = 12 * 30 * 24 * 60 * 60 * 1000;
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

async function review() {
  try {
    const lastReviewDate = await retrieveDate();
    if (lastReviewDate) {
      if (Date.now() - lastReviewDate > YEAR) {
        (await StoreReview.isAvailableAsync()) && StoreReview.requestReview();
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

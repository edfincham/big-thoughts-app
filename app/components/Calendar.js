import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { CalendarList } from 'react-native-calendars';

// Config
import colours from '../config/colours';
import defaultStyles from '../config/styles';

const RANGE = 24;

function Calendar({
  entryDates, onDateChange, selected, today,
}) {
  const marked = useMemo(() => {
    const markedDates = entryDates.reduce(
      (obj, item) => (
        { ...obj, [item]: { marked: true } }
      ),
      {},
    );
    return {
      ...markedDates,
      [selected]: {
        disableTouchEvent: true,
        marked: !!(entryDates && entryDates[selected]),
        selected: true,
      },
    };
  }, [selected, entryDates]);

  return (
    <View style={styles.container}>
      <CalendarList
        current={today}
        futureScrollRange={RANGE}
        horizontal
        markedDates={marked}
        onDayPress={onDateChange}
        pagingEnabled
        pastScrollRange={RANGE}
        staticHeader
        theme={theme}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colours.darkGrey,
    flex: 1,
    marginBottom: -100,
  },
});

const theme = {
  // Arrows
  arrowColor: colours.white,
  arrowStyle: { padding: 0 },
  // Background
  calendarBackground: colours.darkGrey,
  // Month
  monthTextColor: colours.white,
  textMonthFontSize: defaultStyles.fontSizeLarge,
  textMonthFontFamily: defaultStyles.fontFamily,
  textMonthFontWeight: defaultStyles.fontWeight,
  // Day
  textSectionTitleColor: colours.white,
  textDayHeaderFontSize: defaultStyles.fontSizeMedium,
  textDayHeaderFontFamily: defaultStyles.fontFamily,
  textDayHeaderFontWeight: 'normal',
  // Dates
  dayTextColor: colours.lightBlue,
  textDayFontSize: defaultStyles.fontSizeLarge,
  textDayFontFamily: defaultStyles.fontFamily,
  textDayFontWeight: '500',
  textDayStyle: 4,
  // Selected date
  selectedDayBackgroundColor: colours.lightGreen,
  selectedDayTextColor: colours.lightBlueGrey,
  selectedDotColor: colours.lightBlueGrey,
  // Today
  todayTextColor: colours.brown,
  todayDotColor: colours.brown,
  todayBackgroundColor: colours.lightRed,
  // Dot
  dotColor: colours.lightRed,
  dotStyle: { marginTop: 0.5 },
};

export default React.memo(Calendar);

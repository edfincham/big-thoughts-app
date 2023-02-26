import * as React from 'react';
import { useMemo } from 'react';
import {
  StyleSheet, Text, TouchableHighlight, View,
} from 'react-native';
import moment from 'moment';

// Config
import colours from '../config/colours';
import defaultStyles from '../config/styles';

function Entry({
  item, index, separators, onPress,
}) {
  const entryHour = moment(item.createdOn).format('HH:MM');

  const truncateBody = useMemo(() => {
    const body = item.entryText.replaceAll('\n', ' ');
    if (body.length < 50) {
      return body;
    }
    return `${body.slice(0, 50).split(' ').filter((x) => x !== '').slice(0, -1)
      .join(' ')}...`;
  }, [item]);

  return (
    <TouchableHighlight
      key={index}
      onPress={() => onPress(item)}
      onShowUnderlay={separators.highlight}
      onHideUnderlay={separators.unhighlight}
      underlayColor={colours.darkGrey}
    >
      <View style={styles.entryContainer}>
        <Text style={styles.entryText}>{truncateBody}</Text>
        <Text style={styles.entryText}>{entryHour}</Text>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  entryContainer: {
    backgroundColor: colours.mediumBlue,
    borderLeftColor: colours.mediumGreen,
    borderLeftWidth: 10,
    borderRadius: 2,
    borderTopLeftRadius: 5,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    padding: 10,
  },
  entryText: {
    color: colours.white,
    fontFamily: defaultStyles.fontFamily,
    fontSize: defaultStyles.fontSizeMedium,
    fontWeight: 'normal',
  },
});

export default React.memo(Entry);

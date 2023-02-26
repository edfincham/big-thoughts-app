import * as React from 'react';
import { useMemo } from 'react';
import {
  ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import moment from 'moment';

// Config
import colours from '../config/colours';
import defaultStyles from '../config/styles';

// Components
import Entry from './Entry';

function EmptyView({ isToday }) {
  if (!isToday) {
    return (
      <View style={styles.emptyDate}>
        <Text style={styles.emptyDateText}>No entries here</Text>
      </View>
    );
  }
}

function LoadingView() {
  return (
    <View style={styles.emptyDate}>
      <ActivityIndicator size="large" color={colours.lightBlue} />
    </View>
  );
}

function HeaderView({ dateHeader }) {
  return (
    <View style={styles.entryListHeader}>
      <Text style={styles.entryListText}>{ dateHeader }</Text>
    </View>
  );
}

function FooterView({ isToday, onEntryPress }) {
  if (isToday) {
    return (
      <TouchableOpacity
        onPress={() => onEntryPress({})}
        underlayColor={colours.darkGrey}
      >
        <View style={styles.emptyDate}>
          <AntDesign name="plus" size={50} color={colours.lightBlue} />
          <Text style={styles.emptyDateText}>Add Entry</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

function SeparatorView() {
  return (
    <View style={styles.separator} />
  );
}

function RenderView({
  item, index, onEntryPress, separators,
}) {
  return (
    <Entry
      item={item}
      index={index}
      onPress={onEntryPress}
      separators={separators}
    />
  );
}

function EntryList({
  entries, onEntryPress, ready, selected,
}) {
  const dateHeader = useMemo(() => moment(selected).format('dddd, D MMMM YYYY'), [selected]);
  const isToday = useMemo(() => selected === moment().format('YYYY-MM-DD'), [selected]);

  return (
    <View style={styles.container}>
      { ready
        && (
        <FlatList
          ListEmptyComponent={<EmptyView isToday={isToday} />}
          ListHeaderComponent={<HeaderView dateHeader={dateHeader} />}
          ListFooterComponent={<FooterView isToday={isToday} onEntryPress={onEntryPress} />}
          ItemSeparatorComponent={<SeparatorView />}
          renderItem={({ item, index, separators }) => (
            <RenderView
              item={item}
              index={index}
              onEntryPress={onEntryPress}
              separators={separators}
            />
          )}
          data={entries}
        />
        )}
      { !ready
        && (
        <FlatList
          ListEmptyComponent={LoadingView}
          ListHeaderComponent={HeaderView}
          renderItem={<View />}
          data={[]}
        />
        )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colours.darkGrey,
    flex: 1,
  },
  emptyDate: {
    alignItems: 'center',
    flex: 1,
    paddingTop: 50,
  },
  emptyDateText: {
    color: colours.lightBlue,
    fontFamily: defaultStyles.fontFamily,
    fontSize: defaultStyles.fontSizeMedium,
    fontWeight: defaultStyles.fontWeight,
    paddingTop: 10,
  },
  entryListHeader: {
    padding: 10,
    paddingBottom: 20,
  },
  entryListText: {
    color: colours.white,
    fontFamily: defaultStyles.fontFamily,
    fontSize: defaultStyles.fontSizeLarge,
    fontWeight: defaultStyles.fontWeight,
  },
  separator: {
    backgroundColor: colours.darkGrey,
    flex: 1,
    height: 15,
    marginLeft: 0,
  },
});

export default React.memo(EntryList);

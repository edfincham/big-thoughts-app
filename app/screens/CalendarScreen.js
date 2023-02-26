import * as React from 'react';
import { useEffect, useState } from 'react';
import moment from 'moment';

// Components
import Calendar from '../components/Calendar';
import EntryList from '../components/EntryList';
import EntryModal from '../components/EntryModal';

// Utils
import db from '../utility/db';

const TODAY = moment().format('YYYY-MM-DD');
const conn = db.openDatabase('db.db');

function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState(TODAY);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [entryDates, setEntryDates] = useState([]);
  const [entries, setEntries] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    db.createTable(conn);
    db.getEntryDates(conn, setEntryDates);
  }, []);

  useEffect(() => {
    if (entryDates.includes(selectedDate)) {
      db.getEntriesOnDate(conn, selectedDate, setEntries);
    } else {
      setEntries([]);
    }
  }, [entryDates]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setReady(true);
  }, [entries]);

  const handleDateChange = (date) => {
    setReady(false);
    if (entryDates.includes(date.dateString)) {
      db.getEntriesOnDate(conn, date.dateString, setEntries);
    } else {
      setEntries([]);
    }
    setSelectedDate(date.dateString);
  };

  const handleEntryPress = (entry) => {
    setSelectedEntry(entry);
  };

  const handleEntrySave = (id, entryText) => {
    const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    if (id === null) {
      db.addEntry(conn, timestamp, entryText);
      db.getEntryDates(conn, setEntryDates);
    } else {
      db.editEntry(conn, id, timestamp, entryText);
    }
    setReady(false);
    db.getEntriesOnDate(conn, selectedDate, setEntries);
  };

  const modalVisible = selectedEntry !== null;

  return (
    <>
      <Calendar
        onDateChange={handleDateChange}
        entryDates={entryDates}
        selected={selectedDate}
        today={TODAY}
      />
      <EntryList
        entries={entries}
        onEntryPress={handleEntryPress}
        ready={ready}
        selected={selectedDate}
      />
      { selectedEntry
        && (
        <EntryModal
          entry={selectedEntry}
          modalVisible={modalVisible}
          onClose={() => setSelectedEntry(null)}
          onSave={handleEntrySave}
        />
        )}
    </>
  );
}

export default CalendarScreen;

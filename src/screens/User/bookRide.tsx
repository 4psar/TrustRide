import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput
} from 'react-native';
/* ================= TYPES ================= */

type BookingMode = 'cab' | 'driver';
type ViewStep = 'form' | 'schedule' | 'assigned';
type PickerType = 'startDate' | 'startTime' | 'endDate' | null;

/* ================= MAIN SCREEN ================= */

export const BookRide = () => {
  const [mode, setMode] = useState<BookingMode>('cab');
  const [activeView, setActiveView] = useState<ViewStep>('form');
  const [pickerType, setPickerType] = useState<PickerType>(null);

  const [formData, setFormData] = useState({
    startDate: new Date(),
    startTime: new Date(),
    endDate: new Date(),
  });
  const formatDate = (date: Date) =>
    date.toLocaleDateString('en-GB');

  const formatTime = (date: Date) =>
    date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const onDateChange = (_: any, selectedDate?: Date) => {
    if (!selectedDate || !pickerType) return;

    setFormData(prev => ({
      ...prev,
      [pickerType]: selectedDate,
    }));

    setPickerType(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Book a Ride</Text>

      {activeView === 'form' && (
        <>
          <View style={styles.tabs}>
            <Tab label="Book Driver" active={mode === 'driver'} onPress={() => setMode('driver')} />
            <Tab label="Book Cab" active={mode === 'cab'} onPress={() => setMode('cab')} />
          </View>

          <Label text="Pickup" />
          <Input value="Current Location" />

          <Label text="Destination" />
          <Input placeholder="Search destination" />

          <Label text="Trip Type" />
          <View style={styles.row}>
            <Chip text="Local" active />
            <Chip text="Outstation" />
          </View>

          {mode === 'cab' ? (
            <>
              <Label text="Select Vehicle" />
              <OptionCard title="Standard" sub="4 seats • AC" price="$12.50" />
              <OptionCard title="SUV" sub="6 seats • Extra Space" price="$18.00" />
            </>
          ) : (
            <>
              <Label text="Select Package" />
              <OptionCard title="8 Hr" sub="80 KM" price="$40" />
              <OptionCard title="12 Hr" sub="120 KM" price="$55" />
            </>
          )}

          <PrimaryButton
            text="Schedule Ride →"
            onPress={() => setActiveView('schedule')}
          />
        </>
      )}

      {activeView === 'schedule' && (
        <>
          <Card title="Schedule Your Trip">

            {/* Start Date */}
            <Text style={styles.label}>Start Date</Text>
            <TouchableOpacity
              style={styles.input}
              onPress={() => setPickerType('startDate')}
            >
              <Text>{formatDate(formData.startDate)}</Text>
            </TouchableOpacity>

            {/* Start Time */}
            <Text style={styles.label}>Start Time</Text>
            <TouchableOpacity
              style={styles.input}
              onPress={() => setPickerType('startTime')}
            >
              <Text>{formatTime(formData.startTime)}</Text>
            </TouchableOpacity>

            {/* End Date (Auto calculated – disabled) */}
            <Text style={styles.label}>End Date</Text>
            <TouchableOpacity
              style={styles.input}
              onPress={() => setPickerType('endDate')}
            >
              <Text>{formatDate(formData.endDate)}</Text>
            </TouchableOpacity>

            <Text style={{ fontSize: 12, color: '#777', marginTop: 6 }}>
              Automatically calculated based on number of days selected
            </Text>

            {/* Info Box */}
            <View
              style={{
                backgroundColor: '#FFF8E1',
                padding: 12,
                borderRadius: 8,
                marginTop: 12,
              }}
            >
              <Text style={{ fontWeight: '600', color: '#F57C00' }}>
                ⚠ Advance Booking Recommended
              </Text>
              <Text style={{ fontSize: 13, color: '#555', marginTop: 4 }}>
                Book at least 2 hours in advance for better availability
              </Text>
            </View>

            {pickerType && (
              <DateTimePicker
                value={formData[pickerType]}
                mode={pickerType === 'startTime' ? 'time' : 'date'}
                display="default"
                onChange={onDateChange}
              />
            )}
          </Card>


          <Card title="Fare Summary">
            <Row label="Base Fare" value="$10.00" />
            <Row label="Taxes & Fees" value="$2.50" />
            <Row label="Total" value="$12.50" bold />
          </Card>

          <Card>
            <Text>Apple Pay</Text>
          </Card>

          <PrimaryButton
            text="Confirm Booking →"
            onPress={() => setActiveView('assigned')}
          />
        </>
      )}

      {activeView === 'assigned' && (
        <View style={styles.center}>
          <View style={styles.successCircle} />
          <Text style={styles.successTitle}>Driver Assigned!</Text>
          <Text>Your ride is on the way.</Text>

          <Card style={styles.driverCard}>
            <View style={styles.driverHeader}>
              <View style={styles.avatar} />
              <View>
                <Text style={styles.driverName}>Michael R.</Text>
                <Text style={styles.rating}>⭐ 4.9 (1.2k rides)</Text>
              </View>
            </View>

            <View style={styles.vehicleRow}>
              <Text style={styles.vehicleText}>🚗 Toyota Camry</Text>
              <Text style={styles.vehicleText}>AB 123 CD</Text>
            </View>

            <View style={styles.row}>
              <ActionButton text="Call" onPress={() => console.log('Call driver')} />
              <ActionButton text="Chat" onPress={() => console.log('Chat driver')} />
            </View>
          </Card>


          <TouchableOpacity onPress={() => setActiveView('form')}>
            <Text style={styles.link}>Back to Home</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const Tab = ({ label, active, onPress }: any) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.tab, active && styles.tabActive]}
  >
    <Text style={active && styles.tabTextActive}>{label}</Text>
  </TouchableOpacity>
);

const Label = ({ text }: { text: string }) => (
  <Text style={styles.label}>{text}</Text>
);

const Input = ({ value, placeholder }: any) => (
  <TextInput
    style={styles.input}
    value={value}
    placeholder={placeholder}
  />
);

const Chip = ({ text, active }: any) => (
  <View style={[styles.chip, active && styles.chipActive]}>
    <Text style={active && styles.chipTextActive}>{text}</Text>
  </View>
);

const OptionCard = ({ title, sub, price }: any) => (
  <View style={styles.optionCard}>
    <View>
      <Text style={styles.optionTitle}>{title}</Text>
      <Text>{sub}</Text>
    </View>
    <Text style={styles.price}>{price}</Text>
  </View>
);

const Card = ({ title, children, style }: any) => (
  <View style={[styles.card, style]}>
    {title && <Text style={styles.cardTitle}>{title}</Text>}
    {children}
  </View>
);


const MiniCard = ({ label, value }: any) => (
  <View style={styles.miniCard}>
    <Text>{label}</Text>
    <Text style={styles.bold}>{value}</Text>
  </View>
);

const Row = ({ label, value, bold }: any) => (
  <View style={styles.rowBetween}>
    <Text>{label}</Text>
    <Text style={bold && styles.bold}>{value}</Text>
  </View>
);

const PrimaryButton = ({ text, onPress }: any) => (
  <TouchableOpacity style={styles.primaryButton} onPress={onPress}>
    <Text style={styles.primaryText}>{text}</Text>
  </TouchableOpacity>
);

const ActionButton = ({ text, onPress }: any) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.7}
    style={styles.actionBtn}
  >
    <Text style={styles.actionText}>{text}</Text>
  </TouchableOpacity>
);


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  header: { fontSize: 20, fontWeight: '600', marginBottom: 12 },

  tabs: { flexDirection: 'row', marginBottom: 16 },
  tab: {
    flex: 1,
    padding: 12,
    backgroundColor: '#eee',
    borderRadius: 8,
    marginHorizontal: 4,
    alignItems: 'center'
  },
  tabActive: { backgroundColor: '#fff', borderWidth: 1 },
  tabTextActive: { fontWeight: '600' },

  label: { marginTop: 12, marginBottom: 6, fontWeight: '500' },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    borderColor: '#ddd'
  },

  row: { flexDirection: 'row', gap: 5 },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4
  },

  chip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#eee'
  },
  chipActive: { backgroundColor: '#DBEAFE' },
  chipTextActive: { color: '#2563EB', fontWeight: '600' },

  optionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 14,
    borderWidth: 1,
    borderRadius: 12,
    marginTop: 8
  },
  optionTitle: { fontWeight: '600' },
  price: { fontWeight: '600' },

  card: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 16,
    marginTop: 16
  },
  cardTitle: { fontWeight: '600', marginBottom: 8 },

  miniCard: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center'
  },

  primaryButton: {
    backgroundColor: '#0B1320',
    padding: 16,
    borderRadius: 14,
    marginTop: 20
  },
  primaryText: { color: '#fff', textAlign: 'center', fontWeight: '600' },

  center: { alignItems: 'center', marginTop: 40 },
  successCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#C6F6D5',
    marginBottom: 16
  },
  successTitle: { fontSize: 18, fontWeight: '600' },
  driverCard: {
    width: '100%',
    marginTop: 20,
  },

  driverHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#CBD5E1',
    marginRight: 12,
  },

  driverName: {
    fontSize: 16,
    fontWeight: '600',
  },

  rating: {
    fontSize: 13,
    color: '#555',
    marginTop: 2,
  },

  vehicleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },

  vehicleText: {
    fontSize: 14,
    color: '#333',
  },
  actionBtn: {
    flex: 1,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#00030aff',
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 6,
    backgroundColor: '#fff',
  },

  actionText: {
    color: '#00030aff',
    fontWeight: '600',
  },


  bold: { fontWeight: '600' },
  link: { marginTop: 16, color: '#2563EB' }
});

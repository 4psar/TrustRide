import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DashboardScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <SafeAreaView style={{ backgroundColor: 'yellow' }}>
        <View style={styles.titleView}>
          <Image style={styles.logo} source={require('../assets/images/logo.jpeg')} />

          <View style={styles.textContainer}>
            <Text style={styles.appName}>TrustRide</Text>
            <Text style={styles.tagline}>Your Journey, Our Responsibility.</Text>
          </View>
        </View>
      </SafeAreaView>

      {/* Metrics Section */}
      <View style={styles.metricsCard}>
        <View style={styles.metricRow}>
          <View style={styles.metricBox}>
            <Text style={styles.metricLabel}>Total Rides</Text>
            <Text style={styles.metricValue}>47</Text>
            <Text style={styles.metricChange}>+12% from last month</Text>
          </View>
          <View style={styles.metricBox}>
            <Text style={styles.metricLabel}>Completed</Text>
            <Text style={styles.metricValue}>48</Text>
            <Text style={styles.metricChange}>+8% from last month</Text>
          </View>
        </View>

        <View style={styles.metricRow}>
          <View style={styles.metricBox}>
            <Text style={styles.metricLabel}>Cancelled</Text>
            <Text style={styles.metricValue}>2</Text>
            <Text style={styles.metricChange}>-28% from last month</Text>
          </View>

          <View style={styles.metricBox}>
            <Text style={styles.metricLabel}>Avg Rating</Text>
            <Text style={styles.metricValue}>4.8</Text>
            <Text style={styles.metricChange}>+0.2% from last month</Text>
          </View>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.actionButtonView}>
        <View style={styles.actionsRow}>
          <ActionButton title="Book a Ride" />
          <ActionButton title="Schedule Ride" />
        </View>
        <View style={styles.actionsRow}>
          <ActionButton title="Saved Places" />
          <ActionButton title="Promotions" />
        </View>
      </View>


      {/* Recent Rides */}
      <View style={styles.RideCard}>
        <View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Rides</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.recentRideCard}>
            <View>
              <Text style={styles.location}>Muthialpet</Text>
              <Text style={styles.rideMeta}>Yesterday, 2:00 PM - Honda Accord</Text>
            </View>
            <Text style={styles.fare}>1500 Rs</Text>
          </View>

          <View style={styles.recentRideCard}>
            <View>
              <Text style={styles.location}>Airport</Text>
              <Text style={styles.rideMeta}>Today, 8:30 AM - Toyota Camry</Text>
            </View>
            <Text style={styles.fare}>800 Rs</Text>
          </View>

        </View>
      </View>
    </ScrollView>
  );
}

function ActionButton({ title }: { title: string }) {
  return (
    <TouchableOpacity style={styles.actionButton}>
      <Text style={styles.actionText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7'
  },

  titleView: {
    flexDirection: 'row',
    backgroundColor: 'yellow',
    width: '100%',
    paddingVertical: 8,
    alignItems: 'center',
    paddingHorizontal: 10,
  },

  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },

  textContainer: {
    flexDirection: 'column',
  },

  appName: {
    fontSize: 22,
    fontWeight: '700',
  },

  tagline: {
    fontSize: 14,
    color: '#555',
  },

  metricsCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    marginVertical: 10,
    marginHorizontal: 10,
    elevation: 3,
  },

  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  metricBox: {
    width: '48%',
    backgroundColor: '#F4F4F4',
    borderRadius: 12,
    margin: 5,
    padding: 12,
  },

  metricLabel: {
    fontSize: 14,
    color: '#555'
  },
  
  metricValue: {
    fontSize: 20,
    fontWeight: '700'
  },
  metricChange: {
    fontSize: 12,
    color: 'green',
    marginTop: 4
  },

  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  actionButtonView: {
    marginHorizontal: 10,
    marginVertical: 10,
  },

  actionButton: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 10,
    borderRadius: 12,
    width: '45%',
    elevation: 3,
    alignItems: 'center',
  },

  actionText: {
    fontSize: 12,
    fontWeight: '600'
  },

  section: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  RideCard: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
  sectionTitle: { 
    fontSize: 18, 
    fontWeight: '700', 
    marginBottom: 12 
  },

  recentRideCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 2,
  },

  location: {
    fontSize: 16,
    fontWeight: '600'
  },

  rideMeta: {
    fontSize: 12,
    color: '#777',
    marginTop: 2
  },

  fare: {
    fontSize: 16,
    fontWeight: '700',
    alignSelf: 'center'
  },

  seeAll: {
    marginTop: 6,
    color: '#007AFF',
    fontWeight: '600'
  },
});

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';

import {
  Car,
  Users,
  Route,
  DollarSign,
  Plus,
  AlertCircle,
  ShieldAlert,
  CheckCircle2,
  Map,
} from 'lucide-react-native';

export const DashboardScreen = () =>  {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <Text style={styles.title}>Dashboard Overview</Text>
      <Text style={styles.subtitle}>
        Welcome back, here's what's happening today.
      </Text>

      {/* New Assignment */}
      <TouchableOpacity style={styles.primaryButton}>
        <Plus color="#fff" size={18} />
        <Text style={styles.primaryButtonText}>New Assignment</Text>
      </TouchableOpacity>

      {/* Stats */}
      <View style={styles.row}>
        <StatCard
          title="Active Cabs"
          value="124"
          change="+12% from yesterday"
          icon={<Car size={20} color="#22c55e" />}
        />
        <StatCard
          title="Drivers Online"
          value="98"
          change="+5% from yesterday"
          icon={<Users size={20} color="#3b82f6" />}
        />
      </View>

      <View style={styles.row}>
        <StatCard
          title="Total Rides"
          value="1,429"
          change="Today's total"
          icon={<Route size={20} color="#a855f7" />}
        />
        <StatCard
          title="Revenue"
          value="$12.4k"
          change="+8.2%"
          icon={<DollarSign size={20} color="#f59e0b" />}
        />
      </View>

      {/* Map */}
      {/* <View style={styles.card}>
        <View style={styles.mapHeader}>
          <Text style={styles.cardTitle}>Live Fleet Map</Text>
          <Text style={styles.link}>View Full Map</Text>
        </View>

        <Image
          source={{
            uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/World_map_-_low_resolution.svg/1280px-World_map_-_low_resolution.svg.png',
          }}
          style={styles.mapImage}
        />
      </View> */}

      {/* Alerts */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Recent Alerts</Text>

        <AlertItem
          icon={<AlertCircle size={18} color="#ef4444" />}
          title="Maintenance Required"
          description="Cab #482 (Toyota Prius) reported engine check."
          time="10 mins ago"
        />

        <AlertItem
          icon={<ShieldAlert size={18} color="#facc15" />}
          title="License Expiring"
          description="Driver John Doe's license expires in 5 days."
          time="2 hours ago"
        />

        <AlertItem
          icon={<CheckCircle2 size={18} color="#22c55e" />}
          title="New Driver Onboarded"
          description="Sarah Smith completed verification."
          time="5 hours ago"
        />
      </View>
    </ScrollView>
  );
}

/* ================= COMPONENTS ================= */

function StatCard({ title, value, change, icon }: any) {
  return (
    <View style={styles.statCard}>
      <View style={styles.iconBox}>{icon}</View>
      <Text style={styles.statTitle}>{title}</Text>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statChange}>{change}</Text>
    </View>
  );
}

function AlertItem({ icon, title, description, time }: any) {
  return (
    <View style={styles.alertRow}>
      <View style={styles.alertIcon}>{icon}</View>
      <View style={{ flex: 1 }}>
        <Text style={styles.alertTitle}>{title}</Text>
        <Text style={styles.alertDesc}>{description}</Text>
        <Text style={styles.alertTime}>{time}</Text>
      </View>
    </View>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0f172a',
  },
  subtitle: {
    color: '#64748b',
    marginBottom: 16,
  },
  primaryButton: {
    backgroundColor: '#0f172a',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderRadius: 12,
    marginBottom: 16,
    gap: 8,
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  statCard: {
    backgroundColor: '#fff',
    width: '48%',
    padding: 16,
    borderRadius: 14,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statTitle: {
    color: '#64748b',
    fontSize: 13,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0f172a',
  },
  statChange: {
    fontSize: 12,
    color: '#22c55e',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 14,
    marginBottom: 16,
  },
  cardTitle: {
    fontWeight: '600',
    fontSize: 16,
  },
  mapHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  link: {
    color: '#2563eb',
    fontSize: 13,
  },
  mapImage: {
    height: 160,
    borderRadius: 12,
  },
  alertRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 14,
  },
  alertIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertTitle: {
    fontWeight: '600',
  },
  alertDesc: {
    fontSize: 13,
    color: '#64748b',
  },
  alertTime: {
    fontSize: 11,
    color: '#94a3b8',
    marginTop: 2,
  },
});

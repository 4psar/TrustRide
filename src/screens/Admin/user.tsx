import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';

import {
  Plus,
  Car,
  User,
  Star,
} from 'lucide-react-native';

export const  FleetManagementScreen = () => {
  const [tab, setTab] = useState<'drivers' | 'cabs'>('drivers');

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <Text style={styles.title}>Fleet Management</Text>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TabButton
          title="Drivers"
          active={tab === 'drivers'}
          onPress={() => setTab('drivers')}
        />
        <TabButton
          title="Cabs"
          active={tab === 'cabs'}
          onPress={() => setTab('cabs')}
        />
      </View>

      {tab === 'cabs' ? <CabsTab /> : <DriversTab />}
    </ScrollView>
  );
}

/* ===================== TABS ===================== */

function CabsTab() {
  return (
    <>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>All Vehicles (32)</Text>
        <PrimaryButton label="Add Cab" />
      </View>

      {/* Cab Card */}
      <CabCard
        name="Toyota Camry"
        subtitle="Sedan • 2022"
        status="Active"
        statusColor="#22c55e"
        plate="NYC-4829"
        color="Silver"
        driver="Michael Chen"
      />

      <CabCard
        name="Honda CR-V"
        subtitle="SUV • 2021"
        status="Maintenance"
        statusColor="#facc15"
        plate="NYC-9921"
        color="Black"
      />
    </>
  );
}

function DriversTab() {
  return (
    <>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>All Drivers (24)</Text>
        <PrimaryButton label="Add Driver" />
      </View>

      <DriverCard
        name="Michael Chen"
        id="DRV-8821"
        rating="4.9"
        cab="Toyota Camry"
        status="Active"
      />

      <DriverCard
        name="Sarah Johnson"
        id="DRV-9932"
        rating="4.8"
        cab="Unassigned"
        status="Off Duty"
      />
    </>
  );
}

/* ===================== COMPONENTS ===================== */

function TabButton({ title, active, onPress }: any) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.tab, active && styles.tabActive]}>
      <Text style={[styles.tabText, active && styles.tabTextActive]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

function PrimaryButton({ label }: any) {
  return (
    <TouchableOpacity style={styles.addButton}>
      <Plus size={16} color="#fff" />
      <Text style={styles.addButtonText}>{label}</Text>
    </TouchableOpacity>
  );
}

/* ===================== CAB CARD ===================== */

function CabCard({
  name,
  subtitle,
  status,
  statusColor,
  plate,
  color,
  driver,
}: any) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.iconCircle}>
          <Car size={18} color="#0f172a" />
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.cardTitle}>{name}</Text>
          <Text style={styles.cardSub}>{subtitle}</Text>
        </View>

        <View style={[styles.badge, { backgroundColor: statusColor + '22' }]}>
          <Text style={[styles.badgeText, { color: statusColor }]}>
            {status}
          </Text>
        </View>
      </View>

      <View style={styles.infoRow}>
        <InfoBox label="Plate Number" value={plate} />
        <InfoBox label="Color" value={color} />
      </View>

      <View style={styles.footerRow}>
        {driver ? (
          <View style={styles.driverRow}>
            <Image
              source={{ uri: 'https://i.pravatar.cc/100' }}
              style={styles.avatar}
            />
            <Text style={styles.driverName}>{driver}</Text>
          </View>
        ) : (
          <Text style={styles.unassigned}>No driver assigned</Text>
        )}

        <Text style={styles.link}>Edit Details</Text>
      </View>
    </View>
  );
}

/* ===================== DRIVER CARD ===================== */

function DriverCard({ name, id, rating, cab, status }: any) {
  const isActive = status === 'Active';

  return (
    <View style={styles.card}>
      <View style={styles.driverHeader}>
        <Image
          source={{ uri: 'https://i.pravatar.cc/150' }}
          style={styles.driverAvatar}
        />

        <View style={{ flex: 1 }}>
          <Text style={styles.cardTitle}>{name}</Text>
          <Text style={styles.cardSub}>ID: {id}</Text>

          <View style={styles.ratingRow}>
            <Star size={14} color="#facc15" />
            <Text style={styles.ratingText}>{rating}</Text>
            <Car size={14} color="#64748b" />
            <Text style={styles.assignText}>{cab}</Text>
          </View>
        </View>

        <View
          style={[
            styles.badge,
            {
              backgroundColor: isActive ? '#22c55e22' : '#e5e7eb',
            },
          ]}>
          <Text
            style={[
              styles.badgeText,
              { color: isActive ? '#22c55e' : '#64748b' },
            ]}>
            {status}
          </Text>
        </View>
      </View>

      <View style={styles.actionRow}>
        <ActionButton label="View Profile" />
        <ActionButton
          label={isActive ? 'Contact' : 'Assign Cab'}
          primary={isActive}
        />
      </View>
    </View>
  );
}

function InfoBox({ label, value }: any) {
  return (
    <View style={styles.infoBox}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

function ActionButton({ label, primary }: any) {
  return (
    <TouchableOpacity
      style={[
        styles.actionButton,
        primary && styles.actionButtonPrimary,
      ]}>
      <Text
        style={[
          styles.actionText,
          primary && styles.actionTextPrimary,
        ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

/* ===================== STYLES ===================== */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
    color: '#0f172a',
  },

  /* Tabs */
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 4,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: '#0f172a',
  },
  tabText: {
    color: '#64748b',
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#fff',
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
  },

  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2563eb',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    gap: 6,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
  },

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    fontWeight: '600',
    fontSize: 15,
  },
  cardSub: {
    fontSize: 12,
    color: '#64748b',
  },

badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 16,
  },

  infoRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
  },
  infoBox: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 10,
    borderRadius: 10,
  },
  infoLabel: {
    fontSize: 11,
    color: '#64748b',
  },
  infoValue: {
    fontWeight: '600',
  },

  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  driverRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  avatar: {
    width: 26,
    height: 26,
    borderRadius: 13,
  },
  driverName: {
    fontSize: 13,
  },
  unassigned: {
    fontSize: 12,
    color: '#94a3b8',
    fontStyle: 'italic',
  },
  link: {
    color: '#2563eb',
    fontSize: 13,
    fontWeight: '500',
  },

  /* Driver card */
  driverHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  driverAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  ratingText: {
    fontSize: 12,
    marginRight: 6,
  },
  assignText: {
    fontSize: 12,
    color: '#64748b',
  },

  actionRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
  },
  actionButtonPrimary: {
    backgroundColor: '#0f172a',
  },
  actionText: {
    fontWeight: '600',
    color: '#0f172a',
  },
  actionTextPrimary: {
    color: '#fff',
  },
});
